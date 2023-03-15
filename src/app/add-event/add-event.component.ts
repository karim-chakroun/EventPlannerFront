import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { EventsService } from '../shared/events.service';
import { MyServicesService } from '../shared/my-services.service';
import { Router } from '@angular/router';
import { EventsComponent } from '../events/events.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../shared/user.service';

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
    private userService:UserService,
    private router:Router,
    public dialogRef: MatDialogRef<EventsComponent>,) {}
  ngOnInit(): void {
    this.userProfile();
    
  }

  MyEvent;
  onSubmit(userId){
    var body = {
      type: this.firstFormGroup.value.type,
      EventName: this.firstFormGroup.value.EventName,
      Description: this.firstFormGroup.value.Description,
      DateDebut: this.firstFormGroup.value.DateDebut,
      DateFin:this.firstFormGroup.value.DateFin,
      UserId:userId
      
    };
    this.service.AddEvent(body).subscribe(
      res =>{
        this.MyEvent = res;
        this.router.navigateByUrl('/eventPage/'+this.MyEvent.idEvent);
        this.dialogRef.close();
      }
    )
  }

  userDetails;
  userProfile(){
    if(localStorage.getItem('token') != null){

      this.userService.getUserProfile().subscribe(
        res =>{
          this.userDetails = res;
        },
        err =>{
          console.log(err);
        }
  
      );

    }
  }
}
