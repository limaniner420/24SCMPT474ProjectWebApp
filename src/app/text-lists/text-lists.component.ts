import { Component } from '@angular/core';
import { textList, textlists } from '../sample_texts';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-text-lists',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './text-lists.component.html',
  styleUrl: './text-lists.component.css'
})
export class TextListsComponent {
  textlists = [...textlists];

  constructor(private dialog: MatDialog){}

  seeComment(text: textList): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: text.title, commentList: text.comments},
    });

    dialogRef.afterClosed().subscribe((result)=>{
      console.log('The dialog was closed');
      console.log(result);
    })
  }

}
