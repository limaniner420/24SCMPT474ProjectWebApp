import { Component } from '@angular/core';
import { textList } from '../sample_texts';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DatabaseService } from '../database/database.service';
import { MessageServiceService } from '../message-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-text-lists',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './text-lists.component.html',
  styleUrl: './text-lists.component.css'
})
export class TextListsComponent{

  textlists : any = [];
  temp_commentreply: any;
  subscription: Subscription;
  _reload = true;

  constructor(private dialog: MatDialog, private dbs: DatabaseService, private messageService: MessageServiceService){
    this.subscription = this.messageService.getMessage().subscribe(message =>{
      this.dbs.getText().subscribe(
        (response) => {
          console.log(response);
          this.textlists = response
          console.log("This is pushed", response)
          this.reload()
      }, error => {
          console.error(error);
      });
    })
  }

  reload() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
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
        console.log("No comments");

        const dialogRef = this.dialog.open(DialogComponent, {
          data: {title: text.TextContent, commentList: [], textID: text.TextId},
          width: '1200px',
          maxHeight: '700px',
        });

        dialogRef.afterClosed().subscribe((result)=>{
          console.log('The dialog was closed');
          console.log(result);
        })
    });
  }

  deleteComment(text: textList): void{
    this.dbs.deleteText(text.TextId);
    for (let i = 0; i < this.textlists.length; i++){
      if (this.textlists[i].TextId === text.TextId){
        this.textlists.splice(i, 1);
        break;
      }
    }
    
  }

  printing(){
    console.log(this.textlists);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
   this.subscription.unsubscribe();
 }

}
