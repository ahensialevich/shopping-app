import {Ingredient} from '../../shared/ingredients.model';
import {Recipe} from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface RecipesState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
    recipes: [
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
    ]
  }
;

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case RecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
