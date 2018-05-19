import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-save',
  templateUrl: './recipe-save.component.html',
  styleUrls: ['./recipe-save.component.css']
})
export class RecipeSaveComponent implements OnInit {
	title : String = "Agregar Receta";
	recipe : Recipe = new Recipe('','','',[]);
	name : string = '';
	amount : number = 0;
	id:number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
        	if(params['id']){
        		this.id = +params['id'];
          		this.recipe = this.recipeService.getRecipe(this.id);
          		this.title = "Editar Receta";
        	}
        }
      );
  }

  addIngredient():void{
  	this.recipe.ingredients.push(new Ingredient(this.name,this.amount));
  	this.name = '';
	this.amount = 0;
  }

  removeIngredient(index:number):void{
  	this.recipe.ingredients.splice(index, 1);
  }

  save():void{
  	if(this.id)
  		this.dataStorageService.updateRecipe(this.id,this.recipe);
  	else
  		this.dataStorageService.saveRecipe(this.recipe);
  	
    this.router.navigate(['/recipes']);
  }

}
