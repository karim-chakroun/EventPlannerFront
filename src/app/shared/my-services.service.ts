import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MyServicesService {

  readonly BaseURI = 'https://localhost:7164/api';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    serviceName: ['', Validators.required],
    description: ['', Validators.required],
    avalable: ['', Validators.required],
    promotion: ['', Validators.required],
    type:['', Validators.required],
    prix:['', Validators.required],
    image:['', Validators.required],
    video:['', Validators.required],
    

  });

  AddService() {
    var body = {
      serviceName: this.formModel.value.serviceName,
      description: this.formModel.value.description,
      avalable: this.formModel.value.avalable,
      promotion: this.formModel.value.promotion,
      type: this.formModel.value.type,
      prix:this.formModel.value.prix,
      image:"test",
      video:this.formModel.value.video
    };
    return this.http.post(this.BaseURI + '/Services', body);
  }

  getServices(){
    return this.http.get(this.BaseURI+ '/Services');
  }
  getEbayServices(search){
    return this.http.get(this.BaseURI+ '/Services/Ebay?search='+search);
  }
  getLatestServices(){
    return this.http.get(this.BaseURI+ '/Services/GetLatestServices');
  }
  AffectServiceToEvent(formData){
    return this.http.post(this.BaseURI + '/Notification', formData);
  }
  AffectExternServiceToEvent(formData){
    return this.http.post(this.BaseURI + '/ExternServices', formData);
  }
}
