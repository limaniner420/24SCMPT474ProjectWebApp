import { Component, inject } from '@angular/core';
import { textList } from '../sample_texts';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DatabaseService } from '../database/database.service';


@Component({
  selector: 'app-text-lists',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './text-lists.component.html',
  styleUrl: './text-lists.component.css'
})
export class TextListsComponent {

  textlists : any;
  temp_commentreply: any;

  constructor(private dialog: MatDialog, private dbs: DatabaseService){
  }

  ngOnInit(){
    this.dbs.getText().subscribe(
      (response) => {
        console.log(response);
        this.textlists = response;
    }, error => {
        console.error(error);
    });
  }

  // Need to load the comments here by getting them using textID
  seeComment(text: textList): void{
    this.dbs.get_comments(text.TextId).subscribe(
      // Waiting for response
      (response) => {

        console.log(response);
        this.temp_commentreply = response;

        let temp_comment = [];
        for (let i=0; i < this.temp_commentreply.length; i++){
          temp_comment.push(this.temp_commentreply[i].CommentContent);
        }

        const dialogRef = this.dialog.open(DialogComponent, {
          data: {title: text.TextContent, commentList: temp_comment, textID: text.TextId},
          width: '1200px',
          maxHeight: '700px',
        });

        dialogRef.afterClosed().subscribe((result)=>{
          console.log('The dialog was closed');
          console.log(result);
        })


    }, error => {
        console.error(error);
    });
  }

  printing(){
    console.log(this.textlists);
  }

}
