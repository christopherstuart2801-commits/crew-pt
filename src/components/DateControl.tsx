import { formatLong, sessionForDate } from '../lib/dates'
import type { Focus } from '../types'

const FOCUS_STYLE: Record<Focus, string> = {
  Warrior: 'bg-amber-900/70 text-amber-200 border-amber-600/50',
  Reload: 'bg-sky-900/70 text-sky-200 border-sky-600/50',
  Athlete: 'bg-emerald-900/70 text-emerald-200 border-emerald-600/50',
  Combat: 'bg-rose-900/70 text-rose-200 border-rose-600/50',
}

interface Props {
  selectedDate: string
  onPickDate: () => void
}

export function DateControl({ selectedDate, onPickDate }: Props) {
  const focus = sessionForDate(selectedDate)

  return (
    <section className="rounded-2xl border border-zinc-700 bg-zinc-900 p-3">
      <div className="flex items-stretch gap-2">
        <div className="min-w-0 flex-1 rounded-xl bg-zinc-950/80 px-3 py-2">
          <div className="text-[10px] font-bold uppercase tracking-wide text-zinc-500">
            Selected date
          </div>
          <div className="truncate text-xl font-black leading-tight">
            {formatLong(selectedDate)}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase text-zinc-500">
              HITT
            </span>
            <span
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-sm font-black ${FOCUS_STYLE[focus]}`}
            >
              {focus}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onPickDate}
          className="min-h-[4.5rem] min-w-[5.5rem] shrink-0 rounded-2xl bg-emerald-600 px-3 text-center text-sm font-black uppercase leading-tight text-zinc-950 shadow-lg shadow-emerald-900/30 active:scale-95"
        >
          Pick
          <br />
          date
        </button>
      </div>
    </section>
  )
}
