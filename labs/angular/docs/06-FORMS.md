# Formulários Angular

## Modelo mental

Reactive Forms tratam o formulário como uma estrutura de estado explícita. Cada controle possui valor, validade, erros e estado de interação. O template apresenta esse modelo; não deve ser a fonte da regra.

## Controles tipados

- `FormControl<T>` representa um campo.
- `FormGroup<T>` representa uma estrutura conhecida.
- `FormArray<T>` representa uma coleção dinâmica.
- `FormRecord<T>` representa chaves dinâmicas homogêneas.
- `fb.nonNullable` remove `null` quando ele não pertence ao domínio.

```ts
readonly form = this.fb.nonNullable.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  track: this.fb.control<'frontend' | 'backend'>('frontend'),
});
```

## Validação

Validadores síncronos retornam `ValidationErrors | null`. Validadores assíncronos retornam Promise ou Observable e devem ser usados quando a regra depende de I/O. Mensagens precisam corresponder ao erro específico e aparecer depois de interação ou tentativa de envio.

Regras importantes:

- validação de UX no cliente não substitui validação no servidor;
- regra de domínio reutilizável não deve existir apenas como validator;
- use validação no grupo quando a regra envolve mais de um campo;
- cancele validação assíncrona obsoleta com a composição correta.

## ControlValueAccessor

Use `ControlValueAccessor` quando um componente reutilizável precisa se comportar como controle Angular: receber valor, notificar mudança, notificar touched e responder a disabled.

Não crie um CVA para todo input estilizado. A abstração vale quando existe comportamento de controle realmente reutilizável.

## Checklist

- tipos representam os valores reais?
- labels e mensagens são acessíveis?
- submit inválido chama `markAllAsTouched()`?
- loading impede envio duplicado?
- erro do servidor volta para o contexto correto?
- reset produz um estado previsível?

