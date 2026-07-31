import {
  achievements,
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from '../../data/resume'

interface Rule {
  keywords: string[]
  respond: () => string
}

const rules: Rule[] = [
  {
    keywords: ['project', 'built', 'work on', 'portfolio piece'],
    respond: () =>
      `Here's what I've been building:\n\n${projects
        .map((p) => `• ${p.name} (${p.period}) — ${p.description}`)
        .join('\n')}\n\nAsk me about a specific one, like "tell me about GLOFeagles".`,
  },
  {
    keywords: ['glof', 'glacial', 'flood'],
    respond: () => {
      const p = projects.find((p) => p.slug === 'glofeagles')!
      return `${p.name}: ${p.bullets.join(' ')}`
    },
  },
  {
    keywords: ['rip current', 'ntire', 'cvpr'],
    respond: () => {
      const p = projects.find((p) => p.slug === 'ntire-ripcurrent')!
      return `${p.name}: ${p.bullets.join(' ')}`
    },
  },
  {
    keywords: ['finascend', 'financial', 'fintech', 'monte carlo'],
    respond: () => {
      const p = projects.find((p) => p.slug === 'finascend')!
      return `${p.name}: ${p.bullets.join(' ')}`
    },
  },
  {
    keywords: ['learn-lynx', 'learn lynx', 'rag', 'study'],
    respond: () => {
      const p = projects.find((p) => p.slug === 'learn-lynx')!
      return `${p.name}: ${p.bullets.join(' ')}`
    },
  },
  {
    keywords: ['food delivery', 'food-del', 'ecommerce', 'e-commerce'],
    respond: () => {
      const p = projects.find((p) => p.slug === 'food-delivery')!
      return `${p.name}: ${p.bullets.join(' ')}`
    },
  },
  {
    keywords: ['skill', 'tech stack', 'stack', 'technologies', 'languages', 'tools'],
    respond: () =>
      `My stack:\n\n${skills.map((g) => `• ${g.category}: ${g.items.join(', ')}`).join('\n')}`,
  },
  {
    keywords: ['experience', 'internship', 'intern', 'job', 'work history', 'cognifyz'],
    respond: () =>
      experience
        .map((e) => `${e.title} @ ${e.company} (${e.period})\n${e.bullets.join(' ')}`)
        .join('\n\n'),
  },
  {
    keywords: ['education', 'degree', 'university', 'college', 'cgpa', 'school'],
    respond: () =>
      education.map((e) => `${e.school} — ${e.degree} (${e.period}), ${e.score}`).join('\n'),
  },
  {
    keywords: ['achievement', 'award', 'win', 'won', 'hackathon', 'rank'],
    respond: () => achievements.map((a) => `🏆 ${a.title} — ${a.description}`).join('\n\n'),
  },
  {
    keywords: ['certification', 'certificate', 'nptel', 'coursera', 'deeplearning'],
    respond: () => certifications.map((c) => `📜 ${c.name} — ${c.issuer} (${c.period})`).join('\n'),
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'phone', 'linkedin', 'github'],
    respond: () =>
      `You can reach Harshitha at ${profile.email} or ${profile.phone}. GitHub: ${profile.github} · LinkedIn: ${profile.linkedin}`,
  },
  {
    keywords: ['resume', 'cv', 'download'],
    respond: () => `You can grab the résumé PDF from the File menu, or the "Download Resume" button on welcome.md.`,
  },
  {
    keywords: ['who are you', 'about', 'bio', 'yourself', 'introduce'],
    respond: () => profile.bio,
  },
  {
    keywords: ['hi', 'hello', 'hey', 'yo'],
    respond: () => `Hey! I'm Harshitha's Copilot. Ask me about her projects, skills, experience, or how to get in touch.`,
  },
  {
    keywords: ['thank', 'thanks', 'thx'],
    respond: () => `Anytime! Good luck exploring the rest of the portfolio 🚀`,
  },
]

export function getResponse(input: string): string {
  const q = input.toLowerCase()
  for (const rule of rules) {
    if (rule.keywords.some((k) => q.includes(k))) return rule.respond()
  }
  return `I'm not sure about that one — but I can tell you about Harshitha's projects, skills, experience, education, achievements, or how to contact her. Try one of the suggestions below!`
}

export const suggestions = [
  'Tell me about her projects',
  "What's her tech stack?",
  'Tell me about her experience',
  'How can I contact her?',
]
