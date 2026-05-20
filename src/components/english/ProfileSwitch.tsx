import type { StudyProfile } from '../../types'

interface Props {
  profiles: StudyProfile[]
  activeId: string
  onChange: (id: string) => void
}

export default function ProfileSwitch({ profiles, activeId, onChange }: Props) {
  return (
    <div className="flex gap-3 justify-center">
      {profiles.map(p => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all ${
            activeId === p.id
              ? 'bg-white shadow-cute scale-105'
              : 'bg-pinky-50 opacity-60'
          }`}
        >
          <span className="text-2xl">{p.emoji}</span>
          <span className={`text-sm font-bold ${activeId === p.id ? 'text-pinky-400' : 'text-gray-400'}`}>
            {p.name}
          </span>
        </button>
      ))}
    </div>
  )
}
