import './styles.css';
import './documentation.css';
import { marked } from 'marked';
import { Order } from './domain/order.js';
import { Message } from './messaging/message.js';
import { InMemoryQueue } from './messaging/queue.js';
import { InMemoryIdempotencyStore } from './processing/idempotency-store.js';
import { OrderProcessor, ProcessingResult } from './processing/order-processor.js';

interface Runtime {
  main: InMemoryQueue<Message<Order>>;
  retry: InMemoryQueue<Message<Order>>;
  dead: InMemoryQueue<Message<Order>>;
  store: InMemoryIdempotencyStore;
  processor: OrderProcessor;
}

interface EventEntry { time: string; title: string; detail: string; result: ProcessingResult | 'enqueued' }

const symbols = ['PETR4', 'VALE3', 'ITUB4', 'WEGE3', 'B3SA3'];
const documents = [
  { title: 'Handbook TypeScript', description: 'Mapa completo da linguagem.', path: '/HANDBOOK.md' },
  { title: 'Tipos e narrowing', description: 'Unions, guards e exhaustiveness.', path: '/01-TYPE-SYSTEM-NARROWING.md' },
  { title: 'Generics e utilities', description: 'Constraints e transformação de tipos.', path: '/02-FUNCTIONS-GENERICS-UTILITIES.md' },
  { title: 'Objetos e módulos', description: 'Structural typing, classes e ESM.', path: '/03-OBJECTS-CLASSES-MODULES.md' },
  { title: 'Async e runtime', description: 'Promises, erros e validação externa.', path: '/04-ASYNC-ERRORS-RUNTIME.md' },
  { title: 'Configuração e arquitetura', description: 'tsconfig, testes e boundaries.', path: '/05-CONFIG-QUALITY-ARCHITECTURE.md' },
  { title: 'Trilha de aprendizado', description: 'Sequência sugerida e critérios de domínio.', path: '/LEARNING-PATH.md' },
  { title: 'Exercícios', description: 'Enunciados completos da prática guiada.', path: '/EXERCISES.md' },
];
let sequence = 0;
let processed = 0;
let failureMode = false;
let autoTimer: number | undefined;
let events: EventEntry[] = [];
let runtime = createRuntime();

function createRuntime(): Runtime {
  const main = new InMemoryQueue<Message<Order>>();
  const retry = new InMemoryQueue<Message<Order>>();
  const dead = new InMemoryQueue<Message<Order>>();
  const store = new InMemoryIdempotencyStore();
  const processor = new OrderProcessor(main, retry, dead, store, async () => {
    if (failureMode) throw new Error('Gateway temporariamente indisponível');
    await new Promise(resolve => setTimeout(resolve, 180));
  });
  return { main, retry, dead, store, processor };
}

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root not found.');

