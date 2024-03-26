import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commentbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './commentbox.component.html',
  styleUrl: './commentbox.component.css'
})
export class CommentboxComponent{
  constructor(private fb: FormBuilder){}

  form = this.fb.group({
    comment: ['', Validators.required],
  });

  commentSubmit(comment:string){
    if(comment.length === 0){
      alert("Comment cannot be empty");
      console.log("Comment cannot be empty");
    }
    else{
      alert("Comment submitted");
      console.log(comment);
    }
  }

}
