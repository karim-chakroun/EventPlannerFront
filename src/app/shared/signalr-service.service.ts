import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrServiceService {

    private connection: signalR.HubConnection;

    constructor() {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7164/chathub',{
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .build();
    }
  
    public startConnection(): Promise<void> {
      return this.connection.start();
    }
  
    public sendMessage(chatId: string, user: string, message: string): Promise<void> {
      return this.connection.invoke('SendMessage', chatId, user, message);
    }
  
    public joinChat(chatId: string): Promise<void> {
      return this.connection.invoke('JoinChat', chatId);
    }
  
    public leaveChat(chatId: string): Promise<void> {
      return this.connection.invoke('LeaveChat', chatId);
    }
  
    public onReceiveMessage(callback: (user: string, message: string) => void): void {
      this.connection.on('ReceiveMessage', callback);
    }
}
