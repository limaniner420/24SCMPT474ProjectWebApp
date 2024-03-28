import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../database/database.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-commentbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './commentbox.component.html',
  styleUrl: './commentbox.component.css'
})
export class CommentboxComponent{
  constructor(private fb: FormBuilder, private dbs: DatabaseService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogComponent>){}

  form = this.fb.group({
    comment: ['', Validators.required],
  });

  commentSubmit(comment:string){
    if(comment.length == 0){
      alert("Comment cannot be empty");
      console.log("Comment cannot be empty");
    }
    else{
      alert("Comment submitted");
      console.log(comment);
      console.log(this.data.textID)
      this.dbs.submitComment(this.data.textID, comment);
      this.dialogRef.close();
    }
  }

}
