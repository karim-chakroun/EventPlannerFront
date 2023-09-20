import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { FeedbackService } from '../shared/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadProfileImgComponent } from '../upload-profile-img/upload-profile-img.component';
import { MessagesService } from '../shared/messages.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit{

  constructor(private router:Router,
    private service:UserService,
    private ac:ActivatedRoute,
    private messageService:MessagesService,
    public feedbackService:FeedbackService,
    private dialog: MatDialog) { }
  userDetails;
  posterDetails;

  //image
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  myParam;
  ngOnInit(): void {
    


    this.ac.paramMap.subscribe(
      res=>{
        this.myParam=(res.get('id')),
        this.getUserById(this.myParam)
       });
       this.userProfile();
    
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

  PosterList:any=[]

  getUserById(id){
    this.service.getUserById(id).subscribe(
      res =>{
        this.userDetails = res;
        for (let u of this.userDetails.feedbacks) {
          this.getPosterById(u.idPoster)
          console.log('poster by id'+u.id)
          
        }
      },
      err =>{
        console.log(err);
      }

    );

  }
connectedUser;

userProfile(){
  if(localStorage.getItem('token') != null){

    this.service.getUserProfile().subscribe(
      res =>{
        this.connectedUser = res;
      },
      err =>{
        console.log(err);
      }

    );

  }
}


  getPosterById(id){
    this.service.getUserById(id).subscribe(
      res =>{
        this.posterDetails = res;
      },
      err =>{
        console.log(err);
      }

    );

  }

  addPost(PosterId,ReceiverId,fullname,image){
    this.feedbackService.addFeedback(PosterId,ReceiverId,fullname,image).subscribe(
      (res: any) => {
          
          this.feedbackService.formModel.reset();
          this.ngOnInit();
          
          //this.router.navigateByUrl('/Offres');
          //this.toastr.success('New user created!', 'Registration successful.');
      },
          err => {
            console.log(err);
          }
    );

  }
  conversation;

  addConversation(){
    var body = {
      senderId: this.connectedUser.id,
      senderName: this.connectedUser.fullName,
      receiverId:this.userDetails.id,
      receiverName:this.userDetails.fullName

   
      
    };
    this.messageService.AddConversation(body,this.userDetails.id).subscribe(
      res =>{
        this.conversation=res
        this.router.navigateByUrl('messages/'+this.conversation.messageId)
      
      }
    )
  }

}
