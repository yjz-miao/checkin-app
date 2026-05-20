import { useNavigate } from 'react-router-dom'

interface Props {
  emoji: string
  title: string
  subtitle: string
  color: string
  bgColor: string
  path: string
}

export default function FeatureCard({ emoji, title, subtitle, color, bgColor, path }: Props) {
  const nav = useNavigate()

  return (
    <button
      onClick={() => nav(path)}
      className={`card text-left w-full transition-all hover:scale-[1.02] active:scale-[0.98] ${bgColor}`}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{emoji}</span>
        <div className="flex-1">
          <h2 className={`text-xl font-bold ${color}`}>{title}</h2>
          <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
        </div>
        <span className="text-pinky-300 text-xl">→</span>
      </div>
    </button>
  )
}
