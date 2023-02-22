import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventsService } from '../shared/events.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  constructor(private service : EventsService,
    private dialog: MatDialog,
    ){ }

  ngOnInit(): void {
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '100%',
      height: '100%',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

}
