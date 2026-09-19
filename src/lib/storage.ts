import { SEED_ROSTER } from '../data/roster'
import type { AppState, Marine, Status } from '../types'
import { nextWeekday, snapToWeekday, todayKey } from './dates'
import { randomizeThreeDays } from './randomize'

const KEY = 'crew-pt-v2'

function defaultStatuses(roster: Marine[]): Record<string, Status> {
  const s: Record<string, Status> = {}
  for (const m of roster) s[m.id] = 'P'
  return s
}

export function createInitialState(): AppState {
  const start = snapToWeekday(todayKey())
  const roster = SEED_ROSTER.map((m) => ({ ...m }))
  const statuses = defaultStatuses(roster)
  return {
    version: 2,
    roster,
    statuses,
    startDate: start,
    days: randomizeThreeDays(start, roster, statuses),
  }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return createInitialState()
    const parsed = JSON.parse(raw) as AppState
    if (parsed.version !== 2 || !Array.isArray(parsed.roster) || !Array.isArray(parsed.days)) {
      return createInitialState()
    }
    return parsed
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
  const parsed = JSON.parse(text) as AppState
  if (parsed.version !== 2 || !Array.isArray(parsed.roster) || !Array.isArray(parsed.days)) {
    throw new Error('Invalid Crew PT JSON')
  }
  return parsed
}

export function advanceStart(state: AppState): AppState {
  const startDate = nextWeekday(state.startDate)
  const days = randomizeThreeDays(startDate, state.roster, state.statuses)
  return { ...state, startDate, days }
}
