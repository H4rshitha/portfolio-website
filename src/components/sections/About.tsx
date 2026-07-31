import { education, profile } from '../../data/resume'
import { Comment, FileWrap, Heading, SectionLabel } from './shared'

const focusAreas: { icon: string; text: string }[] = [
  { icon: '🛰️', text: 'Deep learning pipelines for satellite imagery & glacial flood detection' },
  { icon: '🌊', text: 'Computer vision for real-world safety — rip current detection, CVPR NTIRE 2026' },
  { icon: '🧠', text: 'Exploring RAG, LLM tooling, and GenAI-powered products' },
  { icon: '📈', text: 'ML pipelines — regression, clustering, and SHAP explainability' },
  { icon: '💬', text: 'Talk to me about PyTorch, computer vision, or full-stack React apps' },
  { icon: '🚀', text: 'Always learning, always shipping' },
]

export function About() {
  return (
    <FileWrap>
      <Comment>{'/** about.md — a little more about me */'}</Comment>
      <Heading>About Me</Heading>
      <p className="-mt-4 mb-6 font-mono text-xs text-vscode-dim">
        // who I am · what I do · where I build
      </p>

      <div className="mb-10 rounded-md border border-vscode-border bg-white/[0.02] p-6">
        <p className="text-sm leading-relaxed text-vscode-text sm:text-base">
          Hi! I&apos;m <strong className="text-vscode-bright">{profile.name}</strong>, a B.Tech student
          living at the crossroads of <strong className="text-vscode-blue2">computer vision</strong>,{' '}
          <strong className="text-vscode-blue2">AI/ML</strong>, and{' '}
          <strong className="text-vscode-blue2">full-stack engineering</strong>. I love turning research
          ideas into systems that are genuinely{' '}
          <strong className="text-vscode-accent">useful and deployed</strong>, not just notebooks that never
          ship. Currently pursuing{' '}
          <strong className="text-vscode-bright">{profile.roles[0]}</strong> work at Shiv Nadar University,
          building deep learning pipelines and GenAI tools that solve problems people actually have.
        </p>
      </div>

      <SectionLabel>Current Focus</SectionLabel>
      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {focusAreas.map((f) => (
          <div
            key={f.text}
            className="flex items-start gap-3 rounded-md border border-vscode-border bg-white/[0.02] p-4 transition-colors hover:border-white/20"
          >
            <span className="text-xl leading-none">{f.icon}</span>
            <span className="text-sm leading-snug text-vscode-text">{f.text}</span>
          </div>
        ))}
      </div>

      <SectionLabel>Education</SectionLabel>
      <div className="space-y-4">
        {education.map((e) => (
          <div
            key={e.school}
            className="rounded-md border border-vscode-border bg-white/[0.02] p-5 transition-colors hover:border-white/20"
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">🎓</span>
                <h3 className="font-display text-base font-bold text-vscode-bright">{e.school}</h3>
              </div>
              <span className="shrink-0 font-mono text-xs text-vscode-dim">{e.period}</span>
            </div>
            <p className="mt-1.5 pl-7 text-sm italic text-vscode-blue2">{e.degree}</p>
            <p className="mt-1 pl-7 text-sm text-vscode-text">
              {e.location} · <span className="font-semibold text-vscode-yellow">{e.score}</span>
            </p>
          </div>
        ))}
      </div>
    </FileWrap>
  )
}
