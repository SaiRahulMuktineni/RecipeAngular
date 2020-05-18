import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {

  // as we are only passing a slice of the ingredients array and whenever a new ingredient gets added, it gets added to
  // main ingredients array which is fine but we are using slice copy of ingredients to show the ingredients in shopping-list
  // which will not have this newly added ingredient as its a slice copy of the ingredients when the component is created.
  // hence we create an event emitter to sent the new ingredients list whenever an ingredient is added.
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // ... is doing spread of ingredients array as list of ingredients and adding them
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
