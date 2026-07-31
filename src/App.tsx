import { ThemeProvider } from './themes/ThemeContext'
import { WorkspaceProvider } from './context/WorkspaceContext'
import { useWorkspace } from './context/WorkspaceContext'
import { useGlobalShortcuts } from './hooks/useGlobalShortcuts'

import { TitleBar } from './components/shell/TitleBar'
import { MenuBar } from './components/shell/MenuBar'
import { ActivityBar } from './components/shell/ActivityBar'
import { Sidebar } from './components/shell/Sidebar'
import { TabBar } from './components/shell/TabBar'
import { StatusBar } from './components/shell/StatusBar'
import { CommandPalette } from './components/shell/CommandPalette'
import { KeyboardShortcutsModal } from './components/shell/KeyboardShortcutsModal'
import { TerminalPanel } from './components/shell/Terminal'
import { EditorPane } from './components/EditorPane'
import { CopilotPanel } from './components/copilot/CopilotPanel'
import { RetroCursor } from './components/easter-eggs/RetroCursor'
import { DinoGame } from './components/easter-eggs/DinoGame'

function AppShell() {
  useGlobalShortcuts()
  const { isMobile } = useWorkspace()

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-vscode-bg font-mono text-vscode-text">
      <RetroCursor />
      <TitleBar />
      <MenuBar />
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar />
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <TabBar />
          <div className="flex min-h-0 flex-1 overflow-hidden">
            <EditorPane />
            {!isMobile && <CopilotPanel />}
          </div>
          <TerminalPanel />
        </div>
        {isMobile && <CopilotPanel />}
      </div>
      <StatusBar />
      <CommandPalette />
      <KeyboardShortcutsModal />
      <DinoGame />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <WorkspaceProvider>
        <AppShell />
      </WorkspaceProvider>
    </ThemeProvider>
  )
}

export default App
