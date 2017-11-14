import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.httpClient.put('https://ng-recipe-book-228.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  fetchRecipes() {
    this.httpClient.get('https://ng-recipe-book-228.firebaseio.com/recipes.json')
      .map(
        (response: Recipe[]) => {
          const recipes = response;
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['inredients'] = [];
            }
          }
          return response;
        }
      ).subscribe(
      (response: Recipe[]) => {
        this.recipeService.setRecipes(response);
      }
    );
  }
}
