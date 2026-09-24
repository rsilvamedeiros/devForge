# Arquitetura orientada por contratos

TypeScript fortalece boundaries, mas não escolhe ownership nem substitui arquitetura. Organize dependências para que o compilador proteja as decisões.

## Regra de dependência

Domínio não deve importar UI, HTTP ou persistência. Infraestrutura implementa portas declaradas em direção ao núcleo.

```ts
interface CourseRepository {
  findById(id: CourseId, signal?: AbortSignal): Promise<Course | null>;
}
```

## Tipos por boundary

- DTO: formato externo e versionável;
- schema/parser: valida a entrada unknown;
- domínio: invariantes e marcas;
- view model: informação pronta para apresentação.

Evite um único tipo viajando por todas as camadas.

## Public API

Cada feature deve expor um ponto de entrada pequeno. Deep imports acoplam consumidores à estrutura interna e dificultam refatoração.

## Estados e comandos

Separe fatos de intenções:

```ts
type Command = { type: 'course.enroll'; courseId: CourseId; studentId: StudentId };
type Event = { type: 'student.enrolled'; enrollmentId: EnrollmentId; occurredAt: Date };
```

## Erros

Classifique falhas de validação, conflito, autorização, indisponibilidade e invariantes. Não use uma string genérica como protocolo entre camadas.

## Decisões

Registre ADRs para escolhas que o código não explica sozinho: estratégia ESM, validação runtime, política de Result/exceptions e limites entre packages.

## Sinais de alerta

- `any` atravessando boundaries;
- casts repetidos do mesmo dado;
- tipos compartilhados por conveniência entre domínios;
- index signatures amplas;
- barrel files criando ciclos;
- generics que não preservam relação alguma.

