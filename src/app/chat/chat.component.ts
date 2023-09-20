import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SignalrServiceService } from '../shared/signalr-service.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private hubConnection: signalR.HubConnection;
  messages: string[] = [];
  user: string;
  message: string;

  constructor(private service:UserService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7164/chatHub/1', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    }) // Change the URL to match your backend URL
      .build();

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      const receivedMessage = `${user}: ${message}`;
      this.messages.push(receivedMessage);
    });

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection:', err));
  }
  ngOnInit(): void {
    this.userProfile();
  }

  userDetails;
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

  sendMessage() {
    this.hubConnection.invoke('SendMessage', this.user, this.message)
      .catch(err => console.error('Error while sending message:', err));

    this.message = '';
  }
}
