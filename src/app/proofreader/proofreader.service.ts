import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface TextErrorResponse{
    "software": {
      "name": string,
      "version": string,
      "buildDate": string,
      "apiVersion": number,
      "status": string,
      "premium": boolean
    },
    "language": {
      "name": string,
      "code": string,
      "detectedLanguage": {
        "name": string,
        "code": string
      }
    },
    "matches": [
      {
        "message": string,
        "shortMessage": string,
        "offset": number,
        "length": number,
        "replacements": [
          {
            "value": string
          }
        ],
        "context": {
          "text": string,
          "offset": number,
          "length": number
        },
        "sentence": string,
        "rule": {
          "id": string,
          "subId": string,
          "description": string,
          "urls": [
            {
              "value": string
            }
          ],
          "issueType": string,
          "category": {
            "id": string,
            "name": string
          }
        }
      }
    ]
}

export interface TextError{
    "message": string,
    "shortMessage": string,
    "offset": number,
    "length": number,
    "replacements": [
        {
            "value": string
        }
    ],
    "context": {
        "text": string,
        "offset": number,
        "length": number
    },
    "sentence": string,
    "rule": {
        "id": string,
        "subId": string,
        "description": string,
        "urls": [
            {
                "value": string
            }
        ],
        "issueType": string,
        "category": {
            "id": string,
            "name": string
        }
    }
}

const URL_SERVICE = "https://sfu24spcmpt474a2eca103-4ora5oxrra-uc.a.run.app"
const URL_CHECK = "/v2/check"
const URL_LANG = "/v2/languages"
const LANG_ENUS = "en-US"

@Injectable({
  providedIn: 'root'
})
export class ProofreaderService {
    textErrors: TextError[] = [];
    hasSubmitted: boolean = false;
    
    headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    options = { headers: this.headers }
    constructor(private http: HttpClient) {
        try{
            http.get<HttpResponse<any>>(URL_SERVICE + URL_LANG).subscribe({
                next: (response) => {
                    console.log("Proofreader available")
                },
                error: (e) =>{
                    console.log(e)
                    alert("Proofreader may not be available. Retry later.")
                }
            })
        }
        catch (e){
            console.log(e)
            alert("An error occurred. Check console for details.")
        }
    }

    proofread(text: string){
        try{
            let body = new HttpParams()
                .set("text", text)
                .set("language", LANG_ENUS)

            this.http.post<HttpResponse<any>>(
                URL_SERVICE + URL_CHECK, 
                body,
                this.options
            ).subscribe({
                next: (response) => {
                    let matches = (response as unknown as TextErrorResponse)["matches"]
                    this.textErrors.splice(0, this.textErrors.length)
                    for(let err of matches){
                        this.textErrors.push(err as TextError)
                    }
                    this.hasSubmitted = true;
                },
                error: (e) =>{
                    console.log(e)
                    alert("An error occurred. Check console for details.")
                }
            })
        }
        catch (e){
            console.log(e)
            alert("An error occurred. Check console for details.")
        }
    }
}
