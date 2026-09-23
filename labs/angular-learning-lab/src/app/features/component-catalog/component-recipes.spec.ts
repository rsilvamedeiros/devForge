import { COMPONENT_DEMOS } from './component-demos';
import { COMPONENT_RECIPES } from './component-recipes';

describe('Component recipes', () => {
  it('provides an executable demo for every recipe', () => {
    expect(COMPONENT_RECIPES.every(recipe => Boolean(COMPONENT_DEMOS[recipe.id]))).toBeTrue();
  });

  it('keeps recipe ids unique', () => {
    expect(new Set(COMPONENT_RECIPES.map(recipe => recipe.id)).size).toBe(COMPONENT_RECIPES.length);
  });
});
