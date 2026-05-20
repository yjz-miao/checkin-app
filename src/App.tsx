import { HashRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/layout/BottomNav'
import HomePage from './pages/HomePage'
import WeightPage from './pages/WeightPage'
import EnglishPage from './pages/EnglishPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weight" element={<WeightPage />} />
          <Route path="/english" element={<EnglishPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  )
}
