import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({selector:'app-architecture-guide',imports:[MatIconModule],templateUrl:'./architecture-guide.html',styleUrl:'./architecture-guide.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class ArchitectureGuide {
  readonly layers = [
    {name:'UI',icon:'web',owns:'Renderização, interação e estado efêmero',contains:'pages · components · directives · pipes',rule:'Depende de casos de uso; não conhece HTTP.'},
    {name:'Application',icon:'account_tree',owns:'Orquestração, estado da feature e casos de uso',contains:'facades · stores · use cases',rule:'Coordena portas sem carregar detalhes visuais.'},
    {name:'Domain',icon:'category',owns:'Regras, entidades, tipos e invariantes',contains:'models · policies · pure functions',rule:'TypeScript puro; testável sem TestBed.'},
    {name:'Infrastructure',icon:'dns',owns:'HTTP, storage, browser e integrações',contains:'adapters · interceptors · DTO mappers',rule:'Implementa portas definidas para dentro.'},
  ];
  readonly decisions = [
    {question:'Signal ou Observable?',answer:'Signal para estado síncrono consumido pela UI; Observable para eventos assíncronos, cancelamento e composição temporal.'},
    {question:'Service ou função pura?',answer:'Service quando há dependências ou ciclo de vida; função pura para transformação e regra determinística.'},
    {question:'Estado local ou compartilhado?',answer:'Mantenha local até dois consumidores distantes precisarem da mesma fonte de verdade ou a rota exigir persistência.'},
    {question:'Resolver ou carregar na página?',answer:'Resolver para dado indispensável à rota; carregamento progressivo para conteúdo secundário.'},
    {question:'Facade ou acesso direto?',answer:'Facade quando reduz acoplamento de vários consumidores; acesso direto quando a abstração apenas renomearia a mesma chamada.'},
    {question:'Biblioteca ou feature local?',answer:'Extraia somente depois de uso real em mais de um contexto e quando o contrato estiver estável.'},
  ];
  readonly smells = ['Componente injeta muitos services','Effect copia um signal para outro','Subject exposto publicamente','HTTP dentro de componente visual','SharedModule genérico e crescente','Guard tratado como autorização','Estado derivado armazenado','Barrel cria dependência circular'];
}

