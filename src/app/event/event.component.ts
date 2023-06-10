import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EventsService } from '../shared/events.service';
import { MyServicesService } from '../shared/my-services.service';
import { UserService } from '../shared/user.service';

import * as Leaflet from 'leaflet';
import "leaflet-control-geocoder";
//import "leaflet-control-geocoder";

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class EventComponent implements OnInit {
  @Input() item = '';




  //Map

  searchMap = new FormControl('');
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
    this.secondFormGroup.value.secondCtrl = this.address;
    console.log("second from" + this.secondFormGroup.value.secondCtrl);
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

  searchQuery: string;

  async search() {
    this.searchQuery = this.searchMap.value;
    const query = this.searchQuery.trim();
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

  async searchMapEdit() {
    this.searchQuery = this.event.adresse;
    const query = this.searchQuery.trim();
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




  AffectationFormGroup = this._formBuilder.group({
    type: ['', Validators.required],
    EventName: ['', Validators.required],
    Description: ['', Validators.required],
    DateDebut: ['', Validators.required],
    DateFin: ['', Validators.required],

  });
  // define variables to hold the page index and page size
  pageIndex = 0;
  pageSize = 6;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // define a variable to hold the paginated data
  paginatedData: Array<any> = [];

  // handle pagination changes
  onPageChanged(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateData();
  }

  // function to paginate the data
  paginateData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  // function to get filtered and paginated data
  getPaginatedFilteredData() {
    this.filterServices();
    return this.paginatedData;
  }

  categories = new FormControl('');
  INTERN = new FormControl('');
  EBAY = new FormControl('');
  AMAZON = new FormControl('');
  categoryList: string[] = ['Food', 'Accessories', 'Clothes', 'Real estate', 'Hardware', 'Art', 'Books'];
  allServices: any[] = [];
  servicesList: any[] = [];

  constructor(private _formBuilder: FormBuilder,
    private myServiceServices: MyServicesService,
    private userService: UserService,
    private eventService: EventsService,
    private router: Router) { }

  searchForm = new FormControl();
  event;
  sum = 0;
  ngOnInit(): void {
    
    
    
    console.log("item"+this.item)
    this.eventService.getEventById(this.item).subscribe(
      res => {
        this.event = res;
        this.searchMapEdit();

      },
      err => {
        console.log(err);
      }
    );
    this.userProfile();
    this.getServices();
    this.INTERN.setValue('true'); //intern
    if(this.event){
      this.sum = this.event.cout;
    }
    
      
        
      
      
    
    
    //this.paginateData();
  }

  remove(serv): void {
    const index = this.servicesList?.indexOf(serv); // serv


    if (index >= 0) {
      this.servicesList.splice(index, 1);
      this.sum = this.sum - serv.prix;
    }
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  MyServices;
  getServices() {
    this.myServiceServices.getServices().subscribe(
      res => {
        this.MyServices = res;

        this.paginateData();
        //this.MyServices.paginator = this.paginator;
      },
      err => {
        console.log(err);
      }
    );
  }
  

  AddServiceChip(idValue, nameValue, prixValue, provider, userId) {
    this.servicesList.push({
      id: idValue,
      name: nameValue,
      prix: prixValue,
      provider: provider,
      userId: userId,
    });

    this.event.cout = this.event.cout + prixValue;
  }

  shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }


  searchResult;
  EbayServices;
  AmazonServices;
  empty: boolean = false;
  SearchServices(search) {
    this.searchResult = search;
    this.MyServices = null;

    this.getServices();
    if (this.EBAY.value) {
      this.empty = true;
      this.myServiceServices.getEbayServices(search).subscribe(
        res => {
          this.EbayServices = res;
          for (let e of this.EbayServices) {
            this.MyServices.push(e);

          }
          this.shuffleArray(this.MyServices);
          this.paginateData();
          this.empty = false;

        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.AMAZON.value) {
      this.empty = true;
      this.myServiceServices.getAmazonServices(search).subscribe(
        res => {
          this.AmazonServices = res;
          for (let e of this.AmazonServices) {
            this.MyServices.push(e);

          }
          this.shuffleArray(this.MyServices);
          this.paginateData();
          this.empty = false;
        },
        err => {
          console.log(err);
        }
      );
    }

    this.shuffleArray(this.MyServices);


  }

  selectedFilters: string[] = [];

  filterServices() {
    if (this.MyServices) {
      this.filteredData = this.MyServices.filter(service => {
        if (service.provider === 'INTERN') {
          return (this.INTERN.value && (!this.searchResult || Object.values(service).some(val => String(val).toLowerCase().includes(this.searchResult.toLowerCase()))));
        } else {
          return (this.EBAY.value && service.provider === 'EBAY') ||
            (this.AMAZON.value && service.provider === 'AMAZON');
        }
      });
      this.paginateData();
    }
  }


  // define a variable to hold the filtered data
  filteredData: Array<any> = [];


  affectationBody: any[] = [];
  ExternAffectationBody: any[] = [];
  AffectServicesToEvent(userId) {
    var body = {
      adresse: this.secondFormGroup.value.secondCtrl,
      cout: this.event.cout,
      image: this.response.dbPath,
    };
    for (let SelectedServices of this.servicesList) {
      if (SelectedServices.provider == 'INTERN') {

        this.affectationBody.push({
          serviceFk: SelectedServices.id,
          eventFk: this.item,
          userFk: userId,
          idProvider: SelectedServices.userId,
          
        })
      }
      else {
        this.ExternAffectationBody.push({
          serviceName: SelectedServices.name,
          lien: 'www.ebay.com',
          provider: SelectedServices.provider,
          eventFk: this.item
        })

      }

    }

    this.myServiceServices.AffectServiceToEvent(this.affectationBody).subscribe(
    );
    this.myServiceServices.AffectExternServiceToEvent(this.ExternAffectationBody).subscribe(
    );
    this.eventService.putEventSteps(this.item, body).subscribe(
    );
    //window.location.reload();
  }

  userDetails;
  userProfile() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }

    );

  }

  //upload image
  response: { dbPath: '' };
  uploadFinished = (event) => {
    this.response = event;
    console.log("dbpath" + this.response.dbPath)
  }



}
