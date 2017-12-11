import {Ingredient} from '../shared/ingredients.model';
import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as fromApp from '../store/app.reducers';
import * as fromShoppingList from './ngrx-store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new fromShoppingList.StartEdit(index));
  }
}
