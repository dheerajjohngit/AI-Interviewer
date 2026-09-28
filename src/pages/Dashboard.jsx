import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  History,
  MessageSquare,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

function Dashboard({
  history = [],
  onNewInterview,
  onViewHistory,
}) {
  const totalInterviews = history.length;

  const totalQuestions = history.reduce(
    (total, interview) =>
      total + (interview.answers?.length || 0),
    0
  );

  const scores = history
    .map((interview) => calculateInterviewScore(interview))
    .filter((score) => score !== null);

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) /
            scores.length
        )
      : 0;

  const bestScore =
    scores.length > 0 ? Math.max(...scores) : 0;

  const recentInterviews = history.slice(0, 5);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Unknown date";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDuration = (seconds) => {
    const totalSeconds = Number(seconds || 0);

    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds}s`;
    }

    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#08090c]">
      {/* Top Header */}

      <header className="flex h-[76px] items-center justify-between border-b border-white/[0.06] px-6 sm:px-8">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-600">
            Dashboard
          </p>

          <p className="mt-1 text-sm font-medium text-zinc-300">
            AI Technical Assessment
          </p>
        </div>

        <button
          onClick={onNewInterview}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.07] hover:text-white"
          title="Start new interview"
        >
          <Sparkles size={16} />
        </button>
      </header>

      {/* Main Content */}

      <div className="w-full px-6 py-8 sm:px-8 lg:px-10">
        {/* Welcome Section */}

        <section>
          <p className="text-sm text-zinc-500">
            Welcome back
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Good morning, DJ 👋
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Continue improving your technical interview skills
            with personalized AI-powered practice.
          </p>
        </section>

        {/* Statistics */}

        <section className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Trophy}
            label="Interviews"
            value={totalInterviews}
            note={
              totalInterviews === 0
                ? "No interviews completed yet"
                : "Completed interviews"
            }
          />

          <StatCard
            icon={Target}
            label="Average Score"
            value={`${averageScore}%`}
            note={
              totalInterviews === 0
                ? "Complete an interview to see your score"
                : "Across all interviews"
            }
          />

          <StatCard
            icon={MessageSquare}
            label="Questions"
            value={totalQuestions}
            note={
              totalQuestions === 0
                ? "No questions answered yet"
                : "Questions answered"
            }
          />

          <StatCard
            icon={CheckCircle2}
            label="Best Score"
            value={`${bestScore}%`}
            note={
              totalInterviews === 0
                ? "Your highest score"
                : "Highest interview score"
            }
          />
        </section>

        {/* Main Hero */}

        <section className="relative mt-6 min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101116]">
          {/* Background Glow */}

          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-600/[0.08] blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-indigo-600/[0.05] blur-[100px]" />

          <div className="relative p-7 sm:p-9 lg:p-10">
            {/* Icon */}

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black shadow-xl shadow-black/20">
              <BrainCircuit size={23} strokeWidth={2} />
            </div>

            {/* Badge */}

            <div className="mt-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
                AI Powered
              </span>
            </div>

            {/* Heading */}

            <h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-[34px]">
              Ready for your next technical interview?
            </h2>

            {/* Description */}

            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500">
              Practice with an AI interviewer that asks technical
              questions, evaluates your answers, and provides
              personalized feedback to help you improve.
            </p>

            {/* Button */}

            <button
              onClick={onNewInterview}
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-black transition-all duration-200 hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/[0.05]"
            >
              Start Interview

              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* Recent Interviews */}

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white">
                Recent interviews
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                Review your latest AI interview sessions.
              </p>
            </div>

            {history.length > 0 && (
              <button
                onClick={() => onViewHistory(history[0])}
                className="text-xs text-zinc-500 transition hover:text-white"
              >
                View latest
              </button>
            )}
          </div>

          {recentInterviews.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-500">
                <History size={21} />
              </div>

              <h3 className="mt-5 text-sm font-medium text-zinc-300">
                No interview history yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-zinc-600">
                Complete your first AI interview and your
                performance will appear here.
              </p>

              <button
                onClick={onNewInterview}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-zinc-200"
              >
                Start Your First Interview
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {recentInterviews.map((interview, index) => {
                const score =
                  calculateInterviewScore(interview) ?? 0;

                return (
                  <button
                    key={interview.id || index}
                    onClick={() => onViewHistory(interview)}
                    className="group flex w-full items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition-all duration-200 hover:border-white/[0.13] hover:bg-white/[0.04]"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-zinc-400 transition group-hover:bg-white group-hover:text-black">
                        <BrainCircuit
                          size={17}
                          strokeWidth={1.8}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-zinc-200">
                            {interview.domainName ||
                              interview.domain ||
                              "Technical Interview"}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-zinc-700" />

                          <span className="text-[10px] uppercase tracking-wider text-violet-400">
                            {interview.difficultyName ||
                              interview.difficulty ||
                              "General"}
                          </span>
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-zinc-600">
                          <span>
                            {formatDate(
                              interview.completedAt
                            )}
                          </span>

                          <span>•</span>

                          <span>
                            {interview.answers?.length || 0}{" "}
                            questions
                          </span>

                          <span>•</span>

                          <span>
                            {formatDuration(
                              interview.duration
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          {score}
                        </p>

                        <p className="text-[9px] uppercase tracking-wider text-zinc-700">
                          Score
                        </p>
                      </div>

                      <ArrowUpRight
                        size={15}
                        className="text-zinc-700 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-300"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Practice Domains */}

        <section className="mt-10">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Practice domains
            </h2>

            <p className="mt-1 text-xs text-zinc-600">
              Select a technical area for your next interview.
            </p>
          </div>

          <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3">
            <DomainCard
              icon={Code2}
              title="Python"
              description="Python fundamentals, OOP, functions and problem solving."
              onClick={onNewInterview}
            />

            <DomainCard
              icon={BrainCircuit}
              title="Machine Learning"
              description="Algorithms, preprocessing, training and model evaluation."
              onClick={onNewInterview}
            />

            <DomainCard
              icon={Database}
              title="Data Science"
              description="EDA, statistics, visualization and data analysis."
              onClick={onNewInterview}
            />
          </div>
        </section>

        {/* Bottom Spacing */}

        <div className="h-12" />
      </div>
    </div>
  );
}

/* -------------------------------- */
/* Interview Score                  */
/* -------------------------------- */

function calculateInterviewScore(interview) {
  if (!interview?.answers?.length) {
    return null;
  }

  const scores = interview.answers
    .map((item) => Number(item.evaluation?.score))
    .filter((score) => !Number.isNaN(score));

  if (scores.length === 0) {
    return null;
  }

  return Math.round(
    scores.reduce((sum, score) => sum + score, 0) /
      scores.length
  );
}

/* -------------------------------- */
/* Statistic Card                   */
/* -------------------------------- */

function StatCard({
  icon: Icon,
  label,
  value,
  note,
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.035]">
      <div className="flex items-center justify-between gap-4">
        <p className="truncate text-xs text-zinc-500">
          {label}
        </p>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-zinc-400">
          <Icon size={15} strokeWidth={1.8} />
        </div>
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-1 truncate text-[10px] text-zinc-600">
        {note}
      </p>
    </div>
  );
}

/* -------------------------------- */
/* Domain Card                      */
/* -------------------------------- */

function DomainCard({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.025] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.045]"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-zinc-400 transition-all duration-200 group-hover:bg-white group-hover:text-black">
          <Icon size={17} strokeWidth={1.8} />
        </div>

        <ArrowUpRight
          size={15}
          className="shrink-0 text-zinc-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-300"
        />
      </div>

      <h3 className="mt-5 text-sm font-medium text-zinc-200">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-zinc-600">
        {description}
      </p>
    </button>
  );
}

export default Dashboard;