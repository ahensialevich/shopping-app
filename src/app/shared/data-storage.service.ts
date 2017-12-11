import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    // const token = this.authState.select('token');
    // return this.httpClient.put('https://ng-recipe-book-228.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(),
    //   {
    //     observe: 'body'
    //   });
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-228.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {reportProgress: true});
    return this.httpClient.request(req);
  }

  fetchRecipes() {
    // const token = this.authState.select('token');
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-228.firebaseio.com/recipes.json', {
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
