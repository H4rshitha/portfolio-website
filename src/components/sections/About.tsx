import { profile } from '../../data/resume'
import { Comment, FileWrap, Heading } from './shared'

export function About() {
  return (
    <FileWrap>
      <Comment>{'/** about.md — a little more about me */'}</Comment>
      <Heading>About</Heading>
      <p className="mb-4 text-sm leading-relaxed text-vscode-text sm:text-base">{profile.bio}</p>
      <p className="text-sm leading-relaxed text-vscode-text sm:text-base">
        Outside of coursework and projects, I like breaking down research papers into working code, competing
        in computer vision challenges, and turning half-finished side-project ideas into deployed products.
        Always up for a conversation about AI/ML, computer vision, or full-stack engineering — reach out via{' '}
        <span className="text-vscode-blue2">contact.tsx</span> in the sidebar.
      </p>
    </FileWrap>
  )
}
