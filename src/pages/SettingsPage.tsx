import { useState, useEffect } from 'react'
import PageHeader from '../components/layout/PageHeader'
import { getSettings, saveSettings, getProfiles, saveProfiles } from '../services/storage'
import { requestNotificationPermission } from '../services/notification'
import type { AppSettings, StudyProfile } from '../types'

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(getSettings())
  const [profiles, setProfilesState] = useState(getProfiles())
  const [saved, setSaved] = useState(false)
  const [notifyStatus, setNotifyStatus] = useState<string>(
    'Notification' in window ? Notification.permission : 'unsupported'
  )

  const handleSave = () => {
    saveSettings(settings)
    saveProfiles(profiles)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleNotifyEnable = async () => {
    const granted = await requestNotificationPermission()
    setNotifyStatus(granted ? 'granted' : 'denied')
  }

  const updateProfile = (id: string, field: keyof StudyProfile, value: string) => {
    setProfilesState(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  return (
    <div className="max-w-lg mx-auto">
      <PageHeader title="设置" emoji="⚙️" />

      <div className="p-4 pb-24 space-y-4">
        {/* Profile settings */}
        <div className="card">
          <h3 className="text-lg font-bold text-pinky-400 mb-3">👥 英语学习伙伴</h3>
          {profiles.map(p => (
            <div key={p.id} className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{p.emoji}</span>
              <input
                value={p.name}
                onChange={e => updateProfile(p.id, 'name', e.target.value)}
                className="input-cute text-sm flex-1"
                placeholder="名字"
              />
              <input
                value={p.emoji}
                onChange={e => updateProfile(p.id, 'emoji', e.target.value)}
                className="input-cute text-sm w-16 text-center"
                placeholder="emoji"
              />
            </div>
          ))}
        </div>

        {/* Nutritionix API settings */}
        <div className="card">
          <h3 className="text-lg font-bold text-pinky-400 mb-3">🔑 Nutritionix API</h3>
          <p className="text-xs text-gray-400 mb-3">
            用于食物热量识别，请前往{' '}
            <a href="https://developer.nutritionix.com" target="_blank" className="text-pinky-400 underline">
              developer.nutritionix.com
            </a>{' '}
            注册免费账号获取
          </p>
          <input
            value={settings.nutritionixAppId}
            onChange={e => setSettings({ ...settings, nutritionixAppId: e.target.value })}
            placeholder="App ID"
            className="input-cute text-sm mb-2"
          />
          <input
            value={settings.nutritionixApiKey}
            onChange={e => setSettings({ ...settings, nutritionixApiKey: e.target.value })}
            placeholder="API Key"
            type="password"
            className="input-cute text-sm"
          />
        </div>

        {/* Reminder */}
        <div className="card">
          <h3 className="text-lg font-bold text-pinky-400 mb-3">🔔 每日提醒</h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">开启提醒</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.reminderEnabled}
                onChange={e => setSettings({ ...settings, reminderEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pinky-300" />
            </label>
          </div>

          {settings.reminderEnabled && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">提醒时间</span>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={e => setSettings({ ...settings, reminderTime: e.target.value })}
                className="input-cute text-sm w-32"
              />
            </div>
          )}

          {notifyStatus === 'unsupported' && (
            <p className="text-xs text-gray-400 mt-2">⚠️ 你的浏览器不支持通知功能</p>
          )}
          {notifyStatus === 'denied' && (
            <p className="text-xs text-orange-400 mt-2">通知已被拒绝，请在浏览器设置中允许</p>
          )}
          {notifyStatus === 'default' && (
            <button onClick={handleNotifyEnable} className="btn-secondary text-xs mt-2">
              🔔 授权通知权限
            </button>
          )}
          {notifyStatus === 'granted' && (
            <p className="text-xs text-green-400 mt-2">✅ 通知权限已授权</p>
          )}
        </div>

        {/* Save button */}
        <button onClick={handleSave} className="btn-primary w-full">
          {saved ? '✅ 已保存' : '💾 保存设置'}
        </button>

        <p className="text-center text-gray-300 text-xs pb-8">
          🌸 小打卡 v1.0 · 每一天都值得记录
        </p>
      </div>
    </div>
  )
}
