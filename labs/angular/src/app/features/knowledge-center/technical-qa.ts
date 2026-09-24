import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TECHNICAL_QA } from './technical-qa.data';

@Component({selector:'app-technical-qa',imports:[MatIconModule],templateUrl:'./technical-qa.html',styleUrl:'./technical-qa.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class TechnicalQa {
  readonly query=signal(''); readonly category=signal('Todas'); readonly level=signal('Todos'); readonly revealed=signal(new Set<string>());
  readonly categories=['Todas',...new Set(TECHNICAL_QA.map(item=>item.category))]; readonly levels=['Todos','Júnior','Pleno','Sênior'];
  readonly filtered=computed(()=>{const term=this.query().trim().toLowerCase();return TECHNICAL_QA.filter(item=>(this.category()==='Todas'||item.category===this.category())&&(this.level()==='Todos'||item.level===this.level())&&(!term||`${item.question} ${item.answer} ${item.points.join(' ')}`.toLowerCase().includes(term)))});
  toggle(id:string):void{this.revealed.update(current=>{const next=new Set(current);next.has(id)?next.delete(id):next.add(id);return next})}
  revealAll():void{this.revealed.set(new Set(this.filtered().map(item=>item.id)))}
}
