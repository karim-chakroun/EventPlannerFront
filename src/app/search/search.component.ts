import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service: UserService,
    private ac:ActivatedRoute,){}

  ngOnInit(): void {
    this.getUserByName();
  }

  myParam;
  users;
  getUserByName(){
    this.ac.paramMap.subscribe(
      res=>{
        this.myParam=(res.get('id')),
        this.service.getUserByName(this.myParam).subscribe(
          res=>this.users=res
          )});
  }

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7164/${serverPath}`; 
  }

}
