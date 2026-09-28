import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";

import { useMemo, useState } from "react";

function Results({ result, onDashboard }) {
  const [expandedQuestion, setExpandedQuestion] = useState(0);

  if (!result || !result.answers || result.answers.length === 0) {
    return (
      <div className="min-h-screen bg-[#08090c] text-white">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold">
              No interview results available
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Complete an interview first to see your results.
            </p>

            <button
              onClick={onDashboard}
              className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const answers = result.answers;

  /*
  |--------------------------------------------------------------------------
  | Calculate overall statistics
  |--------------------------------------------------------------------------
  */

  const overallScore = useMemo(() => {
    const scores = answers
      .map((item) => Number(item.evaluation?.score))
      .filter((score) => !Number.isNaN(score));

    if (scores.length === 0) {
      return 0;
    }

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) /
        scores.length
    );
  }, [answers]);

  const averageTechnical = useMemo(() => {
    const scores = answers
      .map((item) =>
        Number(item.evaluation?.technical_correctness)
      )
      .filter((score) => !Number.isNaN(score));

    if (scores.length === 0) {
      return 0;
    }

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) /
        scores.length
    );
  }, [answers]);

  const averageUnderstanding = useMemo(() => {
    const scores = answers
      .map((item) =>
        Number(item.evaluation?.understanding)
      )
      .filter((score) => !Number.isNaN(score));

    if (scores.length === 0) {
      return 0;
    }

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) /
        scores.length
    );
  }, [answers]);

  const averageCompleteness = useMemo(() => {
    const scores = answers
      .map((item) =>
        Number(item.evaluation?.completeness)
      )
      .filter((score) => !Number.isNaN(score));

    if (scores.length === 0) {
      return 0;
    }

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) /
        scores.length
    );
  }, [answers]);

  const averageClarity = useMemo(() => {
    const scores = answers
      .map((item) => Number(item.evaluation?.clarity))
      .filter((score) => !Number.isNaN(score));

    if (scores.length === 0) {
      return 0;
    }

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) /
        scores.length
    );
  }, [answers]);

  /*
  |--------------------------------------------------------------------------
  | Collect strengths and improvements
  |--------------------------------------------------------------------------
  */

  const strengths = useMemo(() => {
    const items = answers.flatMap(
      (item) => item.evaluation?.strengths || []
    );

    return [...new Set(items)].slice(0, 6);
  }, [answers]);

  const improvements = useMemo(() => {
    const items = answers.flatMap(
      (item) => item.evaluation?.improvements || []
    );

    return [...new Set(items)].slice(0, 6);
  }, [answers]);

  /*
  |--------------------------------------------------------------------------
  | Score label
  |--------------------------------------------------------------------------
  */

  const getScoreLabel = (score) => {
    if (score >= 85) {
      return "Excellent";
    }

    if (score >= 70) {
      return "Strong";
    }

    if (score >= 50) {
      return "Needs Improvement";
    }

    return "Keep Practicing";
  };

  const getScoreMessage = (score) => {
    if (score >= 85) {
      return "You demonstrated strong technical knowledge and understanding.";
    }

    if (score >= 70) {
      return "You showed a good technical foundation with some areas to improve.";
    }

    if (score >= 50) {
      return "You have a foundation to build on. Focus on the improvement areas below.";
    }

    return "Keep practicing the fundamentals and try another interview.";
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  /*
  |--------------------------------------------------------------------------
  | Toggle question
  |--------------------------------------------------------------------------
  */

  const toggleQuestion = (index) => {
    setExpandedQuestion(
      expandedQuestion === index ? -1 : index
    );
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-white">
      {/* Header */}

      <header className="border-b border-white/[0.07] bg-[#0b0c10]">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
              <Sparkles
                size={18}
                className="text-violet-400"
              />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Interview Results
              </p>

              <p className="mt-0.5 text-[11px] text-zinc-600">
                AI-powered performance analysis
              </p>
            </div>
          </div>

          <button
            onClick={onDashboard}
            className="flex items-center gap-2 rounded-lg border border-white/[0.07] px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            <ArrowLeft size={14} />

            Dashboard
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* Page heading */}

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
            Interview completed
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Your Performance Report
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Gemini analyzed your responses across technical
            correctness, understanding, completeness and clarity.
          </p>
        </div>

        {/* Overview */}

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Overall score */}

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-7">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <Target
                  size={16}
                  className="text-violet-400"
                />

                <span className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                  Overall Score
                </span>
              </div>

              <div className="mt-7 flex items-end gap-4">
                <span className="text-6xl font-semibold tracking-tight">
                  {overallScore}
                </span>

                <span className="mb-2 text-xl text-zinc-600">
                  / 100
                </span>
              </div>

              <p className="mt-3 text-sm font-medium text-violet-300">
                {getScoreLabel(overallScore)}
              </p>

              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
                {getScoreMessage(overallScore)}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[11px] text-zinc-400">
                  {result.domainName}
                </span>

                <span className="rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[11px] text-zinc-400">
                  {result.difficultyName}
                </span>

                <span className="rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[11px] text-zinc-400">
                  {answers.length} Questions
                </span>
              </div>
            </div>
          </div>

          {/* Interview stats */}

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
                <CheckCircle2
                  size={17}
                  className="text-violet-400"
                />
              </div>

              <p className="mt-5 text-2xl font-semibold">
                {answers.length}
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Questions Answered
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                <Clock3
                  size={17}
                  className="text-blue-400"
                />
              </div>

              <p className="mt-5 text-2xl font-semibold">
                {formatTime(result.duration || 0)}
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Interview Duration
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                <TrendingUp
                  size={17}
                  className="text-emerald-400"
                />
              </div>

              <p className="mt-5 text-2xl font-semibold">
                {averageTechnical}
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Technical Correctness
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                <Sparkles
                  size={17}
                  className="text-amber-400"
                />
              </div>

              <p className="mt-5 text-2xl font-semibold">
                {averageUnderstanding}
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Understanding
              </p>
            </div>
          </div>
        </section>

        {/* Evaluation breakdown */}

        <section className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">
                Evaluation Breakdown
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                Average scores across all your answers
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <ScoreBar
              label="Technical Correctness"
              score={averageTechnical}
            />

            <ScoreBar
              label="Understanding"
              score={averageUnderstanding}
            />

            <ScoreBar
              label="Completeness"
              score={averageCompleteness}
            />

            <ScoreBar
              label="Clarity"
              score={averageClarity}
            />

            <ScoreBar
              label="Overall"
              score={overallScore}
            />
          </div>
        </section>

        {/* Strengths and improvements */}

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Strengths */}

          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                <CheckCircle2
                  size={17}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Strengths
                </h2>

                <p className="mt-1 text-xs text-zinc-600">
                  Areas where your answers performed well
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {strengths.length > 0 ? (
                strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl border border-emerald-400/[0.08] bg-emerald-400/[0.03] p-3"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <p className="text-xs leading-5 text-zinc-400">
                      {strength}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-600">
                  No specific strengths were returned.
                </p>
              )}
            </div>
          </div>

          {/* Improvements */}

          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                <Lightbulb
                  size={17}
                  className="text-amber-400"
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Areas to Improve
                </h2>

                <p className="mt-1 text-xs text-zinc-600">
                  Topics worth practicing further
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {improvements.length > 0 ? (
                improvements.map((improvement, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl border border-amber-400/[0.08] bg-amber-400/[0.03] p-3"
                  >
                    <Lightbulb
                      size={15}
                      className="mt-0.5 shrink-0 text-amber-400"
                    />

                    <p className="text-xs leading-5 text-zinc-400">
                      {improvement}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-600">
                  No specific improvements were returned.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Question-by-question analysis */}

        <section className="mt-6">
          <div>
            <h2 className="text-lg font-semibold">
              Question-by-Question Analysis
            </h2>

            <p className="mt-1 text-xs text-zinc-600">
              Review your answers and Gemini's evaluation.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {answers.map((item, index) => {
              const evaluation = item.evaluation || {};

              const isExpanded =
                expandedQuestion === index;

              const score = Number(
                evaluation.score || 0
              );

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0f14]"
                >
                  {/* Question header */}

                  <button
                    onClick={() =>
                      toggleQuestion(index)
                    }
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-white/[0.02]"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-xs font-medium text-zinc-400">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-violet-400">
                            {item.topic || "Technical"}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-zinc-700" />

                          <span className="text-[10px] text-zinc-600">
                            {item.type || "conceptual"}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-sm font-medium text-zinc-300">
                          {item.question}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-4">
                      <div className="hidden text-right sm:block">
                        <p className="text-lg font-semibold">
                          {score}
                        </p>

                        <p className="text-[9px] uppercase tracking-wider text-zinc-700">
                          Score
                        </p>
                      </div>

                      {isExpanded ? (
                        <ChevronUp
                          size={17}
                          className="text-zinc-600"
                        />
                      ) : (
                        <ChevronDown
                          size={17}
                          className="text-zinc-600"
                        />
                      )}
                    </div>
                  </button>

                  {/* Expanded content */}

                  {isExpanded && (
                    <div className="border-t border-white/[0.07] p-5">
                      {/* Question */}

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-700">
                          Question
                        </p>

                        <p className="mt-2 text-sm leading-6 text-zinc-300">
                          {item.question}
                        </p>
                      </div>

                      {/* Candidate answer */}

                      <div className="mt-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-700">
                          Your Answer
                        </p>

                        <div className="mt-2 rounded-xl border border-white/[0.06] bg-[#090a0d] p-4">
                          <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-500">
                            {item.answer}
                          </p>
                        </div>
                      </div>

                      {/* Score */}

                      <div className="mt-6 grid gap-3 sm:grid-cols-5">
                        <MiniScore
                          label="Overall"
                          value={evaluation.score}
                        />

                        <MiniScore
                          label="Technical"
                          value={
                            evaluation.technical_correctness
                          }
                        />

                        <MiniScore
                          label="Understanding"
                          value={
                            evaluation.understanding
                          }
                        />

                        <MiniScore
                          label="Complete"
                          value={
                            evaluation.completeness
                          }
                        />

                        <MiniScore
                          label="Clarity"
                          value={evaluation.clarity}
                        />
                      </div>

                      {/* AI feedback */}

                      <div className="mt-6 rounded-xl border border-violet-400/[0.08] bg-violet-500/[0.03] p-5">
                        <div className="flex items-center gap-2">
                          <Sparkles
                            size={15}
                            className="text-violet-400"
                          />

                          <p className="text-xs font-medium text-violet-300">
                            AI Feedback
                          </p>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                          {evaluation.feedback ||
                            "No feedback was provided."}
                        </p>
                      </div>

                      {/* Strengths / improvements */}

                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                            What you did well
                          </p>

                          <div className="mt-3 space-y-2">
                            {(
                              evaluation.strengths ||
                              []
                            ).map((strength, i) => (
                              <div
                                key={i}
                                className="flex gap-2"
                              >
                                <CheckCircle2
                                  size={14}
                                  className="mt-0.5 shrink-0 text-emerald-400"
                                />

                                <p className="text-xs leading-5 text-zinc-500">
                                  {strength}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                            Improve
                          </p>

                          <div className="mt-3 space-y-2">
                            {(
                              evaluation.improvements ||
                              []
                            ).map(
                              (improvement, i) => (
                                <div
                                  key={i}
                                  className="flex gap-2"
                                >
                                  <Lightbulb
                                    size={14}
                                    className="mt-0.5 shrink-0 text-amber-400"
                                  />

                                  <p className="text-xs leading-5 text-zinc-500">
                                    {improvement}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom button */}

        <div className="mt-8 flex justify-center pb-10">
          <button
            onClick={onDashboard}
            className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            <ArrowLeft size={15} />

            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Score Bar
|--------------------------------------------------------------------------
*/

function ScoreBar({ label, score }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          {label}
        </span>

        <span className="text-xs font-medium text-zinc-300">
          {score}
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="h-full rounded-full bg-violet-500 transition-all duration-700"
          style={{
            width: `${Math.min(Math.max(score, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Mini Score
|--------------------------------------------------------------------------
*/

function MiniScore({ label, value }) {
  const score = Number(value || 0);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
      <p className="text-lg font-semibold">
        {score}
      </p>

      <p className="mt-1 text-[9px] uppercase tracking-wider text-zinc-700">
        {label}
      </p>
    </div>
  );
}

export default Results;