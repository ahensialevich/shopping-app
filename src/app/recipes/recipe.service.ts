import {EventEmitter} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredients.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  sendIngredientsToShoppingList = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Big Fat Burger',
      'Wow, such tasty, very nom',
      'https://static.tumblr.com/e4425b81bfd1a22f908322d0bab7f1ce/jrga6uw/' +
      '2H0nbc3kx/tumblr_static_tumblr_static_cikl62uwv20ws8soo084gco40_640.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 2)
      ]),
    new Recipe('Cheesy Pizza',
      'As fat as butt of your ex',
      'http://s10.favim.com/orig/160622/food-junk-food-pizza-tumblr-Favim.com-4441580.jpeg',
      [
        new Ingredient('Cheese', 1),
        new Ingredient('Dough', 1)
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  sendThemToTheSlaughterHouse(recipe: Recipe) {
    this.sendIngredientsToShoppingList.emit(recipe);
  }
}
