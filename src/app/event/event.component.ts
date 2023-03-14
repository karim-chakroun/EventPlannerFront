import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MyServicesService } from '../shared/my-services.service';

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
    private myServiceServices: MyServicesService,) { }

  searchForm = new FormControl();
  ngOnInit(): void {
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

  AddServiceChip(idValue, nameValue, prixValue) {
    this.servicesList.push({
      id: idValue,
      name: nameValue,
      prix: prixValue,
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


  // define a variable to hold the filtered data
  filteredData: Array<any> = [];



  sumCost() {

  }

}
