function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500">{title}</p>

          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            {value}
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-300">
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        {description}
      </p>
    </div>
  );
}

export default StatCard;