import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/', label: '首页', emoji: '🏠' },
  { path: '/weight', label: '减肥', emoji: '🍰' },
  { path: '/english', label: '英语', emoji: '📚' },
  { path: '/settings', label: '设置', emoji: '⚙️' },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const nav = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-pinky-100 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map(t => {
          const active = pathname === t.path
          return (
            <button
              key={t.path}
              onClick={() => nav(t.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-all ${
                active ? 'scale-110' : 'opacity-50'
              }`}
            >
              <span className="text-xl">{t.emoji}</span>
              <span className={`text-xs ${active ? 'text-pinky-400 font-bold' : 'text-gray-400'}`}>
                {t.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
