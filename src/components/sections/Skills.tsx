import { skills } from '../../data/resume'
import { Comment, FileWrap, Heading, SubHeading, Tag } from './shared'

export function Skills() {
  return (
    <FileWrap>
      <Comment>{'// skills.json'}</Comment>
      <Heading>Skills</Heading>
      <div className="space-y-6">
        {skills.map((group) => (
          <div key={group.category}>
            <SubHeading>{group.category}</SubHeading>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FileWrap>
  )
}
