import {
  BarChart3,
  BrainCircuit,
  History,
  LayoutDashboard,
  MessageSquarePlus,
  Settings,
} from "lucide-react";

function Sidebar({ currentPage, onNavigate }) {
  const navigation = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "setup",
      label: "New Interview",
      icon: MessageSquarePlus,
    },
    {
      id: "history",
      label: "History",
      icon: History,
    },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-[250px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0b0c10] px-4 py-5">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black">
          <BrainCircuit size={21} strokeWidth={2.2} />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-[14px] font-semibold tracking-tight text-white">
            AI Interviewer
          </h1>

          <p className="mt-0.5 truncate text-[11px] text-zinc-500">
            Technical Assessment
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="mt-10">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
          Main
        </p>

        <nav className="mt-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              item.id === currentPage ||
              (item.id === "setup" && currentPage === "interview");

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition-all duration-200 ${
                  active
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                }`}
              >
                <Icon size={17} strokeWidth={1.9} />

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Analytics */}
      <div className="mt-8">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
          Analytics
        </p>

        <button className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-zinc-500 transition hover:bg-white/[0.04] hover:text-zinc-200">
          <BarChart3 size={17} strokeWidth={1.9} />

          <span>Performance</span>
        </button>
      </div>

      {/* Bottom */}
      <div className="mt-auto">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-zinc-500 transition hover:bg-white/[0.04] hover:text-zinc-200">
          <Settings size={17} strokeWidth={1.9} />

          <span>Settings</span>
        </button>

        {/* User */}
        <div className="mt-4 border-t border-white/[0.07] pt-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-xs font-semibold text-white">
              DJ
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-zinc-200">
                Dheeraj John
              </p>

              <p className="mt-0.5 text-[10px] text-zinc-600">
                Candidate
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;