import { useEffect, useRef } from 'react'
import { useWorkspace } from '../../context/WorkspaceContext'

export function RetroCursor() {
  const { isMobile } = useWorkspace()
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMobile) return
    document.body.classList.add('retro-cursor')

    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }
    const down = () => dotRef.current?.classList.add('clicking')
    const up = () => dotRef.current?.classList.remove('clicking')

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      document.body.classList.remove('retro-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [isMobile])

  if (isMobile) return null
  return <div ref={dotRef} className="retro-cursor-dot" />
}
