import { achievements } from '../../data/resume'
import { Card, Comment, ExternalLink, FileWrap, Heading } from './shared'

export function Achievements() {
  return (
    <FileWrap>
      <Comment>{'<!-- achievements.md -->'}</Comment>
      <Heading>Achievements</Heading>
      {achievements.map((a) => (
        <Card key={a.title}>
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-display text-base font-bold text-vscode-bright">🏆 {a.title}</h3>
            <span className="font-mono text-xs text-vscode-dim">{a.period}</span>
          </div>
          <p className="text-sm leading-relaxed text-vscode-text">{a.description}</p>
          {a.link && (
            <div className="mt-2 text-sm">
              <ExternalLink href={a.link}>{a.linkLabel ?? 'Link'}</ExternalLink>
            </div>
          )}
        </Card>
      ))}
    </FileWrap>
  )
}
