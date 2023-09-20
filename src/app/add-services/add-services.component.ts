import { Component, OnInit } from '@angular/core';
import { MyServicesService } from '../shared/my-services.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {

  constructor(public service: MyServicesService,
    private userService:UserService,
  ) { }

  response: {dbPath: ''};

  ngOnInit(): void {

    this.userProfile();
  }

  userDetails;
  userProfile(){
    if(localStorage.getItem('token') != null){

      this.userService.getUserProfile().subscribe(
        res =>{
          this.userDetails = res;
        },
        err =>{
          console.log(err);
        }
      );

    }
  }

  uploadFinished = (event) => { 
    this.response = event; 
    console.log("dbpath"+ this.response.dbPath)
  }

  onSubmit() {
    this.service.AddService(this.response.dbPath,this.userDetails.id).subscribe(
      (res: any) => {
          
          this.service.formModel.reset();
          //this.router.navigateByUrl('/Offres');
          //this.toastr.success('New user created!', 'Registration successful.');
      },
          err => {
            console.log(err);
          }
    );
  }

}
