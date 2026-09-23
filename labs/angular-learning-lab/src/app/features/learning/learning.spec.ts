import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Learning } from './learning';

describe('Learning', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [Learning], providers: [provideRouter([])] });
  });

  it('persists module progress locally', () => {
    const fixture = TestBed.createComponent(Learning);
    const component = fixture.componentInstance;

    component.toggle('components');

    expect(component.progress()).toBe(20);
    expect(localStorage.getItem('equities-learning-progress')).toContain('components');
  });
});
