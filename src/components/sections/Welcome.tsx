import { profile } from '../../data/resume'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useWorkspace } from '../../context/WorkspaceContext'
import { downloadResume } from '../../utils/downloadResume'
import { FileWrap } from './shared'
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, MailIcon } from '../shell/SocialIcons'

const socialLinks = [
  { label: 'GitHub', href: profile.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedInIcon },
  { label: 'LeetCode', href: profile.leetcode, Icon: LeetCodeIcon },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: MailIcon },
]

const quickLinks: { id: string; label: string }[] = [
  { id: 'about', label: 'about.html' },
  { id: 'projects', label: 'projects.js' },
  { id: 'experience', label: 'experience.ts' },
  { id: 'skills', label: 'skills.json' },
  { id: 'contact', label: 'contact.css' },
]

export function Welcome() {
  const role = useTypewriter(profile.roles)
  const { openFile, setPaletteOpen } = useWorkspace()

  return (
    <FileWrap>
      <div className="flex min-h-[60vh] flex-col justify-center">
        <p className="mb-3 font-mono text-sm text-vscode-dim">Welcome to my portfolio</p>
        <h1
          className="mb-3 font-display font-extrabold text-vscode-bright"
          style={{ fontSize: 'clamp(34px, 6vw, 64px)', lineHeight: 1.05 }}
        >
          {profile.name}
        </h1>
        <div className="mb-6 h-8 font-mono text-lg text-vscode-blue2 sm:text-xl">
          {role}
          <span className="cursor-blink text-vscode-accent">▍</span>
        </div>
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-vscode-text sm:text-base">
          {profile.tagline}. B.Tech in Artificial Intelligence &amp; Data Science at Shiv Nadar University —
          I build computer vision pipelines, GenAI tools, and full-stack apps.
        </p>

        <div className="mb-10 flex flex-wrap gap-3">
          <button
            onClick={downloadResume}
            className="rounded-sm border border-vscode-accent/50 bg-vscode-accent/15 px-4 py-2 text-xs font-semibold text-vscode-bright hover:bg-vscode-accent/25"
          >
            ⬇ Download Resume
          </button>
          <button
            onClick={() => openFile('contact')}
            className="rounded-sm border border-vscode-border px-4 py-2 text-xs font-semibold text-vscode-text hover:border-white/30"
          >
            ✉ Get in touch
          </button>
          <button
            onClick={() => setPaletteOpen(true)}
            className="rounded-sm border border-vscode-border px-4 py-2 text-xs font-semibold text-vscode-dim hover:border-white/30 hover:text-vscode-text"
          >
            ⌘P Go to file or run command...
          </button>
        </div>

        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {quickLinks.map((q) => (
            <button
              key={q.id}
              onClick={() => openFile(q.id)}
              className="rounded-sm border border-vscode-border px-3 py-1.5 text-vscode-dim hover:border-vscode-blue2/50 hover:text-vscode-blue2"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      <footer className="mt-12 border-t border-vscode-border pt-6 pb-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={label === 'Email' ? undefined : '_blank'}
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-sm border border-vscode-border px-3 py-1.5 text-xs text-vscode-text hover:border-vscode-blue2/50 hover:text-vscode-blue2"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </a>
          ))}
        </div>
        <p className="font-mono text-[11px] text-vscode-dim">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </footer>
    </FileWrap>
  )
}
