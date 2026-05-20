export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export function scheduleReminder(timeStr: string, enabled: boolean) {
  // Clean up existing
  localStorage.removeItem('reminder_timeout')

  if (!enabled || !timeStr) return

  const [h, m] = timeStr.split(':').map(Number)
  const now = new Date()
  const target = new Date()
  target.setHours(h, m, 0, 0)

  if (target <= now) {
    target.setDate(target.getDate() + 1)
  }

  const ms = target.getTime() - now.getTime()
  const timeoutId = setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification('📚 小打卡提醒', {
        body: '别忘了今天的打卡哦！💪',
        icon: '/pwa-192.png',
        tag: 'daily-reminder',
      })
    }
    // Re-schedule for next day
    scheduleReminder(timeStr, true)
  }, ms)

  // Store timeout id so we can clear it
  localStorage.setItem('reminder_timeout', String(timeoutId))
}
