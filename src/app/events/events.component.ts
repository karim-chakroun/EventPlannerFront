import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventsService } from '../shared/events.service';
import { UserService } from '../shared/user.service';
import dayGridPlugin from '@fullcalendar/daygrid';

import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private service: EventsService,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  title = 'test';
  public setView: View = 'WorkWeek';
  public setDate: Date = new Date();

  //private eventData: DataManager = new DataManager();

  myData: any[] = [{
    Subject: "testing",
    StartTime: new Date(2019, 0, 17, 4, 0),
    EndTime: new Date(2019, 0, 17, 6, 0)
  }];
  public eventObject: EventSettingsModel = {
    dataSource: this.myData
  }




  ngOnInit(): void {
    this.getUserEvents();
    console.log("time" + this.eventObject)

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '50%',
      //height: '100%',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  userDetails
  Events;
  getUserEvents() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        this.service.getUserEvents(this.userDetails.id).subscribe(
          res => {
            this.Events = res;

            for (let e of this.Events) {
              
              this.myData.push({
                Subject: e.eventName,
                StartTime: e.dateDebut,
                EndTime: e.dateFin
              });

            }




          },
          err => {
            console.log(err);
          }

        );
      },
      err => {
        console.log(err);
      }

    );

  }

}