app.innerHTML = `
  <div class="ambient ambient--one"></div><div class="ambient ambient--two"></div>
  <header class="topbar"><a class="brand" href="#"><span>↯</span><div><strong>Pulse Queue</strong><small>ORDER PROCESSING LAB</small></div></a><div class="environment"><i></i> Sandbox environment <span>v0.1</span></div><div class="top-actions"><button id="theme" class="icon-button" aria-label="Alternar tema">◐</button><span class="operator">RS</span></div></header>
  <aside class="sidebar"><nav><span>CONTROL ROOM</span><a class="active" href="#pipeline">⌁ <b>Pipeline</b></a><a href="#events">≡ <b>Event log</b><em id="event-badge">0</em></a><span>LEARNING</span><a href="#pipeline">◇ <b>Arquitetura</b></a><a href="#exercises">⌘ <b>Exercícios</b><em>4</em></a><a href="#documentation">▤ <b>Documentação</b><em>${documents.length}</em></a></nav><div class="study-card"><span>LAB PROGRESS</span><strong>TypeScript resiliente</strong><div><i style="width:80%"></i></div><small>4 de 5 módulos implementados</small></div><footer><i></i><div><strong>Runtime conectado</strong><small>In-memory · local</small></div></footer></aside>
  <main>
    <section class="hero"><div><span class="eyebrow">EVENT-DRIVEN LABORATORY</span><h1>Order processing<br/><em>under control.</em></h1><p>Visualize mensagens atravessando a fila principal, retry e dead-letter queue. Quebre o gateway, processe novamente e explique o resultado.</p><div class="hero-actions"><button class="primary" id="enqueue">+ Enfileirar ordem</button><button class="secondary" id="process">▶ Processar próxima</button></div></div><div class="hero-visual"><div class="orbit"><span>TS</span><i></i><i></i><i></i></div><small>STRICT MODE</small></div></section>
    <section class="metrics"><article><span class="metric-icon violet">⇥</span><div><small>MAIN QUEUE</small><strong id="main-count">0</strong><em>aguardando consumo</em></div></article><article><span class="metric-icon amber">↻</span><div><small>RETRY QUEUE</small><strong id="retry-count">0</strong><em>falhas transitórias</em></div></article><article><span class="metric-icon red">×</span><div><small>DEAD LETTER</small><strong id="dead-count">0</strong><em>exigem intervenção</em></div></article><article><span class="metric-icon green">✓</span><div><small>PROCESSADAS</small><strong id="processed-count">0</strong><em>efeito confirmado</em></div></article></section>
    <section class="workspace" id="pipeline"><article class="panel pipeline"><header><div><span class="eyebrow">LIVE ARCHITECTURE</span><h2>Fluxo da mensagem</h2></div><div class="controls"><label><input type="checkbox" id="failure"/><span></span>Simular falha</label><button id="auto">Auto processar</button></div></header><div class="flow"><div class="node"><span>01</span><i>IN</i><strong>Producer</strong><small>Order command</small></div><b>→</b><div class="node active"><span>02</span><i>MQ</i><strong>Main Queue</strong><small>FIFO buffer</small></div><b>→</b><div class="node"><span>03</span><i>OP</i><strong>Processor</strong><small>Validate + execute</small></div><b>→</b><div class="outcomes"><div><i class="ok"></i><span><strong>Processed</strong><small>Idempotency store</small></span></div><div><i class="warning"></i><span><strong>Retry</strong><small>Transient failure</small></span></div><div><i class="danger"></i><span><strong>DLQ</strong><small>Attempts exceeded</small></span></div></div></div><div class="architecture-note"><span>i</span><p><strong>At-least-once delivery</strong>O consumer pode receber uma mensagem novamente. A chave idempotente impede que o efeito seja aplicado duas vezes.</p><code>store.has(message.id)</code></div></article>
      <aside class="panel quick-run"><span class="eyebrow">SCENARIO RUNNER</span><h2>Teste o pipeline</h2><p>Crie uma massa e observe cada estado.</p><button id="seed">Gerar 5 ordens</button><button id="drain">Processar lote</button><button id="reset" class="danger-button">Resetar sandbox</button><div><span><i></i> Gateway status</span><strong id="gateway-status">Operacional</strong></div></aside>
    </section>
    <section class="lower-grid"><article class="panel event-log" id="events"><header><div><span class="eyebrow">OBSERVABILITY</span><h2>Event log</h2></div><button id="clear-log">Limpar</button></header><div id="event-list" class="empty-log"><span>⌁</span><strong>Nenhum evento ainda</strong><small>Enfileire uma ordem para iniciar a simulação.</small></div></article><article class="panel learning" id="exercises"><header><span class="eyebrow">LEARNING PATH</span><h2>Próximos desafios</h2></header><ol><li><span>01</span><div><strong>Erros tipados</strong><small>Fundamento · narrowing</small></div><em>→</em></li><li><span>02</span><div><strong>Backoff exponencial</strong><small>Aplicação · tempo</small></div><em>→</em></li><li><span>03</span><div><strong>Replay da DLQ</strong><small>Aplicação · auditoria</small></div><em>→</em></li><li><span>04</span><div><strong>Inbox / outbox</strong><small>Arquitetura · persistência</small></div><em>→</em></li></ol><p><a class="learning-docs-link" href="#documentation">▤ Ler enunciados completos</a></p></article></section>
    <section class="docs-workspace" id="documentation"><header><div><span class="eyebrow">TYPESCRIPT KNOWLEDGE BASE</span><h2>Documentação dentro do laboratório</h2><p>Consulte conceitos e decisões sem sair da control room.</p></div><span><strong>${documents.length}</strong> capítulos</span></header><div class="docs-layout"><aside class="panel docs-menu">${documents.map((document, index) => `<button data-doc="${document.path}" class="${index === 0 ? 'active' : ''}"><span>0${index + 1}</span><div><strong>${document.title}</strong><small>${document.description}</small></div><em>→</em></button>`).join('')}</aside><article class="panel docs-reader"><header><span class="eyebrow">CAPÍTULO SELECIONADO</span><strong id="docs-title">${documents[0]?.title}</strong></header><div id="docs-content" class="docs-loading">Carregando documentação...</div></article></div></section>
  </main>`;

