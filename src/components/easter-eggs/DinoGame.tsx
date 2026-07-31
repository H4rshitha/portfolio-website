import { useEffect, useRef } from 'react'
import { useWorkspace } from '../../context/WorkspaceContext'

const GROUND_Y = 130
const DINO_X = 40
const DINO_SIZE = 24
const GRAVITY = 0.9
const JUMP_VY = -13

interface Obstacle {
  x: number
  w: number
  h: number
}

export function DinoGame() {
  const { dinoOpen, setDinoOpen, dinoHighScore, reportDinoScore } = useWorkspace()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const stateRef = useRef({
    running: false,
    gameOver: false,
    started: false,
    dinoY: GROUND_Y - DINO_SIZE,
    vy: 0,
    speed: 6,
    frame: 0,
    score: 0,
    obstacles: [] as Obstacle[],
  })

  useEffect(() => {
    if (!dinoOpen) return
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const ctxEl = canvasEl.getContext('2d')
    if (!ctxEl) return
    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = ctxEl

    const s = stateRef.current
    s.running = true
    s.gameOver = false
    s.started = false
    s.dinoY = GROUND_Y - DINO_SIZE
    s.vy = 0
    s.speed = 6
    s.frame = 0
    s.score = 0
    s.obstacles = []

    let raf: number

    function spawnObstacle() {
      const h = 20 + Math.random() * 20
      s.obstacles.push({ x: canvas.width, w: 12 + Math.random() * 10, h })
    }

    function jump() {
      if (!s.started) {
        s.started = true
      }
      if (s.gameOver) {
        reset()
        return
      }
      if (s.dinoY >= GROUND_Y - DINO_SIZE) {
        s.vy = JUMP_VY
      }
    }

    function reset() {
      s.gameOver = false
      s.started = true
      s.dinoY = GROUND_Y - DINO_SIZE
      s.vy = 0
      s.speed = 6
      s.frame = 0
      s.score = 0
      s.obstacles = []
    }

    function loop() {
      s.frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ground
      ctx.strokeStyle = '#888'
      ctx.beginPath()
      ctx.moveTo(0, GROUND_Y)
      ctx.lineTo(canvas.width, GROUND_Y)
      ctx.stroke()

      if (s.started && !s.gameOver) {
        s.vy += GRAVITY
        s.dinoY += s.vy
        if (s.dinoY > GROUND_Y - DINO_SIZE) {
          s.dinoY = GROUND_Y - DINO_SIZE
          s.vy = 0
        }

        if (s.frame % Math.max(40, 70 - Math.floor(s.score / 5)) === 0) spawnObstacle()

        s.obstacles.forEach((o) => (o.x -= s.speed))
        s.obstacles = s.obstacles.filter((o) => o.x + o.w > 0)

        s.score += 0.15
        s.speed = 6 + Math.min(6, s.score / 40)

        // collision
        for (const o of s.obstacles) {
          const dinoBottom = s.dinoY + DINO_SIZE
          const overlapX = DINO_X + DINO_SIZE > o.x && DINO_X < o.x + o.w
          const overlapY = dinoBottom > GROUND_Y - o.h
          if (overlapX && overlapY) {
            s.gameOver = true
            reportDinoScore(Math.floor(s.score))
          }
        }
      }

      // dino
      ctx.fillStyle = '#4ec9b0'
      ctx.fillRect(DINO_X, s.dinoY, DINO_SIZE, DINO_SIZE)

      // obstacles
      ctx.fillStyle = '#e06c75'
      s.obstacles.forEach((o) => {
        ctx.fillRect(o.x, GROUND_Y - o.h, o.w, o.h)
      })

      // score
      ctx.fillStyle = '#ccc'
      ctx.font = '12px monospace'
      ctx.fillText(`SCORE ${String(Math.floor(s.score)).padStart(5, '0')}`, canvas.width - 130, 20)
      ctx.fillText(`HI ${String(dinoHighScore).padStart(5, '0')}`, canvas.width - 130, 36)

      if (!s.started) {
        ctx.fillStyle = '#ccc'
        ctx.font = '14px monospace'
        ctx.fillText('CLICK / SPACE TO JUMP', canvas.width / 2 - 90, canvas.height / 2)
      } else if (s.gameOver) {
        ctx.fillStyle = '#e06c75'
        ctx.font = '16px monospace'
        ctx.fillText('GAME OVER', canvas.width / 2 - 45, canvas.height / 2 - 10)
        ctx.fillStyle = '#ccc'
        ctx.font = '12px monospace'
        ctx.fillText('click or space to restart', canvas.width / 2 - 78, canvas.height / 2 + 12)
      }

      raf = requestAnimationFrame(loop)
    }

    function onKey(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault()
        jump()
      } else if (e.code === 'Escape') {
        setDinoOpen(false)
      }
    }
    function onClick() {
      jump()
    }

    canvas.width = 560
    canvas.height = 160
    window.addEventListener('keydown', onKey)
    canvas.addEventListener('mousedown', onClick)
    canvas.addEventListener('touchstart', onClick)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      canvas.removeEventListener('mousedown', onClick)
      canvas.removeEventListener('touchstart', onClick)
    }
  }, [dinoOpen, dinoHighScore, reportDinoScore, setDinoOpen])

  if (!dinoOpen) return null

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4"
      onClick={() => setDinoOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[600px] rounded-md border border-vscode-border bg-vscode-bg2 p-4 shadow-2xl"
      >
        <div className="mb-2 flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-pixel)' }} className="text-[10px] text-vscode-green">
            RUN &gt; START DEBUGGING
          </span>
          <button
            onClick={() => setDinoOpen(false)}
            className="rounded-sm px-2 text-vscode-dim hover:bg-white/10 hover:text-vscode-bright"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <canvas ref={canvasRef} className="w-full cursor-pointer rounded-sm border border-vscode-border bg-vscode-bg" />
        <p className="mt-2 text-center text-[11px] text-vscode-dim">
          Beat your high score to unlock extra Copilot messages.
        </p>
      </div>
    </div>
  )
}
