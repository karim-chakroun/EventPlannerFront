import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-upload-profile-img',
  templateUrl: './upload-profile-img.component.html',
  styleUrls: ['./upload-profile-img.component.css']
})
export class UploadProfileImgComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private service:UserService){}
  userDetails;

  //img
  response: {dbPath: ''};
  ngOnInit(): void {
    this.userProfile();
  }

  userProfile(){
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

  uploadFinished = (event) => { 
    this.response = event; 
    console.log("dbpath"+ this.response.dbPath)
  }

  onSubmit() {
    this.service.putUserImage(this.response.dbPath).subscribe(
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
