# Formulários, Actions e validação

Formulários profissionais combinam semântica HTML, estado adequado, validação, feedback assíncrono e recuperação de erro.

## Controlled e uncontrolled

Controlled inputs facilitam coordenação imediata entre campos. Uncontrolled inputs usam o DOM e `FormData`, reduzindo estado intermediário.

```tsx
function SearchField() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={event => setQuery(event.target.value)} />;
}
```

```tsx
function ProfileForm() {
  function submit(formData: FormData) {
    const name = String(formData.get('name') ?? '');
  }
  return <form action={submit}><input name="name" /></form>;
}
```

Escolha pelo contrato. Um formulário pode combinar as estratégias.

## Modelagem de estado

Evite um booleano para cada condição. Modele fases incompatíveis com uma união discriminada.

```tsx
type Submission =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'failed'; message: string }
  | { status: 'succeeded'; profile: Profile };
```

## Validação em camadas

1. Restrições HTML oferecem feedback básico.
2. Validação cliente melhora a experiência.
3. O servidor valida novamente regras e autorização.
4. Respostas de domínio voltam associadas aos campos.

```tsx
<label htmlFor="email">E-mail</label>
<input id="email" name="email" type="email" required aria-describedby="email-help email-error" />
<p id="email-help">Usaremos para recuperar sua conta.</p>
{error && <p id="email-error" role="alert">{error}</p>}
```

Mensagens devem explicar o problema e como corrigir. Não limpe os demais campos após falha.

## useActionState

Actions permitem que a transição assíncrona faça parte do contrato do formulário.

```tsx
type FormState = { errors?: Record<string, string>; saved?: boolean };

async function updateProfile(_: FormState, data: FormData): Promise<FormState> {
  const email = String(data.get('email') ?? '');
  if (!email.includes('@')) return { errors: { email: 'Informe um e-mail válido.' } };
  await api.updateProfile({ email });
  return { saved: true };
}

function ProfileForm() {
  const [state, action, pending] = useActionState(updateProfile, {});
  return <form action={action}>{/* campos */}<button disabled={pending}>Salvar</button></form>;
}
```

## useFormStatus

Um componente dentro do form pode ler o status da submissão sem receber prop drilling.

```tsx
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Salvando…' : 'Salvar'}</button>;
}
```

## Optimistic UI

Atualização otimista é indicada quando a ação é provável, reversível e fácil de reconciliar.

```tsx
const [optimisticComments, addOptimistic] = useOptimistic(
  comments,
  (current, draft: Comment) => [...current, { ...draft, pending: true }]
);
```

Não use para pagamentos, autorização ou operações irreversíveis sem confirmação forte.

## Foco e anúncios

- Após erro, foque o resumo ou primeiro campo inválido.
- Use `role="alert"` para erro que surge após interação.
- Desabilite apenas quando necessário; explique estados pendentes.
- Preserve navegação por teclado e ordem visual/lógica.

## Upload

Valide tipo e tamanho no cliente por conveniência e novamente no servidor por segurança. Mostre progresso, cancelamento e erro por arquivo. Nunca confie no nome ou MIME enviado pelo navegador.

## Checklist

- Labels estão associados aos inputs?
- Enter submete como esperado?
- Erros são específicos e anunciados?
- O servidor continua sendo autoridade?
- Duplo clique é idempotente?
- Dados digitados sobrevivem a falhas?
- Pending, sucesso e retry são claros?

