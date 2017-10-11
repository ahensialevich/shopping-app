import { Ingredient } from '../../shared/ingredients.model';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() itemAdded = new EventEmitter<Ingredient>();
  @ViewChild('nameInputRef') nameInput: ElementRef;
  @ViewChild('amountInputRef') amountInput: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.nameInput.nativeElement.value;
    const ingAmount = this.amountInput.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.itemAdded.emit(newIngredient);
  }
}
