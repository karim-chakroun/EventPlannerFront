import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../shared/events.service';

import * as Leaflet from 'leaflet'; 
import "leaflet-control-geocoder";
import { MatDialog } from '@angular/material/dialog';
import { CommandDetailsComponent } from '../command-details/command-details.component';
import { EditEventComponent } from '../edit-event/edit-event.component';
//import "leaflet-control-geocoder";

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  constructor(private ac:ActivatedRoute,
    private eventService: EventsService,
    private dialog: MatDialog){
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


//Map


map!: Leaflet.Map;
markers: Leaflet.Marker[] = [];
options = {
  layers: [
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
  ],
  zoom: 16,
  center: { lat: 36.85094112318169, lng: 10.283460764778154 }
};
initialMarkers;

// Initialize the map with markers
initMarkers() {
  this.initialMarkers = [
    {
      position: { lat: 36.85094112318169, lng: 10.283460764778154 },
      draggable: true
    },
  ];
  for (let index = 0; index < this.initialMarkers.length; index++) {
    const data = this.initialMarkers[index];
    const marker = this.generateMarker(data, index);
    marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
    this.map.panTo(data.position);
    this.markers.push(marker);
  }
}

// Generate a marker and attach events
generateMarker(data: any, index: number) {
  return Leaflet.marker(data.position, { draggable: data.draggable })
    .on('click', (event) => this.markerClicked(event, index))
    .on('dragend', (event) => this.markerDragEnd(event, index));
}

// When the map is ready, initialize the markers
onMapReady($event: Leaflet.Map) {
  this.map = $event;
  this.initMarkers();
}
address;
// When the user clicks on the map, add a new marker and get the address
async mapClicked($event: any) {
  console.log($event.latlng.lat, $event.latlng.lng);
  this.address = await this.getAddress($event.latlng.lat, $event.latlng.lng);
  console.log(this.address);
  const data = {
    position: { lat: $event.latlng.lat, lng: $event.latlng.lng },
    draggable: true
  };
  const marker = this.generateMarker(data, this.markers.length - 1);
   // Remove existing markers from the map
   for (const marker of this.markers) {
    this.map.removeLayer(marker);
  }
  marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
  
  this.markers.push(marker);
  console.log(this.address);

}

// When a marker is clicked, log its position
markerClicked($event: any, index: number) {
  console.log($event.latlng.lat, $event.latlng.lng);
}

// When a marker is dragged, log its new position
markerDragEnd($event: any, index: number) {
  console.log($event.target.getLatLng());
}

  getAddress(lat: number, lng: number) {
    const geocoder = (Leaflet.Control as any).Geocoder.nominatim();
    return new Promise((resolve, reject) => {
        geocoder.reverse(
            { lat, lng },
            this.map.getZoom(),
            (results: any) => results.length ? resolve(results[0].name) : reject(null)
        );
    })
  }
  public async getLatLngFromAddress(address: string): Promise<{ lat: number, lng: number }> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length === 0) {
      throw new Error('No results found');
    }
    const result = data[0];
    return { lat: Number(result.lat), lng: Number(result.lon) };
  }
  


async search(searchMap) {
 
  const query = searchMap.trim();
  if (!query) {
    return;
  }
  const { lat, lng } = await this.getLatLngFromAddress(query);
  console.log(lat, lng);
  const data = {
    position: { lat, lng },
    draggable: true
  };
  const marker = this.generateMarker(data, this.markers.length - 1);
   // Remove existing markers from the map
   for (const marker of this.markers) {
    this.map.removeLayer(marker);
  }
  marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
  this.map.panTo(data.position);
  this.markers.push(marker);
}

openDialog(command) {

  const dialogRef =  this.dialog.open(CommandDetailsComponent, {
    //width: '50%',
    
    data: { command: command}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.getEventById();
  });
}

editEvent(id) {

  const dialogRef =  this.dialog.open(EditEventComponent, {
    height: '90%',
    
    data: { id: id}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.getEventById();
  });
}

public createImgPath = (serverPath: string) => { 
  return `https://localhost:7164/${serverPath}`; 
}


}
