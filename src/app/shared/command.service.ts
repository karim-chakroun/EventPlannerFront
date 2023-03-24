import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private fb: FormBuilder,
    private http: HttpClient) { }

  readonly BaseURI = 'https://localhost:7164/api';


  getUserCommands(userId) {
    return this.http.get(this.BaseURI + '/Notification?userId=' + userId);
  }
  changeState(id,state) {
    var body = {
      content:state
    };
    return this.http.put(this.BaseURI + '/Notification/' + id,body);
  }
  EmailService(EmailToId,EmailSubject,EmailBody){
    var body = {
      emailToId:EmailToId,
      emailToName:'karim',
      emailSubject:EmailSubject,
      emailBody:EmailBody
    };
    return this.http.post(this.BaseURI + '/Email',body);
  }
}
