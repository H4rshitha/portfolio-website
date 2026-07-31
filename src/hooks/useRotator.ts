import { useEffect, useState } from 'react'

export function useRotator<T>(items: T[], intervalMs = 2200) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs)
    return () => clearInterval(id)
  }, [items.length, intervalMs])

  return items[index]
}
