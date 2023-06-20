import { Component, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';

@Component({
  selector: 'app-global-events',
  templateUrl: './global-events.component.html',
  styleUrls: ['./global-events.component.css']
})
export class GlobalEventsComponent implements OnInit {
  constructor(private eventService:EventsService){}
  ngOnInit(): void {
    this.getGlobalEvents();
    
  }
  events;
  getGlobalEvents() {
    this.eventService.getAllEvents().subscribe(
      res => {
        this.events = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7164/${serverPath}`; 
  }

}
