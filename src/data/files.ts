export type FileExt = 'md' | 'json' | 'tsx' | 'ts' | 'html' | 'js' | 'css' | 'pdf' | 'yml' | 'txt'

export interface FileNode {
  id: string
  label: string
  ext: FileExt
  group?: string
  download?: boolean
}

export const files: FileNode[] = [
  { id: 'welcome', label: 'home.tsx', ext: 'tsx' },
  { id: 'about', label: 'about.html', ext: 'html' },
  { id: 'experience', label: 'experience.ts', ext: 'ts' },
  { id: 'glofeagles', label: 'glofeagles.tsx', ext: 'tsx', group: 'projects' },
  { id: 'ntire-ripcurrent', label: 'ntire-ripcurrent.tsx', ext: 'tsx', group: 'projects' },
  { id: 'finascend', label: 'finascend.tsx', ext: 'tsx', group: 'projects' },
  { id: 'learn-lynx', label: 'learn-lynx.tsx', ext: 'tsx', group: 'projects' },
  { id: 'food-delivery', label: 'food-delivery.tsx', ext: 'tsx', group: 'projects' },
  { id: 'skills', label: 'skills.json', ext: 'json' },
  { id: 'achievements', label: 'achievements.yml', ext: 'yml' },
  { id: 'certifications', label: 'certifications.txt', ext: 'txt' },
  { id: 'contact', label: 'contact.css', ext: 'css' },
  { id: 'resume', label: 'Harshitha_Palaram_Resume.pdf', ext: 'pdf', download: true },
]

export const fileGroups: { id: string; label: string }[] = [{ id: 'projects', label: 'projects' }]

export function getFile(id: string): FileNode | undefined {
  return files.find((f) => f.id === id)
}
