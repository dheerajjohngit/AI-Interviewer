import json
import os
import time

from dotenv import load_dotenv
from google import genai


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY is not configured in the .env file."
    )


# ============================================================
# GEMINI CLIENT
# ============================================================

client = genai.Client(api_key=API_KEY)


# ============================================================
# MODEL FALLBACK SYSTEM
# ============================================================

# The application will try these models in order.
# If one is temporarily unavailable, it automatically
# moves to the next model.

MODEL_NAMES = [
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash",
]


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def clean_json_response(text):
    """
    Remove Markdown code fences if Gemini returns JSON
    inside ```json ... ``` blocks.
    """

    if not text:
        raise ValueError("Gemini returned an empty response.")

    text = text.strip()

    if text.startswith("```json"):
        text = text[len("```json"):].strip()

    elif text.startswith("```"):
        text = text[len("```"):].strip()

    if text.endswith("```"):
        text = text[:-3].strip()

    return text


def is_temporary_error(error):
    """
    Detect errors that are likely temporary, such as
    model overload or service unavailability.
    """

    error_text = str(error).lower()

    temporary_errors = [
        "503",
        "unavailable",
        "high demand",
        "overloaded",
        "temporarily",
        "internal server error",
        "service unavailable",
    ]

    return any(
        message in error_text
        for message in temporary_errors
    )


def generate_with_fallback(prompt):
    """
    Try multiple Gemini models automatically.

    If one model is unavailable, the next model is tried.
    """

    last_error = None

    for model_name in MODEL_NAMES:

        print(
            f"\nTrying Gemini model: {model_name}"
        )

        # Try each model up to 2 times
        for attempt in range(2):

            try:

                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                )

                if not response or not response.text:
                    raise ValueError(
                        f"{model_name} returned an empty response."
                    )

                print(
                    f"Gemini response received from: {model_name}"
                )

                return response.text

            except Exception as error:

                last_error = error

                print(
                    f"Model {model_name} failed "
                    f"(attempt {attempt + 1}/2): {error}"
                )

                # If it is a temporary error, retry after a short delay
                if is_temporary_error(error):

                    if attempt == 0:
                        print(
                            f"Retrying {model_name}..."
                        )

                        time.sleep(2)

                    continue

                # For non-temporary errors, move to next model
                break

    raise RuntimeError(
        f"All Gemini models failed. Last error: {last_error}"
    )


# ============================================================
# GENERATE INTERVIEW QUESTIONS
# ============================================================

def generate_interview_questions(
    domain,
    difficulty,
    question_count,
    mode,
):

    prompt = f"""
You are an expert technical interviewer.

Generate a technical interview for a candidate.

Interview configuration:

Domain: {domain}
Difficulty: {difficulty}
Number of questions: {question_count}
Interview mode: {mode}

Requirements:

1. Generate exactly {question_count} questions.
2. Questions must be technically accurate.
3. Questions must match the selected difficulty.
4. Avoid duplicate questions.
5. Questions should test understanding rather than memorization.
6. Questions should be suitable for a real technical interview.
7. Include a mixture of conceptual, coding, and scenario questions
   when appropriate for the selected domain.
8. For coding questions, ask the candidate to explain their approach.
9. Do not provide answers.
10. Keep questions concise and interview-friendly.

Return ONLY valid JSON.

The JSON must have exactly this structure:

{{
    "questions": [
        {{
            "question": "Question text",
            "topic": "Topic name",
            "type": "conceptual"
        }}
    ]
}}

Allowed question types:

- conceptual
- coding
- scenario

Do not include Markdown.
Do not include explanations outside the JSON.
"""

    text = generate_with_fallback(prompt)

    text = clean_json_response(text)

    try:

        data = json.loads(text)

    except json.JSONDecodeError as error:

        raise ValueError(
            f"Gemini returned invalid JSON: {text}"
        ) from error

    # Validate response
    if "questions" not in data:
        raise ValueError(
            "Gemini response does not contain 'questions'."
        )

    if not isinstance(data["questions"], list):
        raise ValueError(
            "'questions' must be a list."
        )

    if len(data["questions"]) == 0:
        raise ValueError(
            "Gemini returned zero interview questions."
        )

    return data


# ============================================================
# EVALUATE CANDIDATE ANSWER
# ============================================================

def evaluate_answer(
    domain,
    difficulty,
    question,
    answer,
):

    prompt = f"""
You are an expert technical interviewer evaluating a candidate.

Domain:
{domain}

Difficulty:
{difficulty}

Question:
{question}

Candidate answer:
{answer}

Evaluate the candidate's answer objectively.

Consider:

1. Technical correctness
2. Understanding of the concept
3. Completeness
4. Clarity
5. Practical understanding

Return ONLY valid JSON using exactly this structure:

{{
    "score": 0,
    "technical_correctness": 0,
    "understanding": 0,
    "completeness": 0,
    "clarity": 0,
    "feedback": "Short explanation of the evaluation.",
    "strengths": [
        "Strength 1"
    ],
    "improvements": [
        "Improvement 1"
    ]
}}

Rules:

- All numeric scores must be between 0 and 100.
- The overall score should reflect the quality of the answer.
- Do not judge the candidate based on grammar alone.
- Focus primarily on technical quality.
- Keep feedback concise and useful.
- Do not include Markdown outside the JSON.
"""

    text = generate_with_fallback(prompt)

    text = clean_json_response(text)

    try:

        evaluation = json.loads(text)

    except json.JSONDecodeError as error:

        raise ValueError(
            f"Gemini returned invalid evaluation JSON: {text}"
        ) from error

    return evaluation