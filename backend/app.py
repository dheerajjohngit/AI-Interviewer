from flask import Flask, jsonify, request
from flask_cors import CORS

from gemini_service import (
    generate_interview_questions,
    evaluate_answer,
)


app = Flask(__name__)

CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "AI Interviewer API is running",
        "status": "online",
    })


@app.route("/api/generate-questions", methods=["POST"])
def generate_questions():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "Request body is required."
            }), 400

        domain = data.get("domain")
        difficulty = data.get("difficulty")
        question_count = data.get("questionCount")
        mode = data.get("mode")

        if not domain:
            return jsonify({
                "error": "Domain is required."
            }), 400

        if not difficulty:
            return jsonify({
                "error": "Difficulty is required."
            }), 400

        if not question_count:
            return jsonify({
                "error": "Question count is required."
            }), 400

        if not mode:
            return jsonify({
                "error": "Interview mode is required."
            }), 400

        questions = generate_interview_questions(
            domain=domain,
            difficulty=difficulty,
            question_count=question_count,
            mode=mode,
        )

        return jsonify(questions), 200

    except Exception as error:
        print("Question generation error:", error)

        return jsonify({
            "error": "Failed to generate interview questions.",
            "details": str(error),
        }), 500


@app.route("/api/evaluate-answer", methods=["POST"])
def evaluate_candidate_answer():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "Request body is required."
            }), 400

        domain = data.get("domain")
        difficulty = data.get("difficulty")
        question = data.get("question")
        answer = data.get("answer")

        if not domain:
            return jsonify({
                "error": "Domain is required."
            }), 400

        if not difficulty:
            return jsonify({
                "error": "Difficulty is required."
            }), 400

        if not question:
            return jsonify({
                "error": "Question is required."
            }), 400

        if not answer:
            return jsonify({
                "error": "Answer is required."
            }), 400

        evaluation = evaluate_answer(
            domain=domain,
            difficulty=difficulty,
            question=question,
            answer=answer,
        )

        return jsonify(evaluation), 200

    except Exception as error:
        print("Answer evaluation error:", error)

        return jsonify({
            "error": "Failed to evaluate answer.",
            "details": str(error),
        }), 500


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True,
    )