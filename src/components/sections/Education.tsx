import { education } from '../../data/resume'
import { Card, Comment, FileWrap, Heading } from './shared'

export function Education() {
  return (
    <FileWrap>
      <Comment>{'// education.json'}</Comment>
      <Heading>Education</Heading>
      {education.map((e) => (
        <Card key={e.school}>
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-display text-base font-bold text-vscode-bright">{e.school}</h3>
            <span className="font-mono text-xs text-vscode-dim">{e.period}</span>
          </div>
          <p className="text-sm italic text-vscode-blue2">{e.degree}</p>
          <p className="mt-1 text-sm text-vscode-text">
            {e.location} · <span className="text-vscode-yellow">{e.score}</span>
          </p>
        </Card>
      ))}
    </FileWrap>
  )
}
