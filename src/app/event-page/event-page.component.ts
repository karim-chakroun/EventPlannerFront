import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../shared/events.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  constructor(private ac:ActivatedRoute,
    private eventService: EventsService,){
  }
  myParam;
  ngOnInit(): void {
    
    this.myParam= this.ac.snapshot.params['id'];
    this.getEventById();
    //this.checkSteps();
  }

  event;
  getEventById() {
    this.eventService.getEventById(this.myParam).subscribe(
      res => {
        this.event = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  /*
  stepsDone:boolean=false;
  checkSteps(){
    for (let e of this.event) {
      if (e.stepsDone) {
        this.stepsDone=true
      }
      
    }
  }*/


}
