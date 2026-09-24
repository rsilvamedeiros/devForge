# Componentes e APIs React — referência prática

Este capítulo organiza as APIs usadas para montar árvores, controlar identidade, lidar com falhas e integrar React ao DOM.

## Componentes funcionais

Um componente recebe props imutáveis e descreve a interface. Mantenha o render puro: a mesma entrada deve produzir a mesma saída.

```tsx
type CourseCardProps = {
  course: Course;
  onEnroll(courseId: string): void;
};

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  return (
    <article aria-labelledby={`course-${course.id}`}>
      <h2 id={`course-${course.id}`}>{course.title}</h2>
      <p>{course.summary}</p>
      <button onClick={() => onEnroll(course.id)}>Matricular</button>
    </article>
  );
}
```

Use um componente novo quando existir responsabilidade, semântica ou comportamento próprio. Não extraia apenas para reduzir linhas.

## Fragment

`Fragment` agrupa irmãos sem adicionar um elemento ao DOM. A forma explícita aceita `key` em listas.

```tsx
import { Fragment } from 'react';

items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
));
```

## StrictMode

`StrictMode` ativa verificações de desenvolvimento e pode repetir renderizações e ciclos de effects para revelar código impuro ou cleanup ausente. Ele não duplica a execução em produção.

## Suspense

`Suspense` coordena uma parte da árvore que ainda não pode renderizar. Funciona com `lazy`, frameworks e fontes compatíveis com Suspense.

```tsx
const Analytics = lazy(() => import('./analytics'));

<Suspense fallback={<AnalyticsSkeleton />}>
  <Analytics />
</Suspense>
```

Suspense não substitui tratamento de erro. Loading e erro são estados diferentes.

## Error Boundary

Uma boundary captura erros de renderização abaixo dela e oferece recuperação. Erros de event handlers e código assíncrono fora do render precisam de tratamento próprio.

```tsx
class FeatureBoundary extends Component<PropsWithChildren, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <FeatureFallback /> : this.props.children;
  }
}
```

Posicione boundaries por feature ou risco. Uma única boundary na raiz transforma qualquer falha em tela inteira indisponível.

## lazy

`lazy` divide código por boundary de importação. Prefira rotas e features pesadas; fragmentar cada componente aumenta requests e complexidade sem benefício.

## memo

`memo` pode evitar render quando props são iguais. É uma otimização, não uma garantia. Uma nova função ou objeto invalida a comparação.

```tsx
const ResultRow = memo(function ResultRow({ result }: { result: Result }) {
  return <li>{result.label}</li>;
});
```

Antes de usar, confirme no Profiler que o componente é caro, renderiza frequentemente e recebe props estáveis.

## createPortal

Portal muda o nó físico no DOM, mas preserva Context e propagação de eventos na árvore React. É apropriado para modal, tooltip e toast.

```tsx
return createPortal(
  <div role="dialog" aria-modal="true">{children}</div>,
  document.getElementById('overlays')!
);
```

O portal não implementa foco, Escape, scroll lock ou acessibilidade automaticamente.

## Profiler

`Profiler` mede duração e frequência de commits programaticamente. O React DevTools oferece uma investigação visual mais completa.

```tsx
<Profiler id="catalog" onRender={captureRenderMetric}>
  <CourseCatalog />
</Profiler>
```

## APIs do DOM

- `createRoot`: inicializa uma aplicação cliente;
- `hydrateRoot`: conecta eventos ao HTML vindo do servidor;
- `flushSync`: força commit síncrono em integrações excepcionais;
- `createPortal`: renderiza em outro nó físico.

`flushSync` reduz os benefícios de batching e deve ser último recurso para APIs imperativas.

## Checklist de componente profissional

- Props expressam intenção e não detalhes internos?
- HTML possui semântica adequada?
- Loading, erro, vazio e sucesso estão definidos?
- Identidade usa keys do domínio?
- Estado está no menor owner possível?
- A API evita combinações inválidas de flags?
- O comportamento importante é testável pelo usuário?

