import { useState, type ReactNode } from 'react'
import { getDemo, type ExerciseDemo } from '../data/demos'
import { PTNCO_ID } from '../data/roster'
import type { DayPlan, ExerciseItem, Marine, WorkoutSettings } from '../types'
import { DemoModal } from './DemoModal'

type BlockKey = 'opener' | 'locomotion' | 'sprintPrep' | 'main' | 'cooldown'

interface Props {
  day: DayPlan
  roster: Marine[]
  settings: WorkoutSettings
  onUpdateDetail: (
    block: BlockKey,
    index: number,
    detail: string,
  ) => void
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
  meta,
  children,
  accent,
}: {
  title: string
  leader: string
  meta?: string
  children: ReactNode
  accent?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-zinc-700 bg-zinc-900 p-3 ${accent ?? ''}`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-black uppercase tracking-wide">{title}</h3>
          {meta && (
            <div className="text-[10px] font-bold uppercase text-zinc-500">
              {meta}
            </div>
          )}
        </div>
        <span className="max-w-[50%] text-right text-xs font-bold text-zinc-300">
          LDR: {leader}
        </span>
      </div>
      {children}
    </div>
  )
}

function ItemList({
  items,
  block,
  onDemo,
  onUpdateDetail,
}: {
  items: ExerciseItem[]
  block: BlockKey
  onDemo: (name: string, detail?: string) => void
  onUpdateDetail: (block: BlockKey, index: number, detail: string) => void
}) {
  return (
    <ul className="space-y-1.5">
      {items.map((e, i) => (
        <li
          key={`${e.name}-${i}`}
          className="rounded-lg bg-zinc-950/80 px-2 py-1.5"
        >
          <div className="flex items-start gap-2">
            <span className="min-w-0 flex-1 font-bold leading-snug">{e.name}</span>
            <button
              type="button"
              onClick={() => onDemo(e.name, e.detail)}
              className="shrink-0 rounded-lg bg-zinc-800 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide text-sky-300 active:scale-95"
            >
              Demo
            </button>
          </div>
          <input
            type="text"
            value={e.detail ?? ''}
            placeholder="reps / time"
            onChange={(ev) => onUpdateDetail(block, i, ev.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-sm font-bold text-zinc-200 outline-none focus:border-emerald-600"
            aria-label={`${e.name} prescription`}
          />
        </li>
      ))}
    </ul>
  )
}

export function DayView({ day, roster, settings, onUpdateDetail }: Props) {
  const badge = day.block2.badge
  const [demo, setDemo] = useState<{
    demo: ExerciseDemo
    detail?: string
  } | null>(null)

  function openDemo(name: string, detail?: string) {
    const d = getDemo(name)
    if (!d) return
    setDemo({ demo: d, detail })
  }

  const b1 = day.block1.durationMin ?? settings.block1Min
  const b2 = day.block2.durationMin ?? settings.block2Min
  const b3 = day.block3.durationMin ?? settings.block3Min
  const work = day.block2.workSec ?? settings.workSec
  const rest = day.block2.restSec ?? settings.restSec
  const rpe = day.block2.rpeTarget ?? settings.rpeTarget

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
        <div className="mt-2 flex flex-wrap justify-center gap-2 text-[10px] font-bold uppercase text-zinc-400">
          <span className="rounded-full bg-zinc-900/80 px-2 py-0.5">
            {b1}+{b2}+{b3} min
          </span>
          <span className="rounded-full bg-zinc-900/80 px-2 py-0.5">
            W/R {work}/{rest}s
          </span>
          <span className="rounded-full bg-zinc-900/80 px-2 py-0.5">
            RPE {rpe}
          </span>
          <span className="rounded-full bg-zinc-900/80 px-2 py-0.5">
            Rest {settings.restDefaultSec}s
          </span>
        </div>
      </div>

      <BlockCard
        title="Block 1 · Movement Prep"
        leader={leaderName(roster, day.block1.leaderId)}
        meta={`${b1} min · Opener → Loco → Sprint prep${
          day.focus === 'Reload' ? ' · lighter' : ''
        }`}
      >
        <p className="mb-1 text-xs font-bold text-emerald-400">Opener</p>
        <ItemList
          items={day.block1.opener}
          block="opener"
          onDemo={openDemo}
          onUpdateDetail={onUpdateDetail}
        />
        <p className="mb-1 mt-2 text-xs font-bold text-emerald-400">
          Locomotion
        </p>
        <ItemList
          items={day.block1.locomotion}
          block="locomotion"
          onDemo={openDemo}
          onUpdateDetail={onUpdateDetail}
        />
        <p className="mb-1 mt-2 text-xs font-bold text-emerald-400">
          Sprint prep
        </p>
        <ItemList
          items={day.block1.sprintPrep}
          block="sprintPrep"
          onDemo={openDemo}
          onUpdateDetail={onUpdateDetail}
        />
      </BlockCard>

      <BlockCard
        title={`Block 2 · ${day.focus} Session`}
        leader={leaderName(roster, day.block2.leaderId)}
        meta={`${b2} min · circuits ${work}/${rest}s · RPE ${rpe}`}
        accent="ring-1 ring-amber-600/40"
      >
        <ItemList
          items={day.block2.items}
          block="main"
          onDemo={openDemo}
          onUpdateDetail={onUpdateDetail}
        />
      </BlockCard>

      <BlockCard
        title="Block 3 · Flex & Mobility"
        leader={leaderName(roster, day.block3.leaderId)}
        meta={`${b3} min`}
      >
        <ItemList
          items={day.block3.items}
          block="cooldown"
          onDemo={openDemo}
          onUpdateDetail={onUpdateDetail}
        />
      </BlockCard>

      {demo && (
        <DemoModal
          demo={demo.demo}
          detail={demo.detail}
          onClose={() => setDemo(null)}
        />
      )}
    </section>
  )
}
