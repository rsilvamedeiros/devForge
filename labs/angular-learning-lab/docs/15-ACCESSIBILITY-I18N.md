# Acessibilidade e internacionalização

Acessibilidade é requisito de interface, não etapa final. Uma aplicação Angular deve funcionar com teclado, leitor de tela, zoom, contraste elevado, redução de movimento e diferentes formatos culturais.

## Semântica primeiro

Use `button` para ações, `a` para navegação, headings em ordem e elementos nativos de formulário. ARIA complementa semântica; não corrige um elemento inadequado.

```html
<button type="button" [attr.aria-expanded]="open()" aria-controls="course-panel">
  Conteúdo do curso
</button>
<section id="course-panel" [hidden]="!open()">...</section>
```

Todo controle precisa de nome acessível. Ícones decorativos recebem `aria-hidden="true"`; ações com ícone ficam em botão com `aria-label`.

## Teclado e foco

- Ordem de foco acompanha a leitura visual.
- Não use `tabindex` positivo.
- Modais capturam e devolvem foco.
- Estados `:focus-visible` precisam ter contraste.
- Ao navegar, mova o foco quando necessário para comunicar a nova página.

Angular CDK oferece `FocusTrap`, `FocusMonitor`, `LiveAnnouncer` e utilidades de a11y. Component Harnesses testam a interface pública sem depender de markup frágil.

## Formulários acessíveis

Associe label e campo; conecte erro com `aria-describedby`; use `aria-invalid` quando o estado deve ser anunciado. Não dependa somente de cor. Mensagens devem explicar como corrigir.

## Internacionalização

Angular i18n extrai mensagens e gera builds localizados. Para conteúdo em runtime, escolha uma biblioteca compatível com a arquitetura e o carregamento desejado.

```html
<h1 i18n="Título da página de curso">Minha formação</h1>
<p i18n>Você concluiu {{ completed }} de {{ total }} módulos.</p>
```

Use `LOCALE_ID` e pipes nativos para datas, moedas e números. Não concatene frases traduzíveis: idiomas mudam ordem, gênero e pluralização. Use ICU expressions para plural e seleção.

## Layout global

Teste textos 30–50% maiores, idiomas verbosos e direção RTL. Prefira propriedades lógicas como `margin-inline-start`. Datas devem ser armazenadas em formato inequívoco e exibidas no locale do usuário.

## Checklist

- Navegação completa sem mouse.
- Contraste e foco visível.
- Zoom de 200% sem perda de conteúdo.
- Leitor de tela anuncia nome, função, estado e erro.
- Movimento respeita `prefers-reduced-motion`.
- Testes automatizados complementados por inspeção manual.
