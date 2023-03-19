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
}
