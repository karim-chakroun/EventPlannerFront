import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventsService } from '../shared/events.service';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  constructor(private service : EventsService,
    private userService : UserService,
    private dialog: MatDialog,
    ){ }

  ngOnInit(): void {
    this.getUserEvents();
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
  getUserEvents(){
    this.userService.getUserProfile().subscribe(
      res =>{
        this.userDetails = res;
        this.service.getUserEvents(this.userDetails.id).subscribe(
          res =>{
            this.Events = res;
          },
          err =>{
            console.log(err);
          }
    
        );
      },
      err =>{
        console.log(err);
      }

    );
    
  }

}
