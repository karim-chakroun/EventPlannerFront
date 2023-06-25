import { Component, OnInit } from '@angular/core';
import { MyServicesService } from '../shared/my-services.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit{

  constructor(private service:MyServicesService,
    private userService:UserService,){

  }
  productSales: any[]
  productSalesMulti: any[]
  Stat:any
  view: any[] = [700, 370];

  showLegend: boolean = true;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = true;

  legendPosition: string = 'below';

  colorScheme:any = {
    domain: ['#4B49AC', '#98BDFF', '#7DA0FA', '#7978E9', '#F3797E']
  };

  ngOnInit(): void {
    this.userProfile();

    
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  userDetails;
  userProfile(){
    if(localStorage.getItem('token') != null){

      this.userService.getUserProfile().subscribe(
        res =>{
          this.userDetails = res;
          this.service.getStats(this.userDetails.id).subscribe(res=>{
            this.Stat=res;
      
            console.log("ddd"+this.Stat.map(i=>i.total));
        });
        },
        err =>{
          console.log(err);
        }
  
      );

    }
  }

}
