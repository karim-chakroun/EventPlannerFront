import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadProfileImgComponent } from '../upload-profile-img/upload-profile-img.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private router:Router,
    private service:UserService,
    private dialog: MatDialog) { }
  userDetails;

  //image
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
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

  openDialog(user) {

    const dialogRef =  this.dialog.open(UploadProfileImgComponent, {
      width: '50%',
      height:'25%',
      
      data: { user: user}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7164/${serverPath}`; 
  }

  

}
