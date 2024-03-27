import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor() { }

  private subject = new Subject<any>();

  passclick() {
    this.subject.next('updated');
  }

  getMessage(): Observable<any>{
    return this.subject.asObservable();
  }

}
