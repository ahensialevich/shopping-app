import {Recipe} from '../recipe.model';
import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  sendIngredients(recipe: Recipe) {
    this.recipeService.sendThemToTheSlaughterHouse(recipe);
  }
}
