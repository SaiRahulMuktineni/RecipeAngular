import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth-service';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.authService.user.pipe(take(1)).subscribe( user => {
      this.httpClient.put('https://ng-recipe-book-edeff.firebaseio.com/recipes.json', recipes,
        {
          params: new HttpParams().set('auth', user.token)
        })
        .subscribe((responseData) => {
          console.log(responseData);
        });
    });
  }

  fetchRecipes() {
    // tslint:disable-next-line:max-line-length
    // using take(), we will only get the current user when we subscribe and then take() operator will immediately unsubscribe from the authservice user
    this.authService.user.pipe(take(1)).subscribe(user => {
      this.httpClient.get<Recipe[]>('https://ng-recipe-book-edeff.firebaseio.com/recipes.json',
        {
          params: new HttpParams().set('auth', user.token)
        })
        .subscribe((recipes) => {
          console.log(recipes);
          this.recipeService.overrideRecipesOnFetchingData(recipes);
        });
    });
  }
}
