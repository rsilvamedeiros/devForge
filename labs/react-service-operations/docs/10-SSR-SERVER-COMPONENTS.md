# SSR, hydration e Server Components

## Estratégias

- CSR: shell pequeno e execução predominante no navegador.
- SSR: HTML por request, útil para primeiro conteúdo e metadados.
- SSG: HTML gerado antecipadamente.
- streaming: envia partes conforme ficam prontas.

## Hydration

O cliente conecta comportamento ao HTML do servidor. A primeira renderização precisa produzir a mesma estrutura; datas, aleatoriedade e acesso direto ao navegador causam mismatches.

## Server Components

Executam no servidor e não adicionam seu código ao bundle do cliente. Podem acessar recursos próximos aos dados, mas não usam estado, effects ou eventos do navegador. A diretiva `'use client'` cria uma boundary, não transforma todo o arquivo em SSR tradicional.

## Escolha de framework

React é uma biblioteca. Routing, bundling, data loading e rendering de produção frequentemente pedem um framework. Avalie requisitos antes de escolher Next.js, Remix ou uma aplicação Vite cliente.

## Checklist

- fronteiras client/server explícitas;
- dados serializáveis atravessando a boundary;
- cache com escopo correto;
- HTML determinístico;
- loading e erros por segmento.
