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
    return this.httpClient.put('https://ng-recipe-book-228.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
      {
        observe: 'body'
      });
  }

  fetchRecipes() {
    const token = this.authService.getToken();
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-228.firebaseio.com/recipes.json?auth=' + token, {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ).subscribe(
      (response: Recipe[]) => {
        this.recipeService.setRecipes(response);
      }
    );
  }
}
