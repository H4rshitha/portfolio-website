import { useWorkspace } from '../context/WorkspaceContext'
import { Welcome } from './sections/Welcome'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Education } from './sections/Education'
import { Skills } from './sections/Skills'
import { Achievements } from './sections/Achievements'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { ProjectFile } from './sections/ProjectFile'
import { projects } from '../data/resume'

const projectSlugs = new Set(projects.map((p) => p.slug))

export function EditorPane() {
  const { activeFile } = useWorkspace()

  if (projectSlugs.has(activeFile)) {
    return (
      <div className="flex-1 overflow-y-auto bg-vscode-bg">
        <ProjectFile slug={activeFile} />
      </div>
    )
  }

  const map: Record<string, React.ReactNode> = {
    welcome: <Welcome />,
    about: <About />,
    experience: <Experience />,
    education: <Education />,
    skills: <Skills />,
    achievements: <Achievements />,
    certifications: <Certifications />,
    contact: <Contact />,
  }

  return <div className="flex-1 overflow-y-auto bg-vscode-bg">{map[activeFile] ?? <Welcome />}</div>
}
