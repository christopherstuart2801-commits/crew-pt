import { STATUS_COLOR, STATUS_CYCLE, STATUS_LABEL } from '../data/roster'
import type { Marine, Status } from '../types'

interface Props {
  roster: Marine[]
  statuses: Record<string, Status>
  onCycle: (id: string) => void
  onEdit: () => void
}

export function RollCall({ roster, statuses, onCycle, onEdit }: Props) {
  const present = roster.filter((m) => (statuses[m.id] ?? 'P') === 'P').length

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-wide">ROLL CALL</h2>
          <p className="text-2xl font-black text-emerald-400">
            {present}
            <span className="text-base font-semibold text-zinc-400">
              {' '}
              / {roster.length} present
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="min-h-12 rounded-xl bg-zinc-700 px-4 text-sm font-bold uppercase tracking-wide active:scale-95"
        >
          Edit
        </button>
      </div>

      <div className="mb-2 flex flex-wrap gap-1 text-[10px] uppercase text-zinc-500">
        {STATUS_CYCLE.map((s) => (
          <span key={s} className={`rounded px-1.5 py-0.5 ${STATUS_COLOR[s]}`}>
            {s}={STATUS_LABEL[s]}
          </span>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {roster.map((m) => {
          const st = statuses[m.id] ?? 'P'
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => onCycle(m.id)}
                className="flex w-full min-h-14 items-center justify-between gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-left active:scale-[0.98]"
              >
                <span className="min-w-0">
                  <span className="block truncate text-base font-bold">
                    {m.rank} {m.name}
                  </span>
                  {m.role === 'PTNCO' && (
                    <span className="text-xs font-semibold text-amber-400">
                      PTNCO
                    </span>
                  )}
                </span>
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-black ${STATUS_COLOR[st]}`}
                >
                  {st}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
