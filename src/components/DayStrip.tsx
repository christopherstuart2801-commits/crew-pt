import type { DayPlan } from '../types'

interface Props {
  days: DayPlan[]
  selected: number
  onSelect: (i: number) => void
}

export function DayStrip({ days, selected, onSelect }: Props) {
  const short = ['Today', 'Tomorrow', 'Day+2']
  return (
    <div className="grid grid-cols-3 gap-2">
      {days.map((d, i) => {
        const active = i === selected
        return (
          <button
            key={d.dateKey}
            type="button"
            onClick={() => onSelect(i)}
            className={`min-h-16 rounded-2xl border px-2 py-2 text-center active:scale-95 ${
              active
                ? 'border-emerald-500 bg-emerald-900/50'
                : 'border-zinc-700 bg-zinc-900'
            }`}
          >
            <div className="text-sm font-black uppercase">{short[i]}</div>
            <div className="text-xs text-zinc-400">
              {d.dateKey.slice(5).replace('-', '/')}
            </div>
            <div className="mt-1 truncate text-xs font-bold text-amber-300">
              {d.focus}
            </div>
          </button>
        )
      })}
    </div>
  )
}
