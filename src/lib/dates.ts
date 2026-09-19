import type { Focus } from '../types'

/** All date helpers use local calendar days (browser / box local). */

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

/** Official HITT open-session calendar (Mon–Fri). */
const WEEKDAY_SESSION: Record<number, Focus> = {
  1: 'Warrior', // Mon
  2: 'Reload', // Tue
  3: 'Athlete', // Wed
  4: 'Reload', // Thu
  5: 'Combat', // Fri
}

export function toDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(key: string, n: number): string {
  const d = parseDateKey(key)
  d.setDate(d.getDate() + n)
  return toDateKey(d)
}

export function weekdayShort(key: string): string {
  return DOW[parseDateKey(key).getDay()]
}

export function isWeekday(key: string): boolean {
  const day = parseDateKey(key).getDay()
  return day >= 1 && day <= 5
}

export function isWeekend(key: string): boolean {
  return !isWeekday(key)
}

/**
 * Snap weekends to nearest training day:
 * Sat → Fri (previous Combat), Sun → Mon (next Warrior).
 * Weekdays unchanged.
 */
export function snapToWeekday(key: string): string {
  const d = parseDateKey(key)
  const day = d.getDay()
  if (day === 6) d.setDate(d.getDate() - 1) // Sat → Fri
  else if (day === 0) d.setDate(d.getDate() + 1) // Sun → Mon
  return toDateKey(d)
}

/** Human note when a weekend tap is remapped to Fri/Mon. */
export function weekendSnapNote(fromKey: string): string | null {
  const day = parseDateKey(fromKey).getDay()
  if (day === 6) return 'Weekend · using Friday Combat'
  if (day === 0) return 'Weekend · using Monday Warrior'
  return null
}

/** Next Mon–Fri after key (exclusive of key if already weekday — advances one weekday) */
export function nextWeekday(key: string): string {
  let next = addDays(key, 1)
  while (!isWeekday(next)) next = addDays(next, 1)
  return next
}

export function todayKey(): string {
  return toDateKey(new Date())
}

export function dayLabels(_start: string): [string, string, string] {
  return ['Today', 'Tomorrow', 'Day+2']
}

export function formatShort(key: string): string {
  const d = parseDateKey(key)
  return `${weekdayShort(key)} ${d.getMonth() + 1}/${d.getDate()}`
}

/** Longer phone-friendly label, e.g. "Friday, Sep 18" */
export function formatLong(key: string): string {
  const d = parseDateKey(key)
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

/** HITT session type for a Mon–Fri dateKey (weekends snap conceptually unused). */
export function sessionForDate(dateKey: string): Focus {
  const dow = parseDateKey(dateKey).getDay()
  const session = WEEKDAY_SESSION[dow]
  if (session) return session
  // Fallback if somehow weekend: treat as snapped weekday session
  return sessionForDate(snapToWeekday(dateKey))
}

/** True when this calendar day is the Thursday Reload (vs Tuesday). */
export function isThursdayReload(dateKey: string): boolean {
  return parseDateKey(dateKey).getDay() === 4
}
