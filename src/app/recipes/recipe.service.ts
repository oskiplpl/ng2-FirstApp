import { Recipe } from "./recipe.model";
import { Injectable } from "../../../node_modules/@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChange = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService) { }

    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'This is simply the test'
            , 'http://sparrowspizza.com/img/slideshow/img-one.jpg'
            , [
                new Ingredient('Tomato', 2),
                new Ingredient('Chees', 4)
            ]),
        new Recipe('Test', 'This is simply the test'
            , 'http://sparrowspizza.com/img/slideshow/img-one.jpg'
            , [
                new Ingredient('Sos', 1),
                new Ingredient('Pepperoni', 10)
            ]),
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChange.next(this.getRecipes());
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChange.next(this.getRecipes());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChange.next(this.getRecipes());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChange.next(this.getRecipes());
    }
}
