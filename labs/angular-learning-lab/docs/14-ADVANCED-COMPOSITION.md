# Composição avançada de componentes

Composição preserva contratos menores que herança. Angular oferece content projection, fragments de template, outlets e criação dinâmica para montar interfaces flexíveis.

## Content projection

`ng-content` distribui conteúdo do consumidor em slots. O conteúdo pertence ao contexto do consumidor, embora seja exibido dentro do componente.

```html
<article class="card">
  <header><ng-content select="[card-title]" /></header>
  <main><ng-content /></main>
  <footer><ng-content select="[card-actions]" /></footer>
</article>
```

Evite adicionar ou remover `ng-content` condicionalmente. Para composição condicional, capture um `TemplateRef` e instancie quando necessário.

## TemplateRef e NgTemplateOutlet

Templates permitem personalizar uma região mantendo dados e fluxo sob controle do componente.

```html
<ng-container
  [ngTemplateOutlet]="rowTemplate() || defaultRow"
  [ngTemplateOutletContext]="{ $implicit: item, index: index }" />

<ng-template #defaultRow let-item>{{ item.title }}</ng-template>
```

Tipar o contexto é importante em bibliotecas. Um template excessivamente genérico transfere complexidade aos consumidores.

## Componentes dinâmicos

Use `NgComponentOutlet` quando o tipo é escolhido declarativamente. Use `ViewContainerRef.createComponent()` quando precisa controlar injector, posição, inputs e lifecycle.

```html
<ng-container *ngComponentOutlet="activeWidget(); inputs: widgetInputs()" />
```

Casos adequados incluem dashboards configuráveis, plugins internos, modais e renderizadores por schema. Não substitua um simples `@switch` conhecido em build time.

## CDK Portal e Overlay

Para menus, popovers e dialogs, CDK Overlay e Portal resolvem posicionamento, foco, scroll strategy e stacking. Implementar overlay manualmente costuma gerar falhas de teclado e acessibilidade.

## Contratos sustentáveis

Escolha inputs específicos, outputs orientados a eventos e tipos explícitos. Evite expor services internos, `ElementRef` ou objetos mutáveis. Componha comportamentos com directives e providers locais antes de recorrer a hierarquias de classes.
