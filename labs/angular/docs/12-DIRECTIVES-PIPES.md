# Diretivas e pipes

Diretivas adicionam comportamento a elementos; pipes transformam valores para apresentação. Ambos devem ser pequenos, previsíveis e reutilizáveis. Se começam a coordenar estado de negócio ou HTTP, a responsabilidade está no lugar errado.

## Tipos de diretiva

- **Componentes** são diretivas com template.
- **Diretivas de atributo** alteram aparência, comportamento ou integração de um elemento existente.
- O control flow moderno (`@if`, `@for`, `@switch`) cobre grande parte dos casos antes atendidos por diretivas estruturais.

```ts
@Directive({
  selector: '[appAutofocus]',
  host: { '[attr.data-focused]': 'focused()' }
})
export class AutofocusDirective {
  private readonly element = inject(ElementRef<HTMLInputElement>);
  readonly focused = signal(false);

  @HostListener('focus') onFocus() { this.focused.set(true); }
  @HostListener('blur') onBlur() { this.focused.set(false); }

  constructor() {
    afterNextRender(() => this.element.nativeElement.focus());
  }
}
```

Prefira `host` para bindings declarativos. Use `HostListener` quando precisar tratar eventos. Não acesse DOM no servidor sem limitar a operação a callbacks de renderização.

## Host directives

`hostDirectives` aplica e expõe comportamento sem herança. É útil em componentes de design system que compartilham foco, tooltip ou telemetry.

```ts
@Component({
  selector: 'app-primary-button',
  hostDirectives: [{ directive: TooltipDirective, inputs: ['tooltip: label'] }],
  template: '<ng-content />'
})
export class PrimaryButton {}
```

## Pipes puros e impuros

Pipes são puros por padrão: executam quando a referência dos argumentos muda. Um pipe impuro (`pure: false`) executa com frequência e deve ser excepcional.

```ts
@Pipe({ name: 'duration', pure: true })
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    return hours ? `${hours}h ${minutes % 60}min` : `${minutes}min`;
  }
}
```

Use pipes para formatação, não para filtrar listas grandes ou disparar efeitos. Para coleções, derive o resultado com `computed()`. Conheça também `AsyncPipe`, `DatePipe`, `CurrencyPipe`, `DecimalPipe`, `JsonPipe`, `KeyValuePipe` e `TitleCasePipe`.

## Checklist

- API tipada e nome que revela intenção.
- Cleanup com `DestroyRef` quando houver listeners externos.
- Sem mutação do valor recebido.
- Teste isolado para pipe e teste de host para diretiva.
- Acessibilidade preservada: comportamento visual não substitui semântica.
