import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private service:UserService) { }
  userDetails;
  ngOnInit(): void {
    if(localStorage.getItem('token') != null){

      this.service.getUserProfile().subscribe(
        res =>{
          this.userDetails = res;
        },
        err =>{
          console.log(err);
        }
  
      );

    }
    
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
