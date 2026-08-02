export type FileExt = 'md' | 'json' | 'tsx' | 'ts' | 'html' | 'js' | 'css' | 'pdf' | 'yml' | 'txt'

export interface FileNode {
  id: string
  label: string
  ext: FileExt
  download?: boolean
}

export const files: FileNode[] = [
  { id: 'welcome', label: 'home.tsx', ext: 'tsx' },
  { id: 'about', label: 'about.html', ext: 'html' },
  { id: 'projects', label: 'projects.js', ext: 'js' },
  { id: 'experience', label: 'experience.ts', ext: 'ts' },
  { id: 'skills', label: 'skills.json', ext: 'json' },
  { id: 'achievements', label: 'achievements.md', ext: 'md' },
  { id: 'certifications', label: 'certifications.txt', ext: 'txt' },
  { id: 'contact', label: 'contact.css', ext: 'css' },
  { id: 'resume', label: 'Harshitha_Palaram_Resume.pdf', ext: 'pdf', download: true },
]

export function getFile(id: string): FileNode | undefined {
  return files.find((f) => f.id === id)
}
