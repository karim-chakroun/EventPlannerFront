import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { EventsService } from '../shared/events.service';
import { MyServicesService } from '../shared/my-services.service';
import { Router } from '@angular/router';
import { EventsComponent } from '../events/events.component';
import { MatDialogRef } from '@angular/material/dialog';

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



  firstFormGroup = this._formBuilder.group({
    type: ['', Validators.required],
    EventName: ['', Validators.required],
    Description: ['', Validators.required],
    DateDebut: ['', Validators.required],
    DateFin: ['', Validators.required],
  
  });
  constructor(private _formBuilder: FormBuilder,
    private service:EventsService,
    private router:Router,
    public dialogRef: MatDialogRef<EventsComponent>,) {}
  ngOnInit(): void {
    
  }

  MyEvent;
  onSubmit(){
    var body = {
      type: this.firstFormGroup.value.type,
      EventName: this.firstFormGroup.value.EventName,
      Description: this.firstFormGroup.value.Description,
      DateDebut: this.firstFormGroup.value.DateDebut,
      DateFin:this.firstFormGroup.value.DateFin,
      
    };
    this.service.AddEvent(body).subscribe(
      res =>{
        this.MyEvent = res;
        this.router.navigateByUrl('/event/'+this.MyEvent.idEvent);
        this.dialogRef.close();
      }
    )
  }
}
