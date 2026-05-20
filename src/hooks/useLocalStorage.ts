import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initial: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  const update = useCallback((val: T | ((prev: T) => T)) => {
    setValue(prev => typeof val === 'function' ? (val as (prev: T) => T)(prev) : val)
  }, [])

  return [value, update]
}
