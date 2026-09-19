import { useEffect, useMemo, useState } from 'react'
import {
  isWeekend,
  parseDateKey,
  sessionForDate,
  snapToWeekday,
  toDateKey,
  todayKey,
  weekendSnapNote,
} from '../lib/dates'
import type { Focus } from '../types'

interface Props {
  open: boolean
  selectedDate: string
  startDate: string
  onSelectDate: (dateKey: string, note?: string | null) => void
  onClose: () => void
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

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

/** First Monday on/before the 1st of the month (Mon-first grid). */
function gridStart(year: number, monthIndex: number): Date {
  const first = new Date(year, monthIndex, 1)
  const dow = first.getDay() // 0 Sun … 6 Sat
  const back = dow === 0 ? 6 : dow - 1
  first.setDate(first.getDate() - back)
  return first
}

export function CalendarMonth({
  open,
  selectedDate,
  startDate,
  onSelectDate,
  onClose,
}: Props) {
  const anchor = parseDateKey(selectedDate || startDate || todayKey())
  const [cursor, setCursor] = useState(() => ({
    y: anchor.getFullYear(),
    m: anchor.getMonth(),
  }))

  useEffect(() => {
    if (!open) return
    const a = parseDateKey(selectedDate || startDate || todayKey())
    setCursor({ y: a.getFullYear(), m: a.getMonth() })
  }, [open, selectedDate, startDate])

  const today = todayKey()

  const cells = useMemo(() => {
    const start = gridStart(cursor.y, cursor.m)
    const out: { key: string; inMonth: boolean }[] = []
    for (let i = 0; i < 42; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      out.push({
        key: toDateKey(d),
        inMonth: d.getMonth() === cursor.m,
      })
    }
    const rows: (typeof out)[] = []
    for (let r = 0; r < 6; r++) {
      const row = out.slice(r * 7, r * 7 + 7)
      if (row.some((c) => c.inMonth)) rows.push(row)
    }
    return rows
  }, [cursor.y, cursor.m])

  function shiftMonth(delta: number) {
    setCursor((c) => {
      const d = new Date(c.y, c.m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  }

  function pick(key: string) {
    const note = weekendSnapNote(key)
    const resolved = snapToWeekday(key)
    onSelectDate(resolved, note)
    onClose()
  }

  function jumpToday() {
    const note = weekendSnapNote(today)
    const resolved = snapToWeekday(today)
    const a = parseDateKey(resolved)
    setCursor({ y: a.getFullYear(), m: a.getMonth() })
    onSelectDate(resolved, note ?? 'Jumped to today')
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 p-3 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Pick training date"
      onClick={onClose}
    >
      <div
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-3xl border border-zinc-600 bg-zinc-900 p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-lg font-black uppercase tracking-wide">
            Pick date
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 min-w-12 rounded-2xl bg-zinc-800 text-xl font-black active:scale-95"
            aria-label="Close calendar"
          >
            ✕
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="min-h-14 min-w-14 rounded-2xl bg-zinc-800 text-3xl font-black active:scale-95"
            aria-label="Previous month"
          >
            ‹
          </button>
          <div className="text-center">
            <div className="text-base font-black uppercase tracking-wide">
              {monthLabel(cursor.y, cursor.m)}
            </div>
            <div className="text-[10px] font-bold uppercase text-zinc-500">
              HITT · Sat→Fri · Sun→Mon
            </div>
          </div>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="min-h-14 min-w-14 rounded-2xl bg-zinc-800 text-3xl font-black active:scale-95"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <div className="mb-1 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className={`text-center text-[10px] font-bold uppercase ${
                d === 'Sat' || d === 'Sun' ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {cells.map((row, ri) => (
            <div key={ri} className="grid grid-cols-7 gap-1">
              {row.map((cell) => {
                const weekend = isWeekend(cell.key)
                const resolved = snapToWeekday(cell.key)
                const focus = sessionForDate(resolved)
                // Highlight weekday cell that matches selection; weekends that
                // snap to the selected training day also show selected.
                const isSelected =
                  cell.key === selectedDate ||
                  (weekend && resolved === selectedDate)
                const isStart = cell.key === startDate
                const isToday = cell.key === today
                const muted = !cell.inMonth

                return (
                  <button
                    key={cell.key}
                    type="button"
                    onClick={() => pick(cell.key)}
                    className={`flex min-h-[3.75rem] flex-col items-center justify-center rounded-xl border px-0.5 py-1 text-center transition active:scale-95 ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-800 ring-2 ring-emerald-400/80'
                        : isToday
                          ? 'border-amber-500/80 bg-zinc-950'
                          : weekend
                            ? 'border-zinc-800/80 bg-zinc-950/40'
                            : 'border-zinc-700 bg-zinc-950'
                    } ${muted ? 'opacity-35' : ''}`}
                  >
                    <div
                      className={`text-base font-black leading-none ${
                        isSelected
                          ? 'text-emerald-100'
                          : weekend
                            ? 'text-zinc-500'
                            : 'text-zinc-100'
                      }`}
                    >
                      {parseDateKey(cell.key).getDate()}
                      {isStart && !isSelected ? (
                        <span className="ml-0.5 text-[8px] text-sky-400">●</span>
                      ) : null}
                    </div>
                    {weekend ? (
                      <div className="mt-0.5 text-[8px] font-bold uppercase leading-tight text-zinc-500">
                        →{parseDateKey(resolved).getDay() === 5 ? 'Fri' : 'Mon'}
                      </div>
                    ) : (
                      <div
                        className={`mt-0.5 truncate text-[9px] font-bold leading-tight ${FOCUS_STYLE[focus]}`}
                      >
                        {focus.slice(0, 3)}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={jumpToday}
            className="min-h-12 w-full rounded-2xl bg-amber-700 text-sm font-black uppercase active:scale-95"
          >
            Jump to today
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 w-full rounded-2xl bg-zinc-800 text-sm font-black uppercase active:scale-95"
          >
            Done
          </button>
        </div>

        <p className="mt-3 text-center text-[10px] leading-snug text-zinc-500">
          Large taps · weekends map to Fri Combat or Mon Warrior · Mon Warrior ·
          Tue/Thu Reload · Wed Athlete · Fri Combat
        </p>
      </div>
    </div>
  )
}
