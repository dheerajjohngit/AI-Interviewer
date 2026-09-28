import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  MessageSquare,
  Play,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";

function Dashboard({ onNewInterview }) {
  return (
    <div className="min-h-screen bg-[#08090c] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-white/[0.06] bg-[#08090c]/90 px-6 backdrop-blur-xl lg:px-10">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            Workspace
          </p>

          <h2 className="mt-1 text-sm font-medium text-zinc-300">
            Technical Interview
          </h2>
        </div>

        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-zinc-400 transition hover:border-white/[0.15] hover:text-white">
          <Sparkles size={16} />
        </button>
      </header>

      <main className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-7 lg:px-10">
        {/* Welcome */}
        <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm text-zinc-500">
              Welcome back
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Good morning, DJ 👋
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
              Continue building your technical confidence with
              AI-powered interview practice.
            </p>
          </div>

          <button
            onClick={onNewInterview}
            className="group inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-zinc-200"
          >
            New Interview

            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </section>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Trophy}
            label="Interviews"
            value="12"
            description="+3 this month"
          />

          <StatCard
            icon={Target}
            label="Average score"
            value="78%"
            description="Across recent interviews"
          />

          <StatCard
            icon={MessageSquare}
            label="Questions"
            value="86"
            description="Across all domains"
          />

          <StatCard
            icon={TrendingUp}
            label="Improvement"
            value="+14%"
            description="Compared with last month"
          />
        </section>

        {/* Hero */}
        <section className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101116]">
          <div className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-violet-600/[0.13] blur-[110px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px]" />

          <div className="relative grid min-h-[330px] lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.06] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                  AI Powered
                </span>
              </div>

              <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.035em] sm:text-4xl">
                Ready for your next
                <span className="block bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                  technical interview?
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500">
                Choose a technical domain, select your difficulty,
                and let your AI interviewer challenge you with
                personalized questions.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={onNewInterview}
                  className="group inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-zinc-200"
                >
                  <Play size={13} fill="currentColor" />

                  Start Interview

                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>

                <button className="inline-flex items-center gap-2 rounded-lg border border-white/[0.09] bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.06] hover:text-white">
                  <Zap size={14} />

                  Quick Practice
                </button>
              </div>
            </div>

            {/* AI Visual */}
            <div className="relative hidden overflow-hidden border-l border-white/[0.06] lg:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute h-64 w-64 rounded-full border border-violet-400/[0.08]" />
                <div className="absolute h-48 w-48 rounded-full border border-violet-400/[0.1]" />
                <div className="absolute h-32 w-32 rounded-full border border-violet-400/[0.12]" />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/[0.07] shadow-[0_0_80px_rgba(139,92,246,0.18)]">
                  <BrainCircuit
                    size={42}
                    strokeWidth={1.2}
                    className="text-violet-300"
                  />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/[0.07] bg-black/30 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-600">
                      Interview engine
                    </p>

                    <p className="mt-1 text-xs font-medium text-zinc-300">
                      Ready to evaluate
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Domains */}
        <section className="mt-10">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
              Interview library
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Practice domains
            </h2>

            <p className="mt-1 text-xs text-zinc-600">
              Choose what you want to practice today.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            <DomainCard
              icon={Code2}
              title="Python"
              description="Python fundamentals, OOP, functions, data structures and problem solving."
            />

            <DomainCard
              icon={BrainCircuit}
              title="Machine Learning"
              description="Algorithms, preprocessing, model training, evaluation and ML concepts."
            />

            <DomainCard
              icon={Database}
              title="Data Science"
              description="EDA, statistics, visualization, preprocessing and analytical thinking."
            />
          </div>
        </section>

        {/* Performance */}
        <section className="mt-10 grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  Recent performance
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Your latest interview results
                </p>
              </div>

              <button className="text-xs text-zinc-600 hover:text-white">
                View history
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <PerformanceRow
                domain="Python"
                date="Today"
                score="84%"
                status="Strong"
                icon={Code2}
              />

              <PerformanceRow
                domain="Machine Learning"
                date="Yesterday"
                score="76%"
                status="Good"
                icon={BrainCircuit}
              />

              <PerformanceRow
                domain="Data Science"
                date="Sep 22"
                score="72%"
                status="Good"
                icon={Database}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/[0.08] text-violet-300">
                <Sparkles size={15} />
              </div>

              <div>
                <p className="text-sm font-medium text-zinc-200">
                  AI feedback
                </p>

                <p className="text-[10px] text-zinc-600">
                  From your recent sessions
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 p-4">
              <div className="flex gap-3">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />

                <div>
                  <p className="text-xs font-medium text-zinc-300">
                    Your Python fundamentals are improving.
                  </p>

                  <p className="mt-2 text-xs leading-5 text-zinc-600">
                    Focus next on explaining your approach clearly
                    before writing the solution.
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.05] hover:text-white">
              View detailed feedback
              <ArrowUpRight size={13} />
            </button>
          </div>
        </section>

        <div className="h-10" />
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-white/[0.13] hover:bg-white/[0.035]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-zinc-600">
            {label}
          </p>

          <p className="mt-3 text-2xl font-semibold tracking-tight">
            {value}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.035] text-zinc-500 group-hover:text-violet-300">
          <Icon size={16} strokeWidth={1.7} />
        </div>
      </div>

      <p className="mt-4 text-[10px] text-zinc-600">
        {description}
      </p>
    </div>
  );
}

function DomainCard({ icon: Icon, title, description }) {
  return (
    <button className="group relative min-w-0 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 text-left transition hover:-translate-y-1 hover:border-violet-400/20">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035] text-zinc-400 group-hover:text-violet-300">
          <Icon size={18} />
        </div>

        <ArrowUpRight
          size={16}
          className="text-zinc-700 group-hover:text-zinc-300"
        />
      </div>

      <h3 className="mt-6 text-sm font-semibold text-zinc-200">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-zinc-600">
        {description}
      </p>
    </button>
  );
}

function PerformanceRow({
  domain,
  date,
  score,
  status,
  icon: Icon,
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.035] text-zinc-500">
        <Icon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-zinc-300">
          {domain}
        </p>

        <p className="mt-1 text-[10px] text-zinc-600">
          {date}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs font-semibold">
          {score}
        </p>

        <p className="mt-1 text-[10px] text-emerald-400">
          {status}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;