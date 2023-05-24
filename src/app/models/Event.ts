export class Event {
    type: string;
    eventName: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    userId: number;
    adresse:string;
    cout:number;
    notifications: [
      {
        idNotification: string,
        content: string,
        dateNotif: Date
      }
    ]
  }
  