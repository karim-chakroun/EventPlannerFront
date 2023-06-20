import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router,
    public service: UserService,) { }
    panelOpenState = false;

    searchName = new FormControl('');
  ngOnInit(): void {

  }
  private dashboardUrls = [
    "/client-details",
    "/lgd",
    "/oil-forecast",
    "/portfolio-overview"
  ];

  isDashboard() {
    return this.dashboardUrls.indexOf(this.router.url) !== -1
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  search(){
    this.router.navigate(['/search/'+this.searchName.value]);
  }

}
