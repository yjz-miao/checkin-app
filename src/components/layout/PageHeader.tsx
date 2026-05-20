import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  emoji: string
  showBack?: boolean
}

export default function PageHeader({ title, emoji, showBack }: Props) {
  const nav = useNavigate()
  return (
    <header className="flex items-center gap-3 px-4 py-4 sticky top-0 bg-pinky-50/90 backdrop-blur z-40">
      {showBack && (
        <button onClick={() => nav(-1)} className="text-xl p-1">←</button>
      )}
      <span className="text-2xl">{emoji}</span>
      <h1 className="text-xl font-bold text-pinky-400">{title}</h1>
    </header>
  )
}
