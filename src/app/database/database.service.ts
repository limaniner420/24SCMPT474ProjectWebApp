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
        'Content-Type': 'application/json'
    })
    options = { headers: this.headers }

    constructor(private http: HttpClient) { }

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
}