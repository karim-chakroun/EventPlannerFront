import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { EventsService } from '../shared/events.service';
import { MyServicesService } from '../shared/my-services.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class AddEventComponent implements OnInit {

  fruits: any[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  remove(fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


  firstFormGroup = this._formBuilder.group({
    type: ['', Validators.required],
  
  });
  secondFormGroup = this._formBuilder.group({
    EventName: ['', Validators.required],
    Adresse: ['', Validators.required],
    Description: ['', Validators.required],
    DateDebut: ['', Validators.required],
    DateFin: ['', Validators.required],
  });

  searchText=null;


  constructor(private _formBuilder: FormBuilder,
    private service:EventsService,
    private myServiceService:MyServicesService) {}
  ngOnInit(): void {
    this.getService();
  }

  onSubmit(){
    var body = {
      type: this.firstFormGroup.value.type,
      EventName: this.secondFormGroup.value.EventName,
      Adresse: this.secondFormGroup.value.Adresse,
      Description: this.secondFormGroup.value.Description,
      DateDebut: this.secondFormGroup.value.DateDebut,
      DateFin:this.secondFormGroup.value.DateFin,
      
    };
    this.service.AddEvent(body).subscribe()

  }

  MyServices;
  getService(){
    this.myServiceService.getServices().subscribe(
      res =>{
        this.MyServices = res;
      },
      err =>{
        console.log(err);
      }

    );
  }
}
