import { useEffect, useState } from 'react'

interface UseTypewriterOptions {
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function useTypewriter(
  phrases: string[],
  { typingSpeed = 65, deletingSpeed = 35, pauseDuration = 1400 }: UseTypewriterOptions = {},
) {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (phrases.length === 0) return
    const current = phrases[phraseIndex % phrases.length]

    if (!deleting && text === current) {
      const id = setTimeout(() => setDeleting(true), pauseDuration)
      return () => clearTimeout(id)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setPhraseIndex((i) => (i + 1) % phrases.length)
      return
    }

    const id = setTimeout(
      () => setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1))),
      deleting ? deletingSpeed : typingSpeed,
    )
    return () => clearTimeout(id)
  }, [text, deleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration])

  return text
}
