import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  Clock3,
  Code2,
  Database,
  Layers3,
  Sparkles,
} from "lucide-react";

const domains = [
  {
    id: "python",
    name: "Python",
    description: "Python fundamentals, OOP and problem solving",
    icon: Code2,
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    description: "Algorithms, preprocessing and model evaluation",
    icon: BrainCircuit,
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "EDA, statistics and data analysis",
    icon: Database,
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    description: "AI concepts, neural networks and modern AI",
    icon: Sparkles,
  },
];

const difficulties = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Fundamental concepts and basic questions",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "Practical concepts and problem solving",
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Deep technical and scenario-based questions",
  },
];

const questionCounts = [5, 10, 15];

const modes = [
  {
    id: "technical",
    name: "Technical Knowledge",
    description: "Conceptual technical questions",
    icon: BrainCircuit,
  },
  {
    id: "coding",
    name: "Coding + Technical",
    description: "Technical questions and coding problems",
    icon: Code2,
  },
  {
    id: "mixed",
    name: "Mixed Interview",
    description: "Balanced technical interview",
    icon: Layers3,
  },
];

function InterviewSetup({ onBack, onStart }) {
  const [selectedDomain, setSelectedDomain] = useState("python");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState("intermediate");
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedMode, setSelectedMode] = useState("mixed");

  const selectedDomainData = domains.find(
    (domain) => domain.id === selectedDomain
  );

  const selectedDifficultyData = difficulties.find(
    (difficulty) => difficulty.id === selectedDifficulty
  );

  const selectedModeData = modes.find(
    (mode) => mode.id === selectedMode
  );

  const estimatedMinutes = questionCount * 2;

  const handleStart = () => {
    const interviewConfig = {
      domain: selectedDomain,
      domainName: selectedDomainData?.name,
      difficulty: selectedDifficulty,
      difficultyName: selectedDifficultyData?.name,
      questionCount,
      mode: selectedMode,
      modeName: selectedModeData?.name,
    };

    if (onStart) {
      onStart(interviewConfig);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-[72px] items-center border-b border-white/[0.06] bg-[#08090c]/90 px-5 backdrop-blur-xl sm:px-7 lg:px-10">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-zinc-500 transition hover:bg-white/[0.04] hover:text-white"
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />

          Back to Dashboard
        </button>

        <div className="ml-auto flex items-center gap-2">
          <Sparkles size={14} className="text-violet-400" />

          <span className="text-xs text-zinc-500">
            AI Interview Setup
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-[1250px] px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
        {/* Heading */}
        <section>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
              Interview configuration
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Set up your interview
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Customize your AI technical interview by choosing a
            domain, difficulty, number of questions and interview mode.
          </p>
        </section>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_350px]">
          {/* Left */}
          <div className="space-y-6">
            {/* Domain */}
            <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    01. Choose your domain
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    What technical area do you want to practice?
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-500">
                  <BrainCircuit size={15} />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {domains.map((domain) => {
                  const Icon = domain.icon;
                  const selected = selectedDomain === domain.id;

                  return (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain.id)}
                      className={`group relative rounded-xl border p-4 text-left transition-all duration-200 ${
                        selected
                          ? "border-violet-400/30 bg-violet-400/[0.07]"
                          : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.14] hover:bg-white/[0.035]"
                      }`}
                    >
                      {selected && (
                        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-400 text-black">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}

                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          selected
                            ? "bg-violet-400/[0.12] text-violet-300"
                            : "bg-white/[0.04] text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        <Icon size={17} />
                      </div>

                      <h3 className="mt-4 text-sm font-medium text-zinc-200">
                        {domain.name}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-zinc-600">
                        {domain.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Difficulty */}
            <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  02. Choose difficulty
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  How challenging should the questions be?
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                {difficulties.map((difficulty) => {
                  const selected =
                    selectedDifficulty === difficulty.id;

                  return (
                    <button
                      key={difficulty.id}
                      onClick={() =>
                        setSelectedDifficulty(difficulty.id)
                      }
                      className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                        selected
                          ? "border-violet-400/30 bg-violet-400/[0.07]"
                          : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.14] hover:bg-white/[0.035]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-zinc-200">
                          {difficulty.name}
                        </h3>

                        {selected && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-400 text-black">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      <p className="mt-2 text-xs leading-5 text-zinc-600">
                        {difficulty.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Questions */}
            <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  03. Number of questions
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Choose how many questions you want to answer.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {questionCounts.map((count) => {
                  const selected = questionCount === count;

                  return (
                    <button
                      key={count}
                      onClick={() => setQuestionCount(count)}
                      className={`flex min-w-[90px] items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm transition-all duration-200 ${
                        selected
                          ? "border-violet-400/30 bg-violet-400/[0.08] text-violet-300"
                          : "border-white/[0.07] bg-white/[0.015] text-zinc-500 hover:border-white/[0.14] hover:text-zinc-300"
                      }`}
                    >
                      {count}

                      <span className="text-xs">
                        questions
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Mode */}
            <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  04. Interview mode
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Choose how the AI should conduct your interview.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                {modes.map((mode) => {
                  const Icon = mode.icon;
                  const selected = selectedMode === mode.id;

                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                        selected
                          ? "border-violet-400/30 bg-violet-400/[0.07]"
                          : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.14] hover:bg-white/[0.035]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                            selected
                              ? "bg-violet-400/[0.12] text-violet-300"
                              : "bg-white/[0.04] text-zinc-500"
                          }`}
                        >
                          <Icon size={15} />
                        </div>

                        {selected && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-400 text-black">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      <h3 className="mt-4 text-sm font-medium text-zinc-200">
                        {mode.name}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-zinc-600">
                        {mode.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Summary */}
          <aside className="xl:sticky xl:top-[96px] xl:h-fit">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101116]">
              {/* Summary header */}
              <div className="border-b border-white/[0.06] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <h2 className="text-sm font-medium text-zinc-200">
                      Interview summary
                    </h2>

                    <p className="mt-0.5 text-[10px] text-zinc-600">
                      Your selected configuration
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1 p-5">
                <SummaryRow
                  label="Domain"
                  value={selectedDomainData?.name}
                />

                <SummaryRow
                  label="Difficulty"
                  value={selectedDifficultyData?.name}
                />

                <SummaryRow
                  label="Questions"
                  value={`${questionCount} questions`}
                />

                <SummaryRow
                  label="Mode"
                  value={selectedModeData?.name}
                />
              </div>

              {/* Time */}
              <div className="mx-5 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-500">
                    <Clock3 size={16} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-600">
                      Estimated time
                    </p>

                    <p className="mt-1 text-sm font-medium text-zinc-300">
                      ~{estimatedMinutes} minutes
                    </p>
                  </div>
                </div>
              </div>

              {/* Start */}
              <div className="p-5">
                <button
                  onClick={handleStart}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/[0.04]"
                >
                  Start Interview

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>

                <p className="mt-3 text-center text-[10px] leading-4 text-zinc-600">
                  Your AI interviewer will generate questions
                  based on your selected configuration.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------- */
/* Summary Row                      */
/* -------------------------------- */

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg px-3 py-3 transition hover:bg-white/[0.025]">
      <span className="text-xs text-zinc-600">
        {label}
      </span>

      <span className="truncate text-right text-xs font-medium text-zinc-300">
        {value}
      </span>
    </div>
  );
}

export default InterviewSetup;