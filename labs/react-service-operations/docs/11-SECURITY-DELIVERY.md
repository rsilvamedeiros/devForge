# Segurança, build e entrega

## Fronteiras de confiança

React escapa texto interpolado, mas URLs, HTML externo, armazenamento, dependências e APIs continuam sendo superfícies de ataque. `dangerouslySetInnerHTML` exige sanitização anterior e política explícita.

## Autenticação

Esconder um botão não autoriza uma ação. O servidor valida identidade e permissão; a UI apenas representa capacidades e melhora a experiência.

## Supply chain

Revise dependências, lockfile, scripts de instalação e advisories. Atualizações automáticas precisam de testes e política de rollout.

## Build

Analise chunks, remova dependências desnecessárias e divida rotas. Source maps de produção devem ser enviados ao serviço de observabilidade sem exposição pública indevida.

## Configuração

Variáveis embutidas pelo frontend são públicas. Nunca coloque segredos em `VITE_*`. Valide configuração no bootstrap e falhe com mensagem acionável.

## Observabilidade

Registre erros com versão, rota e contexto seguro; meça Web Vitals e jornadas críticas. Não envie dados pessoais ou tokens em logs.