function query<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Element not found: ${selector}`);
  return element;
}

function message(): Message<Order> {
  sequence += 1;
  const symbol = symbols[sequence % symbols.length] ?? 'PETR4';
  return { id: `msg-${sequence}`, attempts: 0, occurredAt: new Date(), payload: { id: `order-${sequence}`, accountId: `ACC-${100 + sequence}`, symbol, side: sequence % 2 ? 'buy' : 'sell', quantity: 100 + sequence * 10, price: 20 + sequence * 1.75, status: 'pending' } };
}

function addEvent(result: EventEntry['result'], title: string, detail: string): void {
  events = [{ time: new Date().toLocaleTimeString('pt-BR'), result, title, detail }, ...events].slice(0, 12);
}

function enqueue(): void {
  const item = message();
  runtime.main.enqueue(item);
  addEvent('enqueued', `${item.payload.symbol} entrou na fila`, `${item.id} · ${item.payload.side.toUpperCase()} ${item.payload.quantity}`);
  render();
}

async function processNext(): Promise<void> {
  const result = await runtime.processor.processNext();
  if (result === 'processed') processed += 1;
  const copy: Record<ProcessingResult, [string, string]> = {
    empty: ['Fila vazia', 'Nenhuma mensagem disponível para consumo.'],
    processed: ['Ordem processada', 'Efeito confirmado e chave idempotente registrada.'],
    duplicate: ['Duplicata ignorada', 'A mensagem já possuía efeito confirmado.'],
    'scheduled-retry': ['Retry agendado', 'Falha transitória; a tentativa foi incrementada.'],
    'dead-lettered': ['Mensagem enviada à DLQ', 'O limite de tentativas foi atingido.'],
  };
  addEvent(result, ...copy[result]);
  render();
}

function render(): void {
  query('#main-count').textContent = String(runtime.main.size);
  query('#retry-count').textContent = String(runtime.retry.size);
  query('#dead-count').textContent = String(runtime.dead.size);
  query('#processed-count').textContent = String(processed);
  query('#event-badge').textContent = String(events.length);
  query('#gateway-status').textContent = failureMode ? 'Indisponível' : 'Operacional';
  query('#gateway-status').classList.toggle('is-down', failureMode);
  const list = query('#event-list');
  list.className = events.length ? 'event-items' : 'empty-log';
  list.innerHTML = events.length ? events.map(event => `<div><i class="event-${event.result}"></i><time>${event.time}</time><span><strong>${event.title}</strong><small>${event.detail}</small></span><em>${event.result}</em></div>`).join('') : '<span>⌁</span><strong>Nenhum evento ainda</strong><small>Enfileire uma ordem para iniciar a simulação.</small>';
}

async function loadDocumentation(path: string, title: string): Promise<void> {
  const content = query('#docs-content');
  query('#docs-title').textContent = title;
  content.className = 'docs-loading';
  content.textContent = 'Carregando documentação...';
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Documentation request failed: ${response.status}`);
    content.innerHTML = marked.parse(await response.text(), { async: false });
    content.className = 'docs-markdown';
  } catch {
    content.textContent = 'Não foi possível carregar este capítulo.';
  }
}

query('#enqueue').addEventListener('click', enqueue);
query('#process').addEventListener('click', () => void processNext());
query('#seed').addEventListener('click', () => { for (let index = 0; index < 5; index += 1) enqueue(); });
query('#drain').addEventListener('click', async () => { while (runtime.main.size + runtime.retry.size > 0) await processNext(); });
query<HTMLInputElement>('#failure').addEventListener('change', event => { failureMode = (event.target as HTMLInputElement).checked; render(); });
query('#clear-log').addEventListener('click', () => { events = []; render(); });
query('#reset').addEventListener('click', () => { runtime = createRuntime(); events = []; processed = 0; sequence = 0; failureMode = false; query<HTMLInputElement>('#failure').checked = false; render(); });
query('#theme').addEventListener('click', () => { document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'; });
query('#auto').addEventListener('click', event => {
  const button = event.currentTarget as HTMLButtonElement;
  if (autoTimer) { window.clearInterval(autoTimer); autoTimer = undefined; button.classList.remove('active'); button.textContent = 'Auto processar'; }
  else { autoTimer = window.setInterval(() => void processNext(), 1200); button.classList.add('active'); button.textContent = 'Parar automação'; }
});

document.querySelectorAll<HTMLButtonElement>('[data-doc]').forEach((button, index) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-doc]').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const chapter = documents[index];
  if (chapter) void loadDocumentation(chapter.path, chapter.title);
}));

render();
if (documents[0]) void loadDocumentation(documents[0].path, documents[0].title);
