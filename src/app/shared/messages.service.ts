import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7164/api';

  getMessagesByUser(userId){
    return this.http.get(this.BaseURI+ '/Messages/GetUserMessages?id='+userId);
  }
  getServices(){
    return this.http.get(this.BaseURI+ '/Services');
  }

  AddMessage(formData,id){
    return this.http.put(this.BaseURI + '/Messages/'+id, formData);
  }

  AddConversation(formData,id){
    return this.http.post(this.BaseURI + '/Messages?userId='+id, formData);
  }
}
