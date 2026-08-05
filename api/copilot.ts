/// <reference types="node" />
import {
  achievements,
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from '../src/data/resume.js'

export const config = { maxDuration: 60 }

const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 2000

function buildSystemPrompt(): string {
  return `You are "Harshitha's Copilot", an AI chat assistant embedded in Harshitha Palaram's portfolio website (styled as a VS Code editor). Answer questions visitors ask about Harshitha based ONLY on the resume data below. Be concise and conversational — a few sentences for simple questions, short lists for anything enumerable (projects, skills, etc). Speak about Harshitha in the third person. If asked something you don't have data for, say so honestly and steer back to what you do know. If asked something totally unrelated to Harshitha (general trivia, coding help unrelated to her work, etc.), politely explain you're scoped to answering questions about Harshitha's background and redirect. Never invent facts not present below.

Output plain text only — the chat UI does not render Markdown. Do not use **bold**, *italics*, # headings, or markdown bullet/numbered syntax. For lists, start each line with "- " (a plain hyphen and space) instead.

## Profile
Name: ${profile.name}
Roles: ${profile.roles.join(', ')}
Tagline: ${profile.tagline}
Bio: ${profile.bio}
Location: ${profile.location}
Email: ${profile.email}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}
LeetCode: ${profile.leetcode}

## Education
${education.map((e) => `- ${e.school}, ${e.location} — ${e.degree} (${e.period}), ${e.score}`).join('\n')}

## Experience
${experience
  .map(
    (e) =>
      `- ${e.title} @ ${e.company}, ${e.location} (${e.period})\n  ${e.bullets.join('\n  ')}`,
  )
  .join('\n')}

## Projects
${projects
  .map(
    (p) =>
      `- ${p.name} (${p.period}) [${p.category}]\n  ${p.description}\n  ${p.bullets.join('\n  ')}\n  Tags: ${p.tags.join(', ')}${p.github ? `\n  GitHub: ${p.github}` : ''}${p.demo ? `\n  Live: ${p.demo}` : ''}`,
  )
  .join('\n')}

## Skills
${skills.map((g) => `- ${g.category}: ${g.items.join(', ')}`).join('\n')}

## Achievements
${achievements.map((a) => `- ${a.title} (${a.period}) — ${a.description}`).join('\n')}

## Certifications
${certifications.map((c) => `- ${c.name}, ${c.issuer} (${c.period})`).join('\n')}
`
}

const SYSTEM_PROMPT = buildSystemPrompt()

interface IncomingMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return json({ error: 'Server is missing GEMINI_API_KEY' }, 500)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const rawMessages = (body as { messages?: unknown })?.messages
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return json({ error: 'messages must be a non-empty array' }, 400)
  }

  const messages: IncomingMessage[] = rawMessages.slice(-MAX_MESSAGES).map((m) => {
    const role = (m as IncomingMessage)?.role === 'assistant' ? 'assistant' : 'user'
    const content = String((m as IncomingMessage)?.content ?? '').slice(0, MAX_MESSAGE_LENGTH)
    return { role, content }
  })

  if (messages[0].role !== 'user') {
    return json({ error: 'messages must start with a user message' }, 400)
  }

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const upstream = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 2048 },
      }),
    },
  )

  if (!upstream.ok) {
    const detail = await upstream.text()
    return json({ error: 'Upstream error', detail }, 502)
  }

  const data = (await upstream.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
    promptFeedback?: { blockReason?: string }
  }
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('')
  if (!text) {
    return json({ error: 'No text in upstream response', detail: data.promptFeedback }, 502)
  }

  return json({ text }, 200)
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
