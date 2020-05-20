import {Component, EventEmitter, Output} from '@angular/core';

import {DataStorageService} from '../shared/data-storage-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  /*@Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }*/

  constructor(private dataStorageService: DataStorageService) {
  }

  saveData() {
    this.dataStorageService.storeRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes();
  }
}
