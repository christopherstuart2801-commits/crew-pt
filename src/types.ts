export type Status = 'P' | 'A' | 'D' | 'L' | 'M'

export type Rank = 'Cpl' | 'LCpl' | 'PFC'

/** Official HITT Mon–Fri session types (UI labels). */
export type Focus = 'Warrior' | 'Reload' | 'Athlete' | 'Combat'

export interface Marine {
  id: string
  rank: Rank
  name: string
  role?: 'PTNCO'
}

export interface ExerciseItem {
  name: string
  detail?: string
}

export interface WarmupBlock {
  opener: ExerciseItem[]
  locomotion: ExerciseItem[]
  sprintPrep: ExerciseItem[]
  leaderId: string | null
}

export interface MainBlock {
  focus: Focus
  /** Short UI badge, e.g. "Agility" */
  badge?: string
  items: ExerciseItem[]
  leaderId: string // always Stuart (PTNCO)
}

export interface CooldownBlock {
  items: ExerciseItem[]
  leaderId: string | null
}

export interface DayPlan {
  dateKey: string // YYYY-MM-DD
  label: string // Today / Tomorrow / Day+2 or weekday
  focus: Focus
  block1: WarmupBlock
  block2: MainBlock
  block3: CooldownBlock
}

export interface AppState {
  version: 2
  roster: Marine[]
  statuses: Record<string, Status>
  startDate: string // YYYY-MM-DD Mon–Fri start
  days: DayPlan[]
}
