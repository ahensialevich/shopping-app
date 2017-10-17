import {Ingredient} from '../shared/ingredients.model';
import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';

@Injectable()
export class ShoppingListService implements OnInit {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.sendIngredientsToShoppingList.subscribe(
      (recipe: Recipe) => {
        for (const ingredient of recipe.ingredients) {
          this.addIngredient(ingredient);
        }
      }
    );
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
