import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CodeEditor } from '../examples/code-editor';
import { CODING_CHALLENGES, CodingChallenge } from './coding-challenges';

interface TestResult { label:string; passed:boolean; hidden:boolean; actual:string; expected:string; }
@Component({selector:'app-coding-arena',imports:[MatIconModule,CodeEditor],templateUrl:'./coding-arena.html',styleUrl:'./coding-arena.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class CodingArena {
  readonly challenges=CODING_CHALLENGES; readonly selected=signal(CODING_CHALLENGES[0]); readonly draft=signal(CODING_CHALLENGES[0].starter); readonly results=signal<TestResult[]>([]); readonly running=signal(false); readonly completed=signal<string[]>(this.restore());
  readonly passed=computed(()=>this.results().filter(test=>test.passed).length); readonly allPassed=computed(()=>this.results().length>0&&this.passed()===this.results().length);
  open(challenge:CodingChallenge):void{this.selected.set(challenge);this.draft.set(challenge.starter);this.results.set([])}
  reset():void{this.draft.set(this.selected().starter);this.results.set([])}
  run():void{this.running.set(true);const challenge=this.selected();const results:TestResult[]=[];try{const factory=new Function(`"use strict";${this.draft()};return solve;`) as()=>unknown;const solve=factory();if(typeof solve!=='function')throw new Error('Defina function solve(input).');for(const test of challenge.tests){let actual:unknown;try{actual=(solve as(input:unknown)=>unknown)(structuredClone(test.input))}catch(error){actual=error instanceof Error?`${error.name}: ${error.message}`:String(error)}results.push({label:test.label,passed:JSON.stringify(actual)===JSON.stringify(test.expected),hidden:!!test.hidden,actual:this.format(actual),expected:this.format(test.expected)})}}catch(error){results.push({label:'Compilação',passed:false,hidden:false,actual:error instanceof Error?error.message:String(error),expected:'Código JavaScript válido com function solve(input).'})}this.results.set(results);this.running.set(false);if(results.length&&results.every(test=>test.passed)){this.completed.update(ids=>ids.includes(challenge.id)?ids:[...ids,challenge.id]);try{localStorage.setItem('angular-learning-lab.coding-arena',JSON.stringify(this.completed()))}catch{}}}
  private format(value:unknown):string{try{return JSON.stringify(value)}catch{return String(value)}} private restore():string[]{try{return JSON.parse(localStorage.getItem('angular-learning-lab.coding-arena')??'[]')}catch{return []}}
}
