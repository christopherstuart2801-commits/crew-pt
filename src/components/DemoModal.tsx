import type { ExerciseDemo } from '../data/demos'

interface Props {
  demo: ExerciseDemo
  detail?: string
  onClose: () => void
}

export function DemoModal({ demo, detail, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={demo.name}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 p-4"
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-zinc-500">
              Exercise demo
            </div>
            <h2 className="text-xl font-black leading-tight">{demo.name}</h2>
            {detail && (
              <p className="mt-0.5 text-sm font-bold text-zinc-400">{detail}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 shrink-0 rounded-xl bg-zinc-700 px-4 font-bold"
          >
            Close
          </button>
        </div>

        <div className="mb-4">
          <h3 className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-400">
            Coaching cues
          </h3>
          <ol className="list-decimal space-y-2 pl-5">
            {demo.cues.slice(0, 3).map((c, i) => (
              <li key={i} className="text-sm font-semibold leading-snug text-zinc-200">
                {c}
              </li>
            ))}
          </ol>
        </div>

        <a
          href={demo.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-red-700 text-base font-black uppercase tracking-wide text-white active:scale-[0.98]"
        >
          Open demo on YouTube
        </a>
        <p className="mt-2 text-center text-[10px] text-zinc-500">
          Opens YouTube search / demo in a new tab — no embedded video
        </p>
      </div>
    </div>
  )
}
