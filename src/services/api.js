const API_BASE_URL = "http://127.0.0.1:5000/api";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ||
        data?.details ||
        "Something went wrong with the server."
    );
  }

  return data;
}

export async function generateInterviewQuestions(config) {
  const response = await fetch(`${API_BASE_URL}/generate-questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      domain: config.domainName || config.domain,
      difficulty: config.difficultyName || config.difficulty,
      questionCount: Number(config.questionCount),
      mode: config.modeName || config.mode,
    }),
  });

  return handleResponse(response);
}

export async function evaluateAnswer({
  domain,
  difficulty,
  question,
  answer,
}) {
  const response = await fetch(`${API_BASE_URL}/evaluate-answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      domain,
      difficulty,
      question,
      answer,
    }),
  });

  return handleResponse(response);
}