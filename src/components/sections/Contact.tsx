import { useState, type FormEvent } from 'react'
import { profile } from '../../data/resume'
import { Comment, FileWrap, Heading, SubHeading } from './shared'
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, MailIcon } from '../shell/SocialIcons'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!FORMSPREE_ID) {
      setStatus('error')
      return
    }
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-sm border border-vscode-border bg-white/[0.03] px-3 py-2 text-sm text-vscode-bright outline-none placeholder:text-vscode-dim focus:border-vscode-blue2'

  return (
    <FileWrap>
      <Comment>{'/* contact.css */'}</Comment>
      <Heading>Contact</Heading>
      <p className="mb-6 text-sm leading-relaxed text-vscode-text">
        Have a project, an opportunity, or just want to talk AI/ML? My inbox is open.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-3 font-mono text-sm sm:grid-cols-2">
        <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-vscode-blue2 hover:underline">
          <MailIcon className="h-4 w-4 shrink-0" /> {profile.email}
        </a>
        <a href={profile.leetcode} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-vscode-blue2 hover:underline">
          <LeetCodeIcon className="h-4 w-4 shrink-0" /> LeetCode ↗
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-vscode-blue2 hover:underline">
          <GitHubIcon className="h-4 w-4 shrink-0" /> GitHub ↗
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-vscode-blue2 hover:underline">
          <LinkedInIcon className="h-4 w-4 shrink-0" /> LinkedIn ↗
        </a>
      </div>

      <SubHeading>Send a message</SubHeading>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" required placeholder="Your name" className={inputClass} />
        <input name="email" type="email" required placeholder="Your email" className={inputClass} />
        <textarea name="message" required rows={5} placeholder="What's on your mind?" className={inputClass} />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-sm border border-vscode-accent/50 bg-vscode-accent/15 px-4 py-2 text-xs font-semibold text-vscode-bright hover:bg-vscode-accent/25 disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'sent' && (
          <p className="text-sm text-vscode-green">Thanks — I&apos;ll get back to you soon.</p>
        )}
        {status === 'error' && !FORMSPREE_ID && (
          <p className="text-sm text-vscode-yellow">
            Contact form isn&apos;t wired up yet — set <code>VITE_FORMSPREE_ID</code> in your environment, or
            email me directly at {profile.email}.
          </p>
        )}
        {status === 'error' && FORMSPREE_ID && (
          <p className="text-sm text-vscode-red">
            Something went wrong, please try again or email me directly at {profile.email}.
          </p>
        )}
      </form>
    </FileWrap>
  )
}
