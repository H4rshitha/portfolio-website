import { useWorkspace } from '../context/WorkspaceContext'
import { Welcome } from './sections/Welcome'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Achievements } from './sections/Achievements'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'

export function EditorPane() {
  const { activeFile } = useWorkspace()

  const map: Record<string, React.ReactNode> = {
    welcome: <Welcome />,
    about: <About />,
    projects: <Projects />,
    experience: <Experience />,
    skills: <Skills />,
    achievements: <Achievements />,
    certifications: <Certifications />,
    contact: <Contact />,
  }

  return <div className="flex-1 overflow-y-auto bg-vscode-bg">{map[activeFile] ?? <Welcome />}</div>
}
