import { useEffect, useRef } from 'react'
import { useWorkspace } from '../../context/WorkspaceContext'

const GROUND_Y = 130
const DINO_X = 40
const UNIT = 2
const DINO_W = 15 * UNIT
const DINO_H = 15 * UNIT
const GRAVITY = 0.9
const JUMP_VY = -13

type CactusType = 'small' | 'large' | 'cluster'

interface Obstacle {
  x: number
  w: number
  h: number
  type: CactusType
}

interface Cloud {
  x: number
  y: number
}

// Dino silhouette, defined as [x, y, w, h] rects in UNIT cells, y measured
// from the ground upward. Shared across every frame; only the legs differ.
const DINO_BODY: [number, number, number, number][] = [
  [0, 3, 3, 2], // tail tip
  [1, 5, 2, 2], // tail taper
  [3, 4, 6, 6], // torso
  [3, 10, 3, 2], // back hump
  [8, 6, 1, 2], // arm
  [8, 8, 3, 3], // neck
  [9, 10, 5, 4], // head
  [10, 14, 2, 1], // head crest
  [12, 9, 3, 2], // snout
]
const DINO_EYE: [number, number, number, number] = [12, 12, 1, 1]

const LEG_FRAMES: Record<'runA' | 'runB' | 'jump', [number, number, number, number][]> = {
  runA: [
    [3, 0, 2, 4],
    [7, 1, 2, 3],
  ],
  runB: [
    [3, 1, 2, 3],
    [7, 0, 2, 4],
  ],
  jump: [
    [4, 0, 2, 2],
    [8, 0, 2, 2],
  ],
}

function fillCells(
  ctx: CanvasRenderingContext2D,
  cells: [number, number, number, number][],
  originX: number,
) {
  for (const [x, y, w, h] of cells) {
    ctx.fillRect(originX + x * UNIT, GROUND_Y - (y + h) * UNIT, w * UNIT, h * UNIT)
  }
}

function drawDino(
  ctx: CanvasRenderingContext2D,
  originX: number,
  liftY: number,
  legFrame: 'runA' | 'runB' | 'jump',
) {
  ctx.save()
  ctx.translate(0, liftY)
  ctx.fillStyle = '#c9d1d9'
  fillCells(ctx, DINO_BODY, originX)
  fillCells(ctx, LEG_FRAMES[legFrame], originX)
  ctx.fillStyle = '#1a1a1a'
  fillCells(ctx, [DINO_EYE], originX)
  ctx.restore()
}

function drawCactus(ctx: CanvasRenderingContext2D, o: Obstacle) {
  ctx.fillStyle = '#5fb85f'
  const top = GROUND_Y - o.h

  if (o.type === 'cluster') {
    const trunkW = Math.max(3, o.w * 0.24)
    const gap = trunkW * 0.6
    const heights = [o.h * 0.7, o.h, o.h * 0.8]
    heights.forEach((h, i) => {
      const x = o.x + i * (trunkW + gap)
      ctx.fillRect(x, GROUND_Y - h, trunkW, h)
    })
    return
  }

  const trunkW = Math.max(4, o.w * 0.32)
  const trunkX = o.x + (o.w - trunkW) / 2
  ctx.fillRect(trunkX, top, trunkW, o.h)

  const armW = trunkW * 0.8
  const armH = trunkW * 1.6
  const leftArmY = top + o.h * 0.32
  ctx.fillRect(trunkX - armW * 0.85, leftArmY - armH * 0.4, armW * 0.85, armH * 0.55)
  ctx.fillRect(trunkX - armW * 0.85, leftArmY, armW * 0.85, armW * 0.85)

  if (o.type === 'large') {
    const rightArmY = top + o.h * 0.5
    ctx.fillRect(trunkX + trunkW, rightArmY - armH * 0.35, armW * 0.85, armH * 0.5)
    ctx.fillRect(trunkX + trunkW, rightArmY, armW * 0.85, armW * 0.85)
  }
}

function drawCloud(ctx: CanvasRenderingContext2D, c: Cloud) {
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  ctx.fillRect(c.x, c.y, 18, 4)
  ctx.fillRect(c.x + 4, c.y - 3, 12, 4)
  ctx.fillRect(c.x + 20, c.y, 6, 4)
}

const CACTUS_SPECS: Record<CactusType, { w: number; h: number }> = {
  small: { w: 12, h: 20 },
  large: { w: 14, h: 30 },
  cluster: { w: 26, h: 24 },
}

