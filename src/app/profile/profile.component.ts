import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadProfileImgComponent } from '../upload-profile-img/upload-profile-img.component';
import { FeedbackService } from '../shared/feedback.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private router:Router,
    private service:UserService,
    public feedbackService:FeedbackService,
    private dialog: MatDialog) { }
  userDetails;
  posterDetails;

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
          for (let u of this.userDetails.feedbacks) {
            this.getUserById(u.idPoster)
            
          }
          
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

  getUserById(id){
    this.service.getUserById(id).subscribe(
      res =>{
        this.posterDetails = res;
      },
      err =>{
        console.log(err);
      }

    );

  }

  addPost(PosterId,ReceiverId){
    this.feedbackService.addFeedback(PosterId,ReceiverId,this.userDetails.fullName,this.userDetails.image).subscribe(
      (res: any) => {
          
          this.feedbackService.formModel.reset();
          this.userProfile();
          //this.router.navigateByUrl('/Offres');
          //this.toastr.success('New user created!', 'Registration successful.');
      },
          err => {
            console.log(err);
          }
    );

  }

  openEdit(user) {

    const dialogRef =  this.dialog.open(EditProfileComponent, {
      //width: '50%',
      height:'75%',
      
      data: { user: user}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }

  

}
