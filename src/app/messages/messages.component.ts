import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MessagesService } from '../shared/messages.service';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(private userService: UserService,
    private messageService: MessagesService) {
      
     }
  userDetails;
  messages;

  ngOnInit(): void {
    this.getMessagesByUser();
    
  }
  getMessagesByUser() {

    if (localStorage.getItem('token') != null) {

      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res;
          this.messageService.getMessagesByUser(this.userDetails.id).subscribe(
            ress => {
              this.messages = ress;


            },
            err => {
              console.log(err);
            }

          );


        },
        err => {
          console.log(err);
        }

      );

    }
  }
  baseUrl;
  message;
  idMessages
  getSingleMessage(messages,idMessages){
    this.baseUrl='https://localhost:7164/chatHub/'+this.idMessages;
    this.message=messages;
    this.idMessages=idMessages;
    console.log("testmsg"+this.idMessages)
    this.msgs=this.message;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7164/chatHub/'+this.idMessages, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    }) // Change the URL to match your backend URL
      .build();

    this.hubConnection.on('ReceiveMessage', (user: string, msg: string) => {
      const receivedMessage = `${user}: ${msg}`;
      
      this.msgs.push({
        idMessage: 'idValue',
        contenu: msg,
        dateMessage: new Date(),
        senderId: user,
      });
      
      console.log("msgs"+this.msgs)
    });

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection:', err));

    

  }



  //websocket
  private hubConnection: signalR.HubConnection;
  msgs: any[] = [];
  user: string;
  msg: string;

  sendMessage() {
    this.hubConnection.invoke('SendMessage', this.userDetails.id, this.msg)
      .catch(err => console.error('Error while sending message:', err));
      this.addMessage(this.userDetails.id,this.msg)

    this.msg = '';
  }

  addMessage(senderId,content){
    var body = {
      contenu:content,
      senderId:senderId 
   
      
    };
    this.messageService.AddMessage(body,this.idMessages).subscribe(
      res =>{
      
      }
    )
  }
  




}
