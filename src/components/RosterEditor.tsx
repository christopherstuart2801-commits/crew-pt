import { useState } from 'react'
import type { Marine, Rank } from '../types'

interface Props {
  roster: Marine[]
  onSave: (roster: Marine[]) => void
  onClose: () => void
}

const RANKS: Rank[] = ['Cpl', 'LCpl', 'PFC']

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 24)
}

export function RosterEditor({ roster, onSave, onClose }: Props) {
  const [rows, setRows] = useState<Marine[]>(() =>
    roster.map((m) => ({ ...m })),
  )
  const [rank, setRank] = useState<Rank>('LCpl')
  const [name, setName] = useState('')

  function update(id: string, patch: Partial<Marine>) {
    setRows((r) => r.map((m) => (m.id === id ? { ...m, ...patch } : m)))
  }

  function remove(id: string) {
    setRows((r) => r.filter((m) => m.id !== id))
  }

  function add() {
    const n = name.trim()
    if (!n) return
    const id = `${slug(n)}-${Date.now().toString(36)}`
    setRows((r) => [...r, { id, rank, name: n }])
    setName('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-black">EDIT ROSTER</h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-xl bg-zinc-700 px-4 font-bold"
          >
            Close
          </button>
        </div>

        <ul className="mb-4 space-y-2">
          {rows.map((m) => (
            <li
              key={m.id}
              className="flex flex-wrap items-center gap-2 rounded-xl bg-zinc-950 p-2"
            >
              <select
                value={m.rank}
                onChange={(e) => update(m.id, { rank: e.target.value as Rank })}
                className="min-h-11 rounded-lg bg-zinc-800 px-2 font-bold"
              >
                {RANKS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <input
                value={m.name}
                onChange={(e) => update(m.id, { name: e.target.value })}
                className="min-h-11 min-w-0 flex-1 rounded-lg bg-zinc-800 px-3 font-bold"
              />
              <label className="flex items-center gap-1 text-xs font-bold text-amber-400">
                <input
                  type="checkbox"
                  checked={m.role === 'PTNCO'}
                  onChange={(e) =>
                    update(m.id, {
                      role: e.target.checked ? 'PTNCO' : undefined,
                    })
                  }
                />
                PTNCO
              </label>
              <button
                type="button"
                onClick={() => remove(m.id)}
                className="min-h-11 rounded-lg bg-red-900 px-3 font-bold"
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <div className="mb-4 flex flex-wrap gap-2">
          <select
            value={rank}
            onChange={(e) => setRank(e.target.value as Rank)}
            className="min-h-12 rounded-xl bg-zinc-800 px-3 font-bold"
          >
            {RANKS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Last name"
            className="min-h-12 min-w-0 flex-1 rounded-xl bg-zinc-800 px-3 font-bold"
          />
          <button
            type="button"
            onClick={add}
            className="min-h-12 rounded-xl bg-emerald-700 px-4 font-black"
          >
            ADD
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            onSave(rows)
            onClose()
          }}
          className="w-full min-h-14 rounded-2xl bg-emerald-600 text-lg font-black active:scale-[0.98]"
        >
          SAVE ROSTER
        </button>
      </div>
    </div>
  )
}
