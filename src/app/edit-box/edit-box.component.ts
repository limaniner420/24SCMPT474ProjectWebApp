import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../database/database.service';
import { MessageServiceService } from '../message-service.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-box.component.html',
  styleUrl: './edit-box.component.css'
})
export class EditBoxComponent {

  @Input() inputFromParenttext: string = "";
  @Input() inputFromParentID: string = "";
  @Output() close: EventEmitter<void> = new EventEmitter<void>()

  constructor(private builder: FormBuilder, private dbs: DatabaseService, private messageService: MessageServiceService, public dialogRef: MatDialogRef<EditDialogComponent>){
  };

  textForm = this.builder.group({
    textField: ['', [Validators.required]],
    textPublicise: [false]
  })

  ngOnInit() {
    if (this.textForm) {
      this.textForm.get('textField')?.setValue(this.inputFromParenttext); // Optional chaining
    }
  }

  editSubmit(){
    let form = this.textForm
    let formV = form.getRawValue();
    if(!form.valid){
        alert("Text input missing.")
        return;
    }
    let text = formV.textField;
    this.dbs.editText(this.inputFromParentID, text!);
    this.dialogRef.close();
}

}
