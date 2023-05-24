import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddServicesComponent } from '../add-services/add-services.component';
import { MyServicesService } from '../shared/my-services.service';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit{
  constructor(private service : MyServicesService,
    private dialog: MatDialog,
    ){ }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  

  displayedColumns: string[] = ['serviceName', 'description', 'avalable', 'promotion', 'type','prix','image','video'];
  dataSource: any;
  empdata: any;
  MyServices;
  ngOnInit(): void {

    this.service.getServices().subscribe(
      res =>{
        this.MyServices = res;

        this.dataSource = new MatTableDataSource<any>(this.MyServices);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      err =>{
        console.log(err);
      }

    );
    
  }

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7164/${serverPath}`; 
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddServicesComponent, {
      //width: '500',
      //height: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

}
