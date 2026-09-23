import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { COMPONENT_DEMOS } from './component-demos';
import { COMPONENT_RECIPES, ComponentRecipe } from './component-recipes';

@Component({
  selector: 'app-component-catalog',
  imports: [NgComponentOutlet, MatButtonModule, MatIconModule],
  templateUrl: './component-catalog.html',
  styleUrl: './component-catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentCatalog {
  readonly recipes = COMPONENT_RECIPES;
  readonly categories = [...new Set(COMPONENT_RECIPES.map(recipe => recipe.category))];
  readonly selected = signal<ComponentRecipe>(COMPONENT_RECIPES[0]);
  readonly showCode = signal(true);
  readonly demo = computed(() => COMPONENT_DEMOS[this.selected().id]);

  readonly grouped = computed(() =>
    this.categories.map(category => ({
      category,
      recipes: this.recipes.filter(recipe => recipe.category === category),
    }))
  );

  open(recipe: ComponentRecipe): void {
    this.selected.set(recipe);
  }

  toggleCode(): void {
    this.showCode.update(value => !value);
  }
}