export function DinoGame() {
  const { dinoOpen, setDinoOpen, dinoHighScore, reportDinoScore } = useWorkspace()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const highScoreRef = useRef(dinoHighScore)

  useEffect(() => {
    highScoreRef.current = dinoHighScore
  }, [dinoHighScore])

  const stateRef = useRef({
    running: false,
    gameOver: false,
    started: false,
    dinoY: 0,
    vy: 0,
    speed: 6,
    frame: 0,
    score: 0,
    groundOffset: 0,
    obstacles: [] as Obstacle[],
    clouds: [] as Cloud[],
  })

  useEffect(() => {
    if (!dinoOpen) return
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const ctxEl = canvasEl.getContext('2d')
    if (!ctxEl) return
    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = ctxEl
    ctx.imageSmoothingEnabled = false

    const s = stateRef.current
    s.running = true
    s.gameOver = false
    s.started = false
    s.dinoY = 0
    s.vy = 0
    s.speed = 6
    s.frame = 0
    s.score = 0
    s.groundOffset = 0
    s.obstacles = []
    s.clouds = [
      { x: 100, y: 30 },
      { x: 320, y: 50 },
      { x: 480, y: 20 },
    ]

    let raf: number

    function spawnObstacle() {
      const types: CactusType[] = ['small', 'small', 'large', 'cluster']
      const type = types[Math.floor(Math.random() * types.length)]
      const spec = CACTUS_SPECS[type]
      s.obstacles.push({ x: canvas.width, w: spec.w, h: spec.h, type })
    }

    function jump() {
      if (!s.started) s.started = true
      if (s.gameOver) {
        reset()
        return
      }
      if (s.dinoY >= 0) {
        s.vy = JUMP_VY
      }
    }

    function reset() {
      s.gameOver = false
      s.started = true
      s.dinoY = 0
      s.vy = 0
      s.speed = 6
      s.frame = 0
      s.score = 0
      s.groundOffset = 0
      s.obstacles = []
    }

    function loop() {
      s.frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (s.started && !s.gameOver) {
        s.vy += GRAVITY
        s.dinoY -= s.vy
        if (s.dinoY < 0) {
          s.dinoY = 0
          s.vy = 0
        }

        if (s.frame % Math.max(40, 70 - Math.floor(s.score / 5)) === 0) spawnObstacle()

        s.obstacles.forEach((o) => (o.x -= s.speed))
        s.obstacles = s.obstacles.filter((o) => o.x + o.w > 0)

        s.clouds.forEach((c) => {
          c.x -= s.speed * 0.25
          if (c.x < -30) c.x = canvas.width + Math.random() * 60
        })

        s.groundOffset = (s.groundOffset + s.speed) % 20

        s.score += 0.15
        s.speed = 6 + Math.min(6, s.score / 40)

        const hitboxX = DINO_X + 4
        const hitboxW = DINO_W - 8
        const hitboxBottom = GROUND_Y - s.dinoY
        const hitboxTop = hitboxBottom - (DINO_H - 4)
        for (const o of s.obstacles) {
          const overlapX = hitboxX + hitboxW > o.x && hitboxX < o.x + o.w
          const overlapY = hitboxBottom > GROUND_Y - o.h && hitboxTop < GROUND_Y
          if (overlapX && overlapY) {
            s.gameOver = true
            reportDinoScore(Math.floor(s.score))
          }
        }
      }

      // sky decoration
      s.clouds.forEach((c) => drawCloud(ctx, c))

      // dashed ground
      ctx.strokeStyle = '#666'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let x = -s.groundOffset; x < canvas.width; x += 20) {
        ctx.moveTo(x, GROUND_Y)
        ctx.lineTo(x + 10, GROUND_Y)
      }
      ctx.stroke()

      // obstacles
      s.obstacles.forEach((o) => drawCactus(ctx, o))

      // dino
      const legFrame: 'runA' | 'runB' | 'jump' =
        s.dinoY > 0 ? 'jump' : Math.floor(s.frame / 6) % 2 === 0 ? 'runA' : 'runB'
      drawDino(ctx, DINO_X, -s.dinoY, legFrame)

      // score
      ctx.fillStyle = '#ccc'
      ctx.font = '12px monospace'
      ctx.fillText(`SCORE ${String(Math.floor(s.score)).padStart(5, '0')}`, canvas.width - 130, 20)
      ctx.fillText(`HI ${String(highScoreRef.current).padStart(5, '0')}`, canvas.width - 130, 36)

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
  }, [dinoOpen, reportDinoScore, setDinoOpen])

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
        <canvas
          ref={canvasRef}
          className="w-full cursor-pointer rounded-sm border border-vscode-border bg-vscode-bg outline-none"
        />
        <p className="mt-2 text-center text-[11px] text-vscode-dim">
          Beat your high score to unlock extra Copilot messages.
        </p>
      </div>
    </div>
  )
}
