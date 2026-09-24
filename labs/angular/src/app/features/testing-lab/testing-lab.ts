import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CodeBlock } from '../../shared/ui/code-block/code-block';

@Component({selector:'app-testing-lab',imports:[MatIconModule,CodeBlock],templateUrl:'./testing-lab.html',styleUrl:'./testing-lab.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class TestingLab {
  readonly active = signal(0);
  readonly recipes = [
    {title:'Função pura',scope:'Unidade',goal:'Provar regra e casos de borda sem runtime Angular.',code:`describe('calculateProgress', () => {\n  it('rounds completed ratio', () => {\n    expect(calculateProgress(2, 5)).toBe(40);\n  });\n});`,checks:['entrada e saída','limites','sem TestBed']},
    {title:'Componente',scope:'Integração',goal:'Testar o comportamento visível através do DOM.',code:`const fixture = TestBed.createComponent(Counter);\nfixture.componentRef.setInput('step', 2);\nfixture.detectChanges();\nfixture.nativeElement.querySelector('button').click();\nexpect(fixture.nativeElement.textContent).toContain('2');`,checks:['input público','interação real','saída no DOM']},
    {title:'Service com DI',scope:'Unidade',goal:'Substituir uma porta e validar orquestração.',code:`TestBed.configureTestingModule({\n  providers: [CourseStore, { provide: CourseApi, useValue: apiSpy }]\n});\napiSpy.list.and.returnValue(of(courses));\nexpect(TestBed.inject(CourseStore).courses()).toEqual(courses);`,checks:['porta substituída','contrato observado','sem rede']},
    {title:'HttpClient',scope:'Integração',goal:'Validar URL, método, payload e mapping.',code:`service.list().subscribe(value => expect(value).toEqual(expected));\nconst request = http.expectOne('/api/courses');\nexpect(request.request.method).toBe('GET');\nrequest.flush(dto);\nhttp.verify();`,checks:['request exato','response controlada','verify no teardown']},
    {title:'Router',scope:'Integração',goal:'Navegar como o usuário e verificar a página ativada.',code:`const harness = await RouterTestingHarness.create();\nconst page = await harness.navigateByUrl('/courses/42', CourseDetail);\nexpect(page.courseId()).toBe('42');`,checks:['rota real','parâmetros','guard/resolver quando relevante']},
  ];
  readonly pyramid = [{label:'Funções e domínio',value:55},{label:'Componentes e integrações',value:35},{label:'Fluxos ponta a ponta',value:10}];
}
