# Performance e segurança

## Performance: medir primeiro

Use Angular DevTools, Performance panel, coverage e bundle analyzer. Otimizar sem medição troca clareza por uma hipótese.

## Rendering

- `OnPush` explicita gatilhos e combina com dados imutáveis;
- Signals notificam consumidores precisos;
- `track` estável preserva DOM em listas;
- cálculos caros ficam fora do template;
- virtualização é indicada para listas extensas visíveis.

## Entrega

- lazy routes dividem por capacidade;
- `@defer` adia UI secundária;
- budgets impedem crescimento silencioso;
- imports específicos favorecem tree shaking;
- imagens e fontes também participam do custo inicial.

## Memória

`AsyncPipe`, `toSignal` e APIs vinculadas a `DestroyRef` automatizam cleanup. Assinaturas manuais, listeners globais e timers exigem ciclo de vida explícito.

## Segurança: fronteiras de confiança

Angular escapa interpolações e sanitiza contextos conhecidos. Isso não torna seguro contornar a sanitização.

- nunca concatene entrada em HTML executável;
- trate `bypassSecurityTrust*` como exceção auditada;
- valide e autorize no servidor;
- não armazene segredo real no frontend;
- prefira cookies seguros quando a arquitetura permitir;
- CSP reduz impacto de injeção;
- dependências e cadeia de build também são superfície de ataque.

## Checklist de revisão

- existe gargalo medido?
- o bundle inicial carrega somente o essencial?
- listas possuem identidade correta?
- recursos são liberados na destruição?
- algum dado externo chega a HTML, URL ou estilo?
- alguma decisão de permissão depende apenas do cliente?

