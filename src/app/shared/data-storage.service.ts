import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    private httpUrl = 'https://angular-tutorial-recipeapp.firebaseio.com/';

    constructor(private http: Http,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const token = this.authService.getToken();

        return this.http.put(this.httpUrl + 'recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();

        return this.http.get(this.httpUrl + 'recipes.json?auth=' + token).map((response: Response) => {
            const recipes: Recipe[] = response.json();
            for (const recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return recipes;
        }).subscribe((response: Recipe[]) => {
            this.recipeService.setRecipes(response);
        });
    }
}
