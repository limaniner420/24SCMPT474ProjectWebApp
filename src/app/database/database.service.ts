import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { textList } from '../sample_texts';
import { Observable } from 'rxjs';

//const DATABASE_URL = "https://dbserver-4ora5oxrra-uc.a.run.app/"
const DATABASE_URL = "http://localhost:8080/"

const TEST_STUDENT_ID = "123456789"

@Injectable({
    providedIn: 'root',
})

export class DatabaseService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    options = { headers: this.headers }

    constructor(private http: HttpClient) {}

    submitText(text: string): void {
        const body = {
            'TextContent': text,
            'StudentID': TEST_STUDENT_ID
        };
        console.log(body);
        this.http.post(DATABASE_URL + 'text/', body, this.options).subscribe(response => {
            console.log(response);
        }, error => {
            console.error(error);
        });
    }


    getText(){
        return this.http.get(DATABASE_URL + 'text/', this.options);
    }

        // Should return this
        // [
        //     {
        //       StudentId: 'aQ3yTkDrHruq',
        //       TextId: 'text-403b59484abba78aa41fcd881258cd659146b7a81c0e44558d7c05ddce147a58',
        //       TextContent: 'is this working'
        //     },
        //     {
        //       StudentId: 'student-ln3W4Jg9k26N',
        //       TextId: 'text-6714e7d0228aa6291f99801486b3278d94e2b87b00e762f01b28377892138115',
        //       TextContent: 'This is an example text'
        //     }
        //   ]

    get_comments(text_ID: string){
        return this.http.get(DATABASE_URL + 'comment?' + 'TextId=' + text_ID);
    }

    submitComment(textID: string, text: string): void{
        let data = {
            CommentContent: text,
        }
        this.http.post(DATABASE_URL + 'comment?' + 'TextId=' + textID, data, this.options).subscribe(response => {
            console.log(response);
        }, error => {
            console.error(error);
        });
    }

}