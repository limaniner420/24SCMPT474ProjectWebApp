import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentboxComponent } from '../commentbox/commentbox.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, CommentboxComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  dialogComment: string[] = [];
  dialogTitle: string = '';
  dialogID: string = '';

  @Output() submitClicked = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    this.dialogTitle = this.data.title;
    this.dialogComment = this.data.commentList;
    this.dialogID = this.data.textID;
  }

}
