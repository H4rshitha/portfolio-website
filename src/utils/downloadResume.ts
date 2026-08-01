import { profile } from '../data/resume'

export function downloadResume() {
  const a = document.createElement('a')
  a.href = profile.resumeFile
  a.download = 'Harshitha_Palaram_Resume.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
