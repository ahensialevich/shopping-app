import { Recipe } from '../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a  test', 'https://static.tumblr.com/e4425b81bfd1a22f908322d0bab7f1ce/jrga6uw/2H0nbc3kx/tumblr_static_tumblr_static_cikl62uwv20ws8soo084gco40_640.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
