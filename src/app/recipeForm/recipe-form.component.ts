import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProofreaderService } from '../proofreader/proofreader.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})

export class RecipeFormComponent {
    // displayForm: boolean = false;

    textForm = this.builder.group({
        textField: ["", [Validators.required]],
        textPublicise: [false]
    })

    constructor(private builder: FormBuilder, private ps: ProofreaderService){};

    textSubmit(){
        let form = this.textForm
        let formV = form.getRawValue();
        if(!form.valid){
            alert("Text input missing.")
            return;
        }
        let formVValidated = {textField: formV.textField!, textPublicise: formV.textPublicise};
        this.ps.proofread(formVValidated.textField)
        if(formV.textPublicise){
            
        }
    }

    // toggleForm(){
    //     this.displayForm = !this.displayForm;
    // }
}
