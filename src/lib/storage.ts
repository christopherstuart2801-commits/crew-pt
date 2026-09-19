import { SEED_ROSTER } from '../data/roster'
import type { AppState, Marine, Status, WorkoutSettings } from '../types'
import { nextWeekday, snapToWeekday, todayKey } from './dates'
import { randomizeThreeDays } from './randomize'
import { DEFAULT_SETTINGS, normalizeSettings } from './settings'

const KEY = 'crew-pt-v3'

function defaultStatuses(roster: Marine[]): Record<string, Status> {
  const s: Record<string, Status> = {}
  for (const m of roster) s[m.id] = 'P'
  return s
}

export function createInitialState(): AppState {
  const start = snapToWeekday(todayKey())
  const roster = SEED_ROSTER.map((m) => ({ ...m }))
  const statuses = defaultStatuses(roster)
  const settings = { ...DEFAULT_SETTINGS, equipment: { ...DEFAULT_SETTINGS.equipment } }
  return {
    version: 3,
    roster,
    statuses,
    startDate: start,
    settings,
    days: randomizeThreeDays(start, roster, statuses, settings),
  }
}

function migrate(raw: unknown): AppState | null {
  if (!raw || typeof raw !== 'object') return null
  const parsed = raw as {
    version?: number
    roster?: Marine[]
    days?: AppState['days']
    statuses?: Record<string, Status>
    startDate?: string
    settings?: Partial<WorkoutSettings>
  }
  if (!Array.isArray(parsed.roster) || !Array.isArray(parsed.days)) return null
  if (parsed.version !== 2 && parsed.version !== 3) return null
  const settings = normalizeSettings(parsed.settings)
  return {
    version: 3,
    roster: parsed.roster,
    statuses: parsed.statuses ?? defaultStatuses(parsed.roster),
    startDate: parsed.startDate ?? snapToWeekday(todayKey()),
    days: parsed.days,
    settings,
  }
}

export function loadState(): AppState {
  try {
    // Prefer v3; fall back to v2 key once
    let raw = localStorage.getItem(KEY)
    if (!raw) raw = localStorage.getItem('crew-pt-v2')
    if (!raw) return createInitialState()
    const migrated = migrate(JSON.parse(raw))
    if (!migrated) return createInitialState()
    return migrated
  } catch {
    return createInitialState()
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function exportJson(state: AppState): string {
  return JSON.stringify(state, null, 2)
}

export function importJson(text: string): AppState {
  const migrated = migrate(JSON.parse(text))
  if (!migrated) throw new Error('Invalid Crew PT JSON')
  return migrated
}

export function advanceStart(state: AppState): AppState {
  const startDate = nextWeekday(state.startDate)
  const days = randomizeThreeDays(
    startDate,
    state.roster,
    state.statuses,
    state.settings,
  )
  return { ...state, startDate, days }
}

/** Jump the 3-day window to a Mon–Fri start date (regenerates packs). */
export function setStartDate(state: AppState, dateKey: string): AppState {
  const startDate = snapToWeekday(dateKey)
  const days = randomizeThreeDays(
    startDate,
    state.roster,
    state.statuses,
    state.settings,
  )
  return { ...state, startDate, days }
}
