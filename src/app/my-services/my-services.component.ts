import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddServicesComponent } from '../add-services/add-services.component';
import { MyServicesService } from '../shared/my-services.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit{
  constructor(private service : MyServicesService,
    private dialog: MatDialog,
    private userService:UserService,
    ){ }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  

  displayedColumns: string[] = ['serviceName', 'description', 'avalable', 'promotion', 'type','prix','image','action'];
  dataSource: any;
  empdata: any;
  MyServices;
  ngOnInit(): void {

    this.userProfile();

    
    
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

  userDetails;
  userProfile(){
    if(localStorage.getItem('token') != null){

      this.userService.getUserProfile().subscribe(
        res =>{
          this.userDetails = res;

          this.service.getUserServices(this.userDetails.id).subscribe(
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
        },
        err =>{
          console.log(err);
        }
      );

    }
  }

  DeleteService(id){
    this.service.deleteService(id).subscribe(
      res =>{
        this.MyServices = res;
        this.ngOnInit();

       

      },
      err =>{
        console.log(err);
      }
    );
  }

}
