import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,){}
  eventId;
  ngOnInit(): void {
    this.eventId = this.data.id;
  }

}
