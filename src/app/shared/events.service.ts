import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private fb: FormBuilder,
     private http: HttpClient) { }

     readonly BaseURI = 'https://localhost:7164/api';

  AddEvent(formData){
    return this.http.post(this.BaseURI + '/Event', formData);
  }

  getUserEvents(userId){
    return this.http.get(this.BaseURI+ '/Event/GetUserEvents?userId='+userId);
  }
  putEventSteps(eventId,body){
    return this.http.put(this.BaseURI+ '/Event/'+eventId,body);
  }
  getEventById(eventId){
    return this.http.get(this.BaseURI+ '/Event/'+eventId);
  }
}
