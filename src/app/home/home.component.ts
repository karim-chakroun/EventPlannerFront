import { Component, OnInit } from '@angular/core';
import { MyServicesService } from '../shared/my-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private myServiceServices:MyServicesService,
    private router:Router){

  }

  MyServices;
  getLatestServices() {
    this.myServiceServices.getLatestServices().subscribe(
      res => {
        this.MyServices = res;

        
        //this.MyServices.paginator = this.paginator;
      },
      err => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    if(localStorage.getItem('token') != null){

      this.router.navigateByUrl('/dashboard');
    }
    this.getLatestServices();
  }



}
