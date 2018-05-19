import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {RecipesResponse} from '../recipes/recipe.response.model';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {}


  getRecipes() {
    this.http.get('http://localhost:8080/api/recipe/all')
      .map(
        (response: Response) => {
          const recipesResponse: RecipesResponse = response.json();
          const recipes = recipesResponse.recipes;
          console.log('recipes',recipesResponse.recipes);
          for (const recipe of recipesResponse.recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

  saveRecipe(recipe:Recipe) {
    this.http.post('http://localhost:8080/api/recipe/',recipe)
      .map(
        (response: Response) => {
          const recipesResponse: RecipesResponse = response.json();
          return recipesResponse;
        }
      )
      .subscribe(
        (recipesResponse: RecipesResponse) => {
          if(recipesResponse.code=='200')
            this.getRecipes();
        }
      );
  }

  updateRecipe(id:number, recipe:Recipe) {
    this.http.put('http://localhost:8080/api/recipe/'+id,recipe)
      .map(
        (response: Response) => {
          const recipesResponse: RecipesResponse = response.json();
          return recipesResponse;
        }
      )
      .subscribe(
        (recipesResponse: RecipesResponse) => {
          if(recipesResponse.code=='200')
            this.getRecipes();
        }
      );
  }
}
