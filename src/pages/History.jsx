import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  History as HistoryIcon,
  Trash2,
  Trophy,
  X,
} from "lucide-react";

function History({
  history,
  onViewResult,
  onDelete,
  onClear,
  onNewInterview,
}) {
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Unknown date";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleDateString(
      undefined,
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatTime = (totalSeconds) => {
    const seconds = Number(totalSeconds || 0);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(
      2,
      "0"
    )}`;
  };

  const getScore = (item) => {
    const scores = (item.answers || [])
      .map((answer) =>
        Number(answer.evaluation?.score)
      )
      .filter(
        (score) => !Number.isNaN(score)
      );

    if (scores.length === 0) {
      return 0;
    }

    return Math.round(
      scores.reduce(
        (sum, score) => sum + score,
        0
      ) / scores.length
    );
  };

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

  const getScoreClass = (score) => {
    if (score >= 85) {
      return "text-emerald-400";
    }

    if (score >= 70) {
      return "text-violet-400";
    }

    if (score >= 50) {
      return "text-amber-400";
    }

    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-white">
      {/* Header */}

      <header className="border-b border-white/[0.07] bg-[#0b0c10]">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
              <HistoryIcon
                size={18}
                className="text-violet-400"
              />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Interview History
              </p>

              <p className="mt-0.5 text-[11px] text-zinc-600">
                Review your previous interviews
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to clear all interview history?"
                );

                if (confirmed) {
                  onClear();
                }
              }}
              className="flex items-center gap-2 rounded-lg border border-red-400/10 px-3 py-2 text-xs text-zinc-500 transition hover:border-red-400/20 hover:bg-red-400/[0.04] hover:text-red-400"
            >
              <Trash2 size={14} />

              Clear History
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* Heading */}

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
            Your Activity
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Interview History
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Review your previous technical interviews,
            scores, answers and AI feedback.
          </p>
        </div>

        {/* Empty state */}

        {history.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/[0.07] bg-[#0d0f14] px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
              <HistoryIcon
                size={25}
                className="text-violet-400"
              />
            </div>

            <h2 className="mt-6 text-lg font-semibold">
              No interviews yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600">
              Complete your first AI-powered technical
              interview and your results will appear here.
            </p>

            <button
              onClick={onNewInterview}
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Start New Interview

              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <>
            {/* Summary */}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
                  <HistoryIcon
                    size={17}
                    className="text-violet-400"
                  />
                </div>

                <p className="mt-5 text-2xl font-semibold">
                  {history.length}
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Interviews Completed
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Trophy
                    size={17}
                    className="text-emerald-400"
                  />
                </div>

                <p className="mt-5 text-2xl font-semibold">
                  {Math.max(
                    ...history.map((item) =>
                      getScore(item)
                    )
                  )}
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Highest Score
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                  <CheckCircle2
                    size={17}
                    className="text-blue-400"
                  />
                </div>

                <p className="mt-5 text-2xl font-semibold">
                  {history.reduce(
                    (total, item) =>
                      total +
                      (item.answers?.length || 0),
                    0
                  )}
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Questions Answered
                </p>
              </div>
            </div>

            {/* History list */}

            <section className="mt-8">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  Previous Interviews
                </h2>

                <p className="mt-1 text-xs text-zinc-600">
                  Select an interview to view its complete
                  performance report.
                </p>
              </div>

              <div className="space-y-3">
                {history.map((item) => {
                  const score = getScore(item);

                  return (
                    <div
                      key={item.id}
                      className="group rounded-2xl border border-white/[0.07] bg-[#0d0f14] p-5 transition hover:border-white/[0.12] hover:bg-[#0f1116]"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        {/* Main info */}

                        <div className="flex min-w-0 items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                            <HistoryIcon
                              size={19}
                              className="text-violet-400"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-semibold text-zinc-200">
                                {item.domainName ||
                                  item.domain ||
                                  "Technical Interview"}
                              </h3>

                              <span className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-1 text-[10px] text-zinc-500">
                                {item.difficultyName ||
                                  item.difficulty ||
                                  "Unknown"}
                              </span>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-zinc-600">
                              <span className="flex items-center gap-1.5">
                                <CalendarDays size={13} />

                                {formatDate(
                                  item.completedAt
                                )}
                              </span>

                              <span className="flex items-center gap-1.5">
                                <Clock3 size={13} />

                                {formatTime(
                                  item.duration
                                )}
                              </span>

                              <span>
                                {item.answers?.length ||
                                  0}{" "}
                                Questions
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Score + actions */}

                        <div className="flex items-center justify-between gap-5 lg:justify-end">
                          <div className="text-left lg:text-right">
                            <p
                              className={`text-2xl font-semibold ${getScoreClass(
                                score
                              )}`}
                            >
                              {score}
                            </p>

                            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-700">
                              {getScoreLabel(score)}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                onViewResult(item)
                              }
                              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-medium text-black transition hover:bg-zinc-200"
                            >
                              View Results

                              <ArrowRight
                                size={14}
                              />
                            </button>

                            <button
                              onClick={() =>
                                onDelete(item.id)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] text-zinc-600 transition hover:border-red-400/20 hover:bg-red-400/[0.04] hover:text-red-400"
                              title="Delete interview"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* Bottom */}

        <div className="mt-10 flex justify-center pb-10">
          <button
            onClick={onNewInterview}
            className="flex items-center gap-2 rounded-lg border border-white/[0.07] px-5 py-2.5 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            Start New Interview

            <ArrowRight size={15} />
          </button>
        </div>
      </main>
    </div>
  );
}

export default History;