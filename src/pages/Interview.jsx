import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Loader2,
  Pause,
  Play,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import {
  evaluateAnswer,
  generateInterviewQuestions,
} from "../services/api";

function Interview({ config, onExit, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState([]);

  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questionError, setQuestionError] = useState("");

  const [evaluating, setEvaluating] = useState(false);
  const [evaluationError, setEvaluationError] = useState("");

  const [isPaused, setIsPaused] = useState(false);

  const [seconds, setSeconds] = useState(0);

  const [showExitModal, setShowExitModal] = useState(false);
  const [showHint, setShowHint] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Generate questions from Gemini
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let cancelled = false;

    async function loadQuestions() {
      try {
        setLoadingQuestions(true);
        setQuestionError("");

        const data = await generateInterviewQuestions(config);

        if (cancelled) {
          return;
        }

        if (!data?.questions || !Array.isArray(data.questions)) {
          throw new Error("The AI returned an invalid question format.");
        }

        if (data.questions.length === 0) {
          throw new Error("The AI did not generate any questions.");
        }

        setQuestions(data.questions);
      } catch (error) {
        if (!cancelled) {
          console.error("Question generation error:", error);

          setQuestionError(
            error.message ||
              "Unable to generate interview questions."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingQuestions(false);
        }
      }
    }

    if (config) {
      loadQuestions();
    }

    return () => {
      cancelled = true;
    };
  }, [config]);

  /*
  |--------------------------------------------------------------------------
  | Interview timer
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (loadingQuestions || isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loadingQuestions, isPaused]);

  /*
  |--------------------------------------------------------------------------
  | Current question
  |--------------------------------------------------------------------------
  */

  const currentQuestion = questions[currentQuestionIndex];

  const progress = useMemo(() => {
    if (questions.length === 0) {
      return 0;
    }

    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex, questions.length]);

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const getQuestionTypeLabel = (type) => {
    if (!type) {
      return "Technical";
    }

    switch (type.toLowerCase()) {
      case "coding":
        return "Coding";

      case "scenario":
        return "Scenario";

      case "conceptual":
        return "Conceptual";

      default:
        return "Technical";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Submit answer
  |--------------------------------------------------------------------------
  */

  const handleSubmitAnswer = async () => {
    if (!currentQuestion) {
      return;
    }

    if (!answer.trim()) {
      setEvaluationError(
        "Please write an answer before submitting."
      );
      return;
    }

    try {
      setEvaluating(true);
      setEvaluationError("");

      const evaluation = await evaluateAnswer({
        domain: config.domainName || config.domain,
        difficulty:
          config.difficultyName || config.difficulty,
        question: currentQuestion.question,
        answer: answer.trim(),
      });

      const newAnswer = {
        questionNumber: currentQuestionIndex + 1,
        question: currentQuestion.question,
        topic: currentQuestion.topic || "Technical",
        type: currentQuestion.type || "conceptual",
        answer: answer.trim(),
        evaluation,
      };

      const updatedAnswers = [...answers, newAnswer];

      setAnswers(updatedAnswers);

      const isLastQuestion =
        currentQuestionIndex === questions.length - 1;

      if (isLastQuestion) {
        onFinish({
          ...config,
          answers: updatedAnswers,
          duration: seconds,
        });

        return;
      }

      setCurrentQuestionIndex(
        (previous) => previous + 1
      );

      setAnswer("");
      setShowHint(false);
    } catch (error) {
      console.error("Answer evaluation error:", error);

      setEvaluationError(
        error.message ||
          "Unable to evaluate your answer. Please try again."
      );
    } finally {
      setEvaluating(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Previous question
  |--------------------------------------------------------------------------
  */

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      return;
    }

    const previousIndex = currentQuestionIndex - 1;

    setCurrentQuestionIndex(previousIndex);

    const previousAnswer = answers.find(
      (item) =>
        item.questionNumber === previousIndex + 1
    );

    setAnswer(previousAnswer?.answer || "");

    setEvaluationError("");
    setShowHint(false);
  };

  /*
  |--------------------------------------------------------------------------
  | Loading screen
  |--------------------------------------------------------------------------
  */

  if (loadingQuestions) {
    return (
      <div className="min-h-screen bg-[#08090c] text-white">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
              <Sparkles
                size={28}
                className="text-violet-400"
              />
            </div>

            <h1 className="mt-6 text-xl font-semibold">
              Preparing your interview
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">
              Gemini is generating technical questions based
              on your selected domain, difficulty and interview
              mode.
            </p>

            <div className="mt-7 flex items-center justify-center gap-2 text-sm text-zinc-400">
              <Loader2
                size={17}
                className="animate-spin"
              />

              <span>
                Generating questions...
              </span>
            </div>

            <div className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                    Domain
                  </p>

                  <p className="mt-1 text-sm text-zinc-300">
                    {config?.domainName}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                    Difficulty
                  </p>

                  <p className="mt-1 text-sm text-zinc-300">
                    {config?.difficultyName}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                    Questions
                  </p>

                  <p className="mt-1 text-sm text-zinc-300">
                    {config?.questionCount}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                    Mode
                  </p>

                  <p className="mt-1 text-sm text-zinc-300">
                    {config?.modeName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Question generation error
  |--------------------------------------------------------------------------
  */

  if (questionError) {
    return (
      <div className="min-h-screen bg-[#08090c] text-white">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-lg rounded-2xl border border-red-400/10 bg-[#0d0f14] p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10">
              <AlertCircle
                size={25}
                className="text-red-400"
              />
            </div>

            <h1 className="mt-5 text-lg font-semibold">
              Unable to start interview
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              {questionError}
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={onExit}
                className="rounded-lg border border-white/[0.08] px-4 py-2.5 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
              >
                Exit
              </button>

              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Main interview UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#08090c] text-white">
      {/* Top bar */}

      <header className="border-b border-white/[0.07] bg-[#0b0c10]">
        <div className="flex h-[72px] items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
              <Sparkles
                size={18}
                className="text-violet-400"
              />
            </div>

            <div>
              <p className="text-sm font-semibold">
                AI Technical Interview
              </p>

              <p className="mt-0.5 text-[11px] text-zinc-600">
                {config?.domainName} ·{" "}
                {config?.difficultyName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 sm:flex">
              <Clock3
                size={15}
                className="text-zinc-500"
              />

              <span className="font-mono text-xs text-zinc-300">
                {formatTime(seconds)}
              </span>
            </div>

            <button
              onClick={() =>
                setIsPaused((previous) => !previous)
              }
              className="flex items-center gap-2 rounded-lg border border-white/[0.07] px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              {isPaused ? (
                <Play size={14} />
              ) : (
                <Pause size={14} />
              )}

              <span className="hidden sm:inline">
                {isPaused ? "Resume" : "Pause"}
              </span>
            </button>

            <button
              onClick={() => setShowExitModal(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Progress */}

        <div className="h-[2px] bg-white/[0.04]">
          <div
            className="h-full bg-violet-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </header>

      {/* Paused state */}

      {isPaused ? (
        <main className="flex min-h-[calc(100vh-74px)] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03]">
              <Pause
                size={26}
                className="text-zinc-400"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Interview Paused
            </h2>

            <p className="mt-2 text-sm text-zinc-600">
              Take a moment. Your timer is paused.
            </p>

            <button
              onClick={() => setIsPaused(false)}
              className="mt-6 flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <Play size={15} />
              Continue Interview
            </button>
          </div>
        </main>
      ) : (
        <main className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
          {/* Question header */}

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-violet-400">
                  Question{" "}
                  {currentQuestionIndex + 1}
                </span>

                <span className="h-1 w-1 rounded-full bg-zinc-700" />

                <span className="text-xs text-zinc-600">
                  {questions.length} total
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                Technical Assessment
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-zinc-500">
                {getQuestionTypeLabel(
                  currentQuestion?.type
                )}
              </span>

              {currentQuestion?.topic && (
                <span className="rounded-md border border-violet-400/10 bg-violet-500/5 px-2.5 py-1.5 text-[11px] text-violet-300">
                  {currentQuestion.topic}
                </span>
              )}
            </div>
          </div>

          {/* Main content */}

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Question + answer */}

            <section className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-6 lg:p-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                  Interview Question
                </p>

                <h2 className="mt-4 text-xl font-medium leading-8 text-zinc-100 lg:text-2xl">
                  {currentQuestion?.question}
                </h2>
              </div>

              {/* Hint */}

              <div className="mt-8">
                <button
                  onClick={() =>
                    setShowHint((previous) => !previous)
                  }
                  className="flex items-center gap-2 text-xs text-zinc-500 transition hover:text-violet-300"
                >
                  <Lightbulb size={14} />

                  {showHint
                    ? "Hide hint"
                    : "Need a hint?"}
                </button>

                {showHint && (
                  <div className="mt-3 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-4 text-xs leading-6 text-zinc-500">
                    Think about the core concept behind
                    the question and explain it as if you
                    were answering a technical interviewer.
                  </div>
                )}
              </div>

              {/* Answer */}

              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-400">
                    Your answer
                  </label>

                  <span className="text-[10px] text-zinc-700">
                    {answer.length} characters
                  </span>
                </div>

                <textarea
                  value={answer}
                  onChange={(event) => {
                    setAnswer(event.target.value);
                    setEvaluationError("");
                  }}
                  placeholder="Explain your answer clearly. Include examples or code when appropriate..."
                  className="min-h-[240px] w-full resize-none rounded-xl border border-white/[0.07] bg-[#090a0d] p-4 text-sm leading-7 text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-violet-400/30 focus:ring-1 focus:ring-violet-400/10"
                  disabled={evaluating}
                />

                {evaluationError && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-400/10 bg-red-500/[0.04] p-3 text-xs leading-5 text-red-300">
                    <AlertCircle
                      size={14}
                      className="mt-0.5 shrink-0"
                    />

                    <span>{evaluationError}</span>
                  </div>
                )}
              </div>

              {/* Controls */}

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={
                    currentQuestionIndex === 0 ||
                    evaluating
                  }
                  className="flex items-center gap-2 rounded-lg border border-white/[0.07] px-4 py-2.5 text-xs text-zinc-500 transition hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft size={14} />
                  Previous
                </button>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={evaluating}
                  className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {evaluating ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />

                      Evaluating...
                    </>
                  ) : currentQuestionIndex ===
                    questions.length - 1 ? (
                    <>
                      Finish Interview
                      <CheckCircle2 size={15} />
                    </>
                  ) : (
                    <>
                      Submit Answer
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Interview information */}

            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={15}
                    className="text-violet-400"
                  />

                  <h3 className="text-sm font-medium">
                    AI Evaluation
                  </h3>
                </div>

                <p className="mt-3 text-xs leading-6 text-zinc-600">
                  After you submit an answer, Gemini will
                  evaluate your technical correctness,
                  understanding, completeness and clarity.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                  Interview Progress
                </p>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">
                      Questions answered
                    </span>

                    <span className="font-medium text-zinc-300">
                      {answers.length} /{" "}
                      {questions.length}
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-violet-500 transition-all"
                      style={{
                        width: `${
                          questions.length
                            ? (answers.length /
                                questions.length) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                  Interview Configuration
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-600">
                      Domain
                    </span>

                    <span className="text-xs text-zinc-300">
                      {config?.domainName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-600">
                      Difficulty
                    </span>

                    <span className="text-xs text-zinc-300">
                      {config?.difficultyName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-600">
                      Mode
                    </span>

                    <span className="text-xs text-zinc-300">
                      {config?.modeName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-600">
                      Time
                    </span>

                    <span className="font-mono text-xs text-zinc-300">
                      {formatTime(seconds)}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      )}

      {/* Exit modal */}

      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#101217] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Exit interview?
              </h2>

              <button
                onClick={() =>
                  setShowExitModal(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-white/[0.05] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Your current interview progress will be
              lost if you exit now.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() =>
                  setShowExitModal(false)
                }
                className="rounded-lg border border-white/[0.07] px-4 py-2.5 text-xs text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
              >
                Continue Interview
              </button>

              <button
                onClick={onExit}
                className="rounded-lg bg-red-500/10 px-4 py-2.5 text-xs font-medium text-red-400 transition hover:bg-red-500/15"
              >
                Exit Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Interview;