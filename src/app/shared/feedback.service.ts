import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly BaseURI = 'https://localhost:7164/api';

  formModel = this.fb.group({
    Description: [''],
  });

  addFeedback(idPoster,idReceiver,fullname,image) {
    var body = {
      description: this.formModel.value.Description,
      datePost:new Date(),
      idPoster:idPoster,
      idReceiver:idReceiver,
      fullname:fullname,
      image:image
    };
    return this.http.post(this.BaseURI + '/Feedback', body);
  }

}
