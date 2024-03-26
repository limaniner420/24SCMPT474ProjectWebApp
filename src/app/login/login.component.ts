import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private fb: FormBuilder){}

  loginForm = this.fb.group({
    first: ['', Validators.required],
    last: ['', Validators.required],
    student: ['', Validators.required],
  });

  loginSubmit(first:string, last:string, student:string){
    alert("Login submitted");
    console.log(first, last, student);
  }

}
