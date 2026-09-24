import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Pipe({name:'studyTime',pure:true})
export class StudyTimePipe implements PipeTransform { transform(minutes:number):string { const hours=Math.floor(minutes/60); const rest=minutes%60; return hours ? `${hours}h ${rest}min` : `${rest}min`; } }

@Component({selector:'app-pipe-demo',imports:[StudyTimePipe,MatButtonModule],template:`<div><button mat-stroked-button type="button" (click)="addMinutes()">+15 minutos</button><strong>{{minutes() | studyTime}}</strong></div><p>O pipe puro formata apresentação sem alterar a fonte numérica.</p>`,styles:`div{display:flex;align-items:center;gap:1rem}strong{font:600 1.2rem 'DM Mono'}p{margin:.8rem 0 0;color:var(--lab-muted)}`,changeDetection:ChangeDetectionStrategy.OnPush})
export class PipeDemo { readonly minutes=signal(75); addMinutes():void { this.minutes.update(value=>value+15); } }
