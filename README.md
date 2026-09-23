# DevForge

> Engineering Study Workspace

DevForge é um workspace pessoal para transformar vagas, entrevistas e requisitos técnicos em uma trilha contínua de evolução profissional.

## Ideia central

```text
Vaga
  ↓
Requisitos
  ↓
Skills
  ↓
Nível atual
  ↓
Gaps
  ↓
Plano de estudos
  ↓
Conceitos + exercícios + projetos
  ↓
Live coding / entrevista
  ↓
Feedback
  ↓
Evolução das skills
```

A vaga referencia uma skill; a skill não pertence à vaga. Quando Angular, RxJS, algoritmos ou arquitetura aparecem novamente em outro processo, o conhecimento já construído é reaproveitado e aprofundado.

## Primeiro caso real

O primeiro caso de uso é a preparação para **Engenheiro de Software Frontend (Angular) | Digital Equities**, usando os tópicos informados para a etapa técnica:

- live coding ou perguntas técnicas;
- exercício prático ao vivo;
- arrays e listas;
- estruturas de dados;
- algoritmos e performance;
- orientação a objetos;
- arquitetura;
- filas;
- Angular/TypeScript aplicados ao frontend.

Veja [`vacancies/btg-digital-equities/README.md`](vacancies/btg-digital-equities/README.md).

## Princípios

1. Estudar conceitos, não decorar respostas.
2. Todo conceito importante deve chegar a código.
3. Toda solução deve ser analisada em clareza, corretude, complexidade e trade-offs.
4. Framework é aplicação de fundamentos: TypeScript → Angular → problema real.
5. Entrevistas geram feedback; feedback atualiza gaps.
6. O repositório deve reduzir fricção, não virar um projeto que impede o estudo.

## Estrutura

```text
devforge/
├── package.json      # comandos centralizados dos projetos Node/TypeScript
├── docs/             # visão, arquitetura, metodologia e templates
├── platform/         # aplicação do DevForge
├── vacancies/        # processos seletivos
├── skills/           # conhecimento permanente
├── challenges/       # exercícios e live coding
├── labs/             # projetos práticos
├── interviews/       # retrospectivas e perguntas reais
├── study-plans/      # planos intensivos ou por vaga
└── resources/        # referências de estudo
```

## Executar os projetos

A raiz funciona como um workspace npm. Depois de `npm install`, os projetos podem ser executados sem trocar de pasta:

```bash
npm start             # plataforma DevForge
npm run dev:angular   # Angular Learning Lab
npm run dev:react     # lab React Service Operations
npm run dev:typescript # lab TypeScript Order Processing
```

Também existem comandos `build`, `build:<projeto>`, `test` e `test:<projeto>`. Cada projeto continua com seu próprio `package.json` e pode ser executado isoladamente.

Cada lab segue o [`padrão de laboratório completo`](docs/guides/LAB-STANDARD.md): produto visual, trilha, documentação de skills, exercícios progressivos, testes e evidências.

Angular, React e TypeScript possuem handbooks próprios, divididos em capítulos e acessíveis na área de documentação de cada lab na plataforma.

## Escala de domínio

| Nível | Critério |
|---|---|
| 0 | Nunca estudei |
| 1 | Conheço o conceito |
| 2 | Consigo explicar |
| 3 | Consigo implementar consultando |
| 4 | Consigo implementar sozinho |
| 5 | Consigo explicar decisões e trade-offs |
| 6 | Consigo aplicar em arquitetura/problemas reais |

## Próximo passo

1. Leia [`docs/DEVFORGE.md`](docs/DEVFORGE.md).
2. Abra o caso [`vacancies/btg-digital-equities`](vacancies/btg-digital-equities/).
3. Siga [`study-plans/BTG-2-DIAS.md`](study-plans/BTG-2-DIAS.md).
4. Implemente os desafios sem IA primeiro; use IA depois para revisão e alternativas.
5. Use os labs para estudar cada tecnologia em profundidade, começando pelo Angular Learning Lab.
