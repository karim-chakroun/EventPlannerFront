import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EventsService } from '../shared/events.service';
import { MyServicesService } from '../shared/my-services.service';
import { UserService } from '../shared/user.service';

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
  ngOnInit(): void {
    this.userProfile();
    this.getServices();
    this.INTERN.setValue('true'); //intern
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
  sum = 0;

  AddServiceChip(idValue, nameValue, prixValue, provider, userId) {
    this.servicesList.push({
      id: idValue,
      name: nameValue,
      prix: prixValue,
      provider: provider,
      userId: userId,
    });

    this.sum = this.sum + prixValue;
  }


  searchResult;
  EbayServices;
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
          this.paginateData();
          this.empty = false;
        },
        err => {
          console.log(err);
        }
      );
    }


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
    for (let SelectedServices of this.servicesList) {
      if (SelectedServices.provider == 'INTERN') {

        this.affectationBody.push({
          serviceFk: SelectedServices.id,
          eventFk: this.item,
          userFk: userId,
          idProvider: SelectedServices.userId
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
    this.eventService.putEventSteps(this.item).subscribe(
    );
    window.location.reload();
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



}
