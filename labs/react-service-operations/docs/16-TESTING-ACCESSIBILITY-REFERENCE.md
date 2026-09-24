# Testes e acessibilidade — referência aplicada

Teste contratos visíveis e use acessibilidade como parte da implementação, não como auditoria final.

## Pirâmide útil para frontend

- Funções puras: regras, parsers e reducers.
- Componentes: comportamento, semântica e interação.
- Integração: rotas, cache, formulários e API simulada.
- E2E: poucas jornadas críticas em navegador real.

## Testing Library

Priorize queries que representam como pessoas e tecnologias assistivas encontram elementos.

```tsx
render(<EnrollmentForm />);
await user.type(screen.getByRole('textbox', { name: /e-mail/i }), 'dev@example.com');
await user.click(screen.getByRole('button', { name: /matricular/i }));
expect(await screen.findByRole('status')).toHaveTextContent(/matrícula confirmada/i);
```

Ordem recomendada: role e nome, label, texto, display value e, por último, test id.

## Eventos reais

`userEvent` reproduz sequências próximas do navegador: foco, keydown, input e change. Isso revela bugs que `fireEvent` isolado pode esconder.

## Testes assíncronos

Use `findBy` quando o elemento aparecerá e `waitFor` para uma assertion que precisa ser repetida.

```tsx
expect(await screen.findByText(/curso carregado/i)).toBeVisible();
await waitFor(() => expect(api.save).toHaveBeenCalledOnce());
```

Não coloque ações dentro de `waitFor` e não aumente timeout para esconder uma condição mal modelada.

## Mock de rede

MSW intercepta requests na fronteira HTTP e preserva o comportamento real do cliente.

```tsx
server.use(
  http.get('/api/courses', () => HttpResponse.json([{ id: 'react', title: 'React' }]))
);
```

Teste sucesso, vazio, lentidão, erro recuperável, 401/403 e payload inesperado.

## Hooks

Prefira testar custom hooks por um consumidor real. `renderHook` é útil quando o hook é de infraestrutura e seu contrato não precisa de UI.

## Acessibilidade semântica

HTML nativo oferece comportamento, nome acessível e teclado.

- ação: `button`, não `div onClick`;
- navegação: `a`/`Link`;
- título: hierarquia de `h1` a `h6`;
- conjunto de campos: `fieldset` e `legend`;
- status não urgente: `role="status"`;
- falha importante: `role="alert"`.

## Nome acessível

O nome pode vir do conteúdo, `label`, `aria-label` ou `aria-labelledby`. Evite repetir ou contradizer texto visual.

## Teclado e foco

Todo controle interativo deve funcionar por teclado. Modais precisam de foco inicial, contenção, Escape e devolução do foco ao gatilho.

```tsx
useEffect(() => {
  const trigger = document.activeElement as HTMLElement;
  closeButtonRef.current?.focus();
  return () => trigger?.focus();
}, []);
```

## Contraste e movimento

Não transmita informação apenas por cor. Respeite `prefers-reduced-motion` e mantenha foco visível nos dois temas.

## Auditoria automatizada

axe detecta muitos problemas estruturais, mas não avalia clareza de texto, ordem lógica completa ou qualidade da experiência com leitor de tela.

## E2E acessível

```ts
await page.getByRole('button', { name: 'Abrir filtros' }).click();
await expect(page.getByRole('dialog', { name: 'Filtros' })).toBeFocused();
await page.keyboard.press('Escape');
await expect(page.getByRole('button', { name: 'Abrir filtros' })).toBeFocused();
```

## Checklist de revisão

- O teste falharia se o comportamento quebrasse?
- Ele sobrevive a refatoração interna?
- Loading, erro e retry foram exercitados?
- É possível concluir a jornada só com teclado?
- Foco e mensagens assíncronas são perceptíveis?
- Tema escuro mantém contraste e estados?

