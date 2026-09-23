import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CodeBlock } from '../../shared/ui/code-block/code-block';
import { E2E_MISSIONS } from './e2e-missions';

const STORAGE_KEY='angular-learning-lab.e2e-quality';
@Component({selector:'app-e2e-quality',imports:[MatIconModule,CodeBlock],templateUrl:'./e2e-quality.html',styleUrl:'./e2e-quality.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class E2eQuality {
  readonly missions=E2E_MISSIONS; readonly selected=signal(E2E_MISSIONS[0]); readonly completed=signal<string[]>(this.restore());
  readonly progress=computed(()=>Math.round(this.completed().length/this.missions.length*100));
  readonly commands=[{label:'Executar',value:'npm run test:e2e:angular'},{label:'Modo visual',value:'npm run test:e2e:angular:ui'},{label:'Relatório',value:'npx playwright show-report labs/angular-learning-lab/playwright-report'}];
  toggle(id:string):void{this.completed.update(items=>items.includes(id)?items.filter(item=>item!==id):[...items,id]);try{localStorage.setItem(STORAGE_KEY,JSON.stringify(this.completed()))}catch{}}
  private restore():string[]{try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY)??'[]');return Array.isArray(value)?value:[]}catch{return[]}}
}
