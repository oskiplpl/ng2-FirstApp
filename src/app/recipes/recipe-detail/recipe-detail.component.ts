import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;

    constructor(private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.recipe = this.recipeService.getRecipe(+params['id']);
        });
    }

    onAddToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    onDeleteRecipe() {
        const index = +this.route.snapshot.params['id'];
        this.recipeService.deleteRecipe(index);
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}
