interface Props {
  onRandomizeDay: () => void
  onRandomizeAll: () => void
  onAdvance: () => void
  onExport: () => void
  onImport: (file: File) => void
  startDate: string
}

export function Controls({
  onRandomizeDay,
  onRandomizeAll,
  onAdvance,
  onExport,
  onImport,
  startDate,
}: Props) {
  return (
    <section className="space-y-3">
      <button
        type="button"
        onClick={onRandomizeDay}
        className="w-full min-h-20 rounded-3xl bg-emerald-500 text-2xl font-black tracking-widest text-zinc-950 shadow-lg shadow-emerald-900/40 active:scale-[0.98]"
      >
        RANDOMIZE
      </button>
      <p className="text-center text-xs text-zinc-500">
        Randomizes packs for the selected day — keeps that day&apos;s HITT
        session type (Warrior / Reload / Athlete / Combat)
      </p>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onRandomizeAll}
          className="min-h-14 rounded-2xl bg-emerald-800 text-sm font-black uppercase active:scale-95"
        >
          Randomize all 3
        </button>
        <button
          type="button"
          onClick={onAdvance}
          className="min-h-14 rounded-2xl bg-sky-800 text-sm font-black uppercase active:scale-95"
        >
          Advance day
        </button>
      </div>
      <p className="text-center text-xs text-zinc-500">
        Start: <span className="font-bold text-zinc-300">{startDate}</span>{' '}
        (Mon–Fri · HITT calendar)
      </p>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onExport}
          className="min-h-12 rounded-xl bg-zinc-700 text-sm font-bold uppercase"
        >
          Export JSON
        </button>
        <label className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-zinc-700 text-sm font-bold uppercase">
          Import JSON
          <input
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onImport(f)
              e.target.value = ''
            }}
          />
        </label>
      </div>
    </section>
  )
}
