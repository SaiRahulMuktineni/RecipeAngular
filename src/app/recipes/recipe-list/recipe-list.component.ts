import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'Recipe 1 description',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg'),
    new Recipe('Test Recipe 2', 'Recipe 2 description',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recSelected.emit(recipe);
  }
}
