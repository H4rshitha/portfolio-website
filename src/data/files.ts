export type FileExt = 'md' | 'json' | 'tsx' | 'ts'

export interface FileNode {
  id: string
  label: string
  ext: FileExt
  group?: string
}

export const files: FileNode[] = [
  { id: 'welcome', label: 'welcome.md', ext: 'md' },
  { id: 'about', label: 'about.md', ext: 'md' },
  { id: 'experience', label: 'experience.json', ext: 'json' },
  { id: 'education', label: 'education.json', ext: 'json' },
  { id: 'glofeagles', label: 'glofeagles.tsx', ext: 'tsx', group: 'projects' },
  { id: 'ntire-ripcurrent', label: 'ntire-ripcurrent.tsx', ext: 'tsx', group: 'projects' },
  { id: 'finascend', label: 'finascend.tsx', ext: 'tsx', group: 'projects' },
  { id: 'learn-lynx', label: 'learn-lynx.tsx', ext: 'tsx', group: 'projects' },
  { id: 'food-delivery', label: 'food-delivery.tsx', ext: 'tsx', group: 'projects' },
  { id: 'skills', label: 'skills.json', ext: 'json' },
  { id: 'achievements', label: 'achievements.md', ext: 'md' },
  { id: 'certifications', label: 'certifications.md', ext: 'md' },
  { id: 'contact', label: 'contact.tsx', ext: 'tsx' },
]

export const fileGroups: { id: string; label: string }[] = [{ id: 'projects', label: 'projects' }]

export function getFile(id: string): FileNode | undefined {
  return files.find((f) => f.id === id)
}

export const extColor: Record<FileExt, string> = {
  md: 'text-vscode-blue2',
  json: 'text-vscode-yellow',
  tsx: 'text-vscode-blue',
  ts: 'text-vscode-blue',
}
