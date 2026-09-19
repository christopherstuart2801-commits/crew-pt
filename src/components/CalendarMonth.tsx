import { useMemo, useState } from 'react'
import {
  addDays,
  isWeekday,
  parseDateKey,
  sessionForDate,
  toDateKey,
  todayKey,
} from '../lib/dates'
import type { Focus } from '../types'

interface Props {
  /** Currently selected plan date (usually days[selected].dateKey) */
  selectedDate: string
  /** Start of the 3-day window */
  startDate: string
  onSelectDate: (dateKey: string) => void
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const

const FOCUS_STYLE: Record<Focus, string> = {
  Warrior: 'text-amber-300',
  Reload: 'text-sky-300',
  Athlete: 'text-emerald-300',
  Combat: 'text-rose-300',
}

function monthLabel(year: number, monthIndex: number): string {
  return new Date(year, monthIndex, 1).toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  })
}

/** First Monday on/before the 1st of the month (for Mon-first grid). */
function gridStart(year: number, monthIndex: number): Date {
  const first = new Date(year, monthIndex, 1)
  const dow = first.getDay() // 0 Sun … 6 Sat
  const back = dow === 0 ? 6 : dow - 1
  first.setDate(first.getDate() - back)
  return first
}

function nextWeekdayKey(from: string): string {
  let k = from
  while (!isWeekday(k)) k = addDays(k, 1)
  return k
}

export function CalendarMonth({
  selectedDate,
  startDate,
  onSelectDate,
}: Props) {
  const anchor = parseDateKey(selectedDate || startDate || todayKey())
  const [cursor, setCursor] = useState(() => ({
    y: anchor.getFullYear(),
    m: anchor.getMonth(),
  }))

  const today = todayKey()

  const cells = useMemo(() => {
    const start = gridStart(cursor.y, cursor.m)
    const out: { key: string; inMonth: boolean; dow: number }[] = []
    for (let i = 0; i < 42; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      out.push({
        key: toDateKey(d),
        inMonth: d.getMonth() === cursor.m,
        dow: d.getDay(),
      })
    }
    const rows: (typeof out)[] = []
    for (let r = 0; r < 6; r++) {
      const row = out.slice(r * 7, r * 7 + 7)
      if (row.some((c) => c.inMonth)) rows.push(row)
    }
    return rows.map((row) => row.filter((c) => c.dow >= 1 && c.dow <= 5))
  }, [cursor.y, cursor.m])

  function shiftMonth(delta: number) {
    setCursor((c) => {
      const d = new Date(c.y, c.m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  }

  function jumpToday() {
    const t = parseDateKey(today)
    setCursor({ y: t.getFullYear(), m: t.getMonth() })
    onSelectDate(nextWeekdayKey(today))
  }

  return (
    <section className="rounded-2xl border border-zinc-700 bg-zinc-900 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="min-h-11 min-w-11 rounded-xl bg-zinc-800 text-lg font-black active:scale-95"
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="text-center">
          <div className="text-sm font-black uppercase tracking-wide">
            {monthLabel(cursor.y, cursor.m)}
          </div>
          <div className="text-[10px] font-bold uppercase text-zinc-500">
            HITT calendar · Mon–Fri
          </div>
        </div>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="min-h-11 min-w-11 rounded-xl bg-zinc-800 text-lg font-black active:scale-95"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="mb-1 grid grid-cols-5 gap-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold uppercase text-zinc-500"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {cells.map((row, ri) => (
          <div key={ri} className="grid grid-cols-5 gap-1">
            {row.map((cell) => {
              const focus = sessionForDate(cell.key)
              const selected = cell.key === selectedDate
              const isStart = cell.key === startDate
              const isToday = cell.key === today
              const muted = !cell.inMonth

              return (
                <button
                  key={cell.key}
                  type="button"
                  onClick={() => onSelectDate(cell.key)}
                  className={`min-h-[3.25rem] rounded-xl border px-0.5 py-1 text-center transition active:scale-95 ${
                    selected
                      ? 'border-emerald-500 bg-emerald-900/60'
                      : isToday
                        ? 'border-amber-600/70 bg-zinc-950'
                        : 'border-zinc-800 bg-zinc-950/80'
                  } ${muted ? 'opacity-40' : ''}`}
                >
                  <div
                    className={`text-sm font-black ${
                      selected ? 'text-emerald-200' : 'text-zinc-100'
                    }`}
                  >
                    {parseDateKey(cell.key).getDate()}
                    {isStart && !selected ? (
                      <span className="ml-0.5 text-[9px] text-sky-400">●</span>
                    ) : null}
                  </div>
                  <div
                    className={`truncate text-[9px] font-bold leading-tight ${FOCUS_STYLE[focus]}`}
                  >
                    {focus}
                  </div>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-2">
        <button
          type="button"
          onClick={jumpToday}
          className="min-h-10 w-full rounded-xl bg-zinc-800 text-xs font-black uppercase active:scale-95"
        >
          Jump to today
        </button>
      </div>

      <p className="mt-2 text-center text-[10px] text-zinc-500">
        Tap a day to select · Mon Warrior · Tue/Thu Reload · Wed Athlete · Fri
        Combat
      </p>
    </section>
  )
}
