# DevForge — Documento Mestre

## 1. Visão

DevForge é uma base pessoal de conhecimento técnico orientada por vagas e entrevistas reais.

O objetivo não é armazenar cursos ou notas soltas. O workspace deve responder continuamente:

- quais skills aparecem nas vagas que estou buscando?
- quais já domino?
- quais consigo explicar, mas não implementar?
- quais consigo implementar, mas não justificar?
- quais gaps apareceram em entrevistas?
- onde vale investir tempo agora?
- como meu domínio evoluiu?

## 2. Ciclo

```text
VAGAS GERAM REQUISITOS
        ↓
REQUISITOS GERAM SKILLS
        ↓
SKILLS REVELAM GAPS
        ↓
GAPS GERAM ESTUDO
        ↓
ESTUDO GERA PRÁTICA
        ↓
PRÁTICA GERA EXPERIÊNCIA
        ↓
ENTREVISTAS GERAM FEEDBACK
        ↓
FEEDBACK MELHORA AS SKILLS
```

## 3. Entidades conceituais

### Vacancy

Representa uma vaga/processo. Deve armazenar descrição, requisitos, diferenciais, informações recebidas no processo, etapas, skills relacionadas, plano, perguntas e retrospectiva.

### Skill

Conhecimento permanente e reutilizável. Exemplos: Angular, TypeScript, RxJS, Arrays, Big O, OOP, filas, arquitetura.

### Topic

Subdivisão de uma skill. Angular pode conter Signals, DI, Change Detection, Forms etc.

### Gap

Diferença entre o domínio necessário e o domínio atual ou uma dificuldade observada na prática.

### Study Session

Sessão de estudo associada a skills, tópicos e eventualmente uma vaga.

### Challenge

Exercício executável, preferencialmente com solução ingênua, solução melhorada, testes, complexidade e trade-offs.

### Interview

Registro de entrevista: perguntas, exercício, resultado, dificuldades e novos gaps.

## 4. Filosofia de aprendizagem

Todo tópico relevante deve tentar percorrer:

```text
CONCEITO
  ↓
EXEMPLO
  ↓
IMPLEMENTAÇÃO
  ↓
EXERCÍCIO
  ↓
DESAFIO
  ↓
PERGUNTA DE ENTREVISTA
  ↓
APLICAÇÃO REAL
  ↓
REVISÃO
```

Conhecer a definição não é o objetivo final.

## 5. Domínio

Escala:

- 0 — nunca estudei;
- 1 — conheço;
- 2 — explico;
- 3 — implemento consultando;
- 4 — implemento sozinho;
- 5 — justifico decisões/trade-offs;
- 6 — aplico em arquitetura/problemas reais.

O nível deve ser atualizado com evidência: exercício, projeto, entrevista ou revisão.

## 6. Gap Analysis

Uma vaga pode exigir:

```text
Angular       5
TypeScript    5
RxJS          5
REST          4
AWS           3
WebSocket     4
Testing       4
Architecture  4
```

Comparando com o domínio:

```text
Angular       4
TypeScript    5
RxJS          3  ← gap
REST          5
AWS           2  ← gap
WebSocket     2  ← gap
Testing       4
Architecture  4
```

O plano deve priorizar a diferença, sem desperdiçar tempo repetindo fundamentos já dominados.

## 7. Entrevista como fonte de dados

Exemplo:

```yaml
question: "Qual a complexidade dessa solução?"
skill: algorithms-big-o
result: partial
gap: space-complexity
action: revisar complexidade espacial e resolver 3 exercícios
```

O objetivo é transformar erros em backlog de estudo.

## 8. Organização

```text
vacancies/  → contexto temporário de processos
skills/     → conhecimento permanente
challenges/ → prática reutilizável
labs/       → integração de conceitos
interviews/ → evidência real e retrospectiva
study-plans/→ priorização temporal
resources/  → referências
```

## 9. Regra de prioridade

Em período de entrevista:

```text
80% estudo/prática
20% organização/plataforma
```

O DevForge deve acelerar a preparação.

## 10. Primeiro laboratório

O primeiro laboratório é o Angular Learning Lab. Ele existe para ensinar Angular em uma experiência acadêmica completa e conectar:

- HttpClient;
- arrays;
- map/filter/reduce;
- Signals;
- RxJS;
- estado;
- renderização de listas;
- formulários tipados;
- injeção de dependência;
- Router e HttpClient;
- performance;
- arquitetura.

Os demais laboratórios devem seguir a mesma direção: uma tecnologia principal por ambiente, sem depender de um domínio comercial para justificar o aprendizado.

### Portfólio por tecnologia

A evolução dos labs também pode cobrir uma tecnologia principal por projeto, começando por frontend. Cada lab deve manter domínio, UX e decisões próprias — não ser apenas a mesma tela reescrita em outro framework.

- `labs/angular` — formação acadêmica completa em Angular;
- `labs/react` — formação acadêmica completa em React;
- `labs/typescript` — TypeScript Academy com Lit como camada visual didática;
- próximos: Next.js, Vue e Svelte, conforme prioridade de estudo.

### Execução centralizada

Os projetos Node/TypeScript participam de um workspace npm na raiz. Isso reduz a fricção para instalar dependências e executar a plataforma ou qualquer lab sem navegar entre pastas:

```bash
npm install
npm start
npm run dev:angular
npm run dev:react
npm run dev:typescript
```

O workspace é apenas uma camada de orquestração. Cada projeto preserva dependências, scripts e build próprios; futuros labs em outras linguagens continuam independentes do npm.

### Qualidade antes de quantidade

Antes de adicionar uma nova tecnologia, os labs ativos devem atender ao [`padrão de laboratório completo`](guides/LAB-STANDARD.md). Cada projeto precisa combinar experiência visual, funcionalidades, trilha de módulos, documentação das skills, exercícios progressivos, testes e critérios de evidência.

Cada tecnologia principal mantém um handbook versionado dentro do lab. A skill registra o mapa permanente e as evidências; o handbook aprofunda conceitos, APIs, decisões e exemplos aplicados ao projeto.

## 11. Evolução futura

Possível aplicação:

```text
colar vaga
   ↓
extrair requisitos
   ↓
normalizar skills
   ↓
comparar domínio
   ↓
gerar gaps
   ↓
montar plano
   ↓
gerar exercícios/quizzes
   ↓
registrar resultado
```

IA poderá apoiar parsing, exercícios, simulação de entrevista e revisão, mas o sistema deve manter rastreabilidade entre vaga → skill → gap → estudo → evidência.

## 12. Princípio final

O DevForge é um sistema de aprendizagem orientado por evidência profissional, não um catálogo de tecnologias.
