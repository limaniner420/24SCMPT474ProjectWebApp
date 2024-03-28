import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditBoxComponent } from '../edit-box/edit-box.component';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [EditBoxComponent, MatDialogModule, CommonModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  dialogTitle: string = '';
  dialogID: string = '';

  @Output() submitClicked = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    this.dialogTitle = this.data.title;
    this.dialogID = this.data.textID;
  }

}
