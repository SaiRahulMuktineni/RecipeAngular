import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {

  /*recipeSelected = new EventEmitter<Recipe>();*/
  recipeSelected = new Subject<Recipe>();

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'Recipe 1 description',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)

      ]),
    new Recipe('Test Recipe 2', 'Recipe 2 description',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg',
      [
        new Ingredient('Bread', 1),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice(); // we are sending only a copy of the recipes array (and not the original array) by using slice().
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
     return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  overrideRecipesOnFetchingData(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
