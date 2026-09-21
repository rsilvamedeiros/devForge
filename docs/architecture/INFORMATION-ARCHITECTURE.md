# Information Architecture

## Relações

```text
Vacancy ──< VacancySkill >── Skill ──< Topic
   │                           │
   │                           ├──< Challenge
   │                           ├──< StudySession
   │                           └──< Gap
   │
   └──< Interview ──< InterviewQuestion
```

## Modelo futuro sugerido

### Vacancy
- id
- company
- role
- description
- status
- createdAt
- interviewDate
- notes

### Skill
- id
- slug
- name
- category
- currentLevel
- targetLevel

### VacancySkill
- vacancyId
- skillId
- importance: required | valued | differential | interview-focus
- targetLevel
- source
- notes

### Topic
- id
- skillId
- name
- currentLevel
- notes

### Gap
- id
- skillId/topicId
- vacancyId?
- source
- description
- priority
- status
- action

### Challenge
- id
- skillIds[]
- difficulty
- statement
- constraints
- expectedComplexity
- status

### Interview
- vacancyId
- date
- stage
- format
- notes
- outcome

## Taxonomia inicial

- frontend
- computer-science
- software-engineering
- backend
- infrastructure
- databases
- testing
- security
