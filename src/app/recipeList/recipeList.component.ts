import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService, Recipe } from '../recipeService/recipe.service';
import { ProofreaderService, TextError } from '../proofreader/proofreader.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipeList.component.html',
  styleUrl: './recipeList.component.css'
})

export class RecipeComponent {
    textErrors: TextError[] = this.ps.textErrors;
    modalEntry: Recipe | null = null;
    displayForm: boolean = false;

    constructor(private ps: ProofreaderService){};

    checkDirty(){ return this.ps.hasSubmitted }
}