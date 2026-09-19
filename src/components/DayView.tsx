import type { ReactNode } from 'react'
import { PTNCO_ID } from '../data/roster'
import type { DayPlan, Marine } from '../types'

interface Props {
  day: DayPlan
  roster: Marine[]
}

function leaderName(roster: Marine[], id: string | null): string {
  if (!id) return '—'
  const m = roster.find((x) => x.id === id)
  if (!m) return '—'
  const tag = m.role === 'PTNCO' || id === PTNCO_ID ? ' (PTNCO)' : ''
  return `${m.rank} ${m.name}${tag}`
}

function BlockCard({
  title,
  leader,
  children,
  accent,
}: {
  title: string
  leader: string
  children: ReactNode
  accent?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-zinc-700 bg-zinc-900 p-3 ${accent ?? ''}`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-base font-black uppercase tracking-wide">{title}</h3>
        <span className="max-w-[55%] text-right text-xs font-bold text-zinc-300">
          LDR: {leader}
        </span>
      </div>
      {children}
    </div>
  )
}

function ItemList({
  items,
}: {
  items: { name: string; detail?: string }[]
}) {
  return (
    <ul className="space-y-1.5">
      {items.map((e, i) => (
        <li
          key={`${e.name}-${i}`}
          className="flex items-baseline justify-between gap-2 rounded-lg bg-zinc-950/80 px-2 py-1.5"
        >
          <span className="font-bold">{e.name}</span>
          {e.detail && (
            <span className="shrink-0 text-sm text-zinc-400">{e.detail}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function DayView({ day, roster }: Props) {
  const badge = day.block2.badge

  return (
    <section className="space-y-3">
      <div className="rounded-2xl border border-amber-700/50 bg-amber-950/40 px-4 py-3 text-center">
        <div className="text-xs font-bold uppercase text-amber-200/80">
          HITT Session
        </div>
        <div className="text-3xl font-black text-amber-300">{day.focus}</div>
        {badge && (
          <div className="mt-1 inline-block rounded-full bg-red-800 px-3 py-0.5 text-xs font-black tracking-wide text-red-100">
            {badge}
          </div>
        )}
        <div className="mt-1 text-sm text-zinc-400">{day.label}</div>
      </div>

      <BlockCard
        title="Block 1 · Movement Prep"
        leader={leaderName(roster, day.block1.leaderId)}
      >
        <div className="mb-2 text-[10px] font-bold uppercase text-zinc-500">
          Opener → Loco → Sprint prep
          {day.focus === 'Reload' ? ' · lighter (Reload)' : ''}
        </div>
        <p className="mb-1 text-xs font-bold text-emerald-400">Opener</p>
        <ItemList items={day.block1.opener} />
        <p className="mb-1 mt-2 text-xs font-bold text-emerald-400">
          Locomotion
        </p>
        <ItemList items={day.block1.locomotion} />
        <p className="mb-1 mt-2 text-xs font-bold text-emerald-400">
          Sprint prep
        </p>
        <ItemList items={day.block1.sprintPrep} />
      </BlockCard>

      <BlockCard
        title={`Block 2 · ${day.focus} Session`}
        leader={leaderName(roster, day.block2.leaderId)}
        accent="ring-1 ring-amber-600/40"
      >
        <ItemList items={day.block2.items} />
      </BlockCard>

      <BlockCard
        title="Block 3 · Flex & Mobility"
        leader={leaderName(roster, day.block3.leaderId)}
      >
        <ItemList items={day.block3.items} />
      </BlockCard>
    </section>
  )
}
