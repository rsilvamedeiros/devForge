export interface E2eMission {
  id: string; title: string; risk: string; level: string; icon: string;
  objective: string; scenarios: string[]; evidence: string; snippet: string;
}

export const E2E_MISSIONS: E2eMission[] = [
  { id:'navigation',title:'Navegação crítica',risk:'Alto',level:'Fundamento',icon:'route',objective:'Garanta que dashboard, busca global e rotas lazy levem ao destino correto.',scenarios:['Dashboard → Sandbox','Busca → Projeto Final','Fallback de rota desconhecida'],evidence:'Teste estável usando roles e URL, sem waits arbitrários.',snippet:`test('opens the sandbox', async ({ page }) => {
  await page.goto('/overview');
  await page.getByRole('link', { name: /Angular Sandbox/ }).click();
  await expect(page).toHaveURL(/\/sandbox$/);
});` },
  { id:'theme',title:'Tema e persistência',risk:'Médio',level:'Experiência',icon:'contrast',objective:'Valide mudança visual, preferência persistida e rótulo acessível do controle.',scenarios:['Alternância light/dark','Persistência após reload','Nome acessível atualizado'],evidence:'Teste observa contrato no DOM e storage, não classes internas.',snippet:`const toggle = page.getByRole('button', { name: /Ativar tema/ });
await toggle.click();
const theme = await page.locator('html').getAttribute('data-theme');
await page.reload();
await expect(page.locator('html')).toHaveAttribute('data-theme', theme!);` },
  { id:'responsive',title:'Navegação mobile',risk:'Alto',level:'Responsividade',icon:'devices',objective:'Prove que a sidebar abre, permite navegação e fecha no viewport móvel.',scenarios:['Menu inicialmente fechado','Abertura pelo header','Fechamento após selecionar rota'],evidence:'Projeto mobile executado com device real do Playwright.',snippet:`test.use({ viewport: { width: 412, height: 915 } });
await page.getByRole('button', { name: /navegação/ }).click();
await page.getByRole('link', { name: /Coding Arena/ }).click();
await expect(page).toHaveURL(/\/coding-arena$/);` },
  { id:'accessibility',title:'Acessibilidade estrutural',risk:'Alto',level:'Qualidade',icon:'accessibility_new',objective:'Automatize checks rápidos sem substituir auditoria manual e tecnologia assistiva.',scenarios:['Um h1 por página','Controles com nome acessível','Ordem de foco previsível'],evidence:'Falha aponta página e contrato violado de maneira acionável.',snippet:`for (const route of routes) {
  await page.goto(route);
  await expect(page.locator('main h1')).toHaveCount(1);
}` },
  { id:'failure',title:'Falhas e evidências',risk:'Crítico',level:'Operação',icon:'bug_report',objective:'Configure trace, screenshot e relatório para investigar falhas sem reproduzir localmente.',scenarios:['Trace no retry','Screenshot apenas em falha','Relatório HTML preservado no CI'],evidence:'Artefato contém ações, rede, console e screenshot do erro.',snippet:`use: {
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
},
retries: process.env['CI'] ? 2 : 0` },
];
