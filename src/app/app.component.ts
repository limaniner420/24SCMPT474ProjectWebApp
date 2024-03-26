import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RecipeComponent } from './recipeList/recipeList.component';
import { RecipeFormComponent } from './recipeForm/recipe-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentboxComponent } from './commentbox/commentbox.component';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RecipeComponent,
    RecipeFormComponent,
    HttpClientModule,
    CommentboxComponent,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CMPT474 Simple Proofreader';
}
