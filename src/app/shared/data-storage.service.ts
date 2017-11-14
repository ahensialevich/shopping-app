import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.put('https://ng-recipe-book-228.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    const token = this.authService.getToken();
    this.httpClient.get('https://ng-recipe-book-228.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response: Recipe[]) => {
          const recipes = response;
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
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
