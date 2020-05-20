import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put('https://ng-recipe-book-edeff.firebaseio.com/recipes.json', recipes)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-edeff.firebaseio.com/recipes.json')
      .subscribe((recipes) => {
        console.log(recipes);
        this.recipeService.overrideRecipesOnFetchingData(recipes);
      });
  }
}
