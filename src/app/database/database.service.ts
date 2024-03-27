import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

//const DATABASE_URL = "https://dbserver-4ora5oxrra-uc.a.run.app/"
const DATABASE_URL = "http://localhost:8080/"

const TEST_STUDENT_ID = "123456789"

@Injectable({
    providedIn: 'root',
})
export class DatabaseService {
    headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    options = { headers: this.headers }

    constructor(private http: HttpClient) { }

    submitText(text: string): void {
        const body = new HttpParams().set('TextContent', text)
            .set('StudentID', TEST_STUDENT_ID);
        this.http.post(DATABASE_URL + 'text/', body.toString(), this.options).subscribe(response => {
            console.log(response);
        }, error => {
            console.error(error);
        });
    }
}