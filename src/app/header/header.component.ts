import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {DataStorageService} from '../shared/data-storage-service';
import {AuthService} from '../auth/auth-service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements  OnInit, OnDestroy {

  /*@Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }*/

  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>
    {
      this.isAuthenticated = !user ? false : true;
      // this can also be written as below
      // this.isAuthenticated = !!user;
    });
  }

  saveData() {
    this.dataStorageService.storeRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
