import { certifications } from '../../data/resume'
import { Card, Comment, ExternalLink, FileWrap, Heading } from './shared'

export function Certifications() {
  return (
    <FileWrap>
      <Comment>{'<!-- certifications.md -->'}</Comment>
      <Heading>Certifications</Heading>
      {certifications.map((c) => (
        <Card key={c.name}>
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-display text-base font-bold text-vscode-bright">📜 {c.name}</h3>
            <span className="font-mono text-xs text-vscode-dim">{c.period}</span>
          </div>
          <p className="mb-2 text-sm italic text-vscode-blue2">{c.issuer}</p>
          <ExternalLink href={c.link}>View certificate</ExternalLink>
        </Card>
      ))}
    </FileWrap>
  )
}
