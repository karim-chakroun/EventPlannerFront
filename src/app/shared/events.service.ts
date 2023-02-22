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
}
