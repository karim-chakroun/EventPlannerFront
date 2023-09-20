import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommandService } from '../shared/command.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {

  constructor(private service: CommandService,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  displayedColumns: string[] = ['service', 'dateNotif', 'user', 'event', 'State', 'content'];
  dataSource: any;
  empdata: any;
  MyServices;
  userId;
  ngOnInit(): void {
    this.userProfile();
    this.getUserCommands();

  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  getUserCommands() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        this.service.getUserCommands(this.userDetails.id).subscribe(
          res => {
            this.MyServices = res;

            this.dataSource = new MatTableDataSource<any>(this.MyServices);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

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

  userDetails;

  userProfile() {
    if (localStorage.getItem('token') != null) {

      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res;
        },
        err => {
          console.log(err);
        }

      );

    }
  }

  stateRejected(id, sender) {
    const confirmation = confirm("Are you sure to reject this order? ");
    if (confirmation) {
      // rest of your code
      this.service.changeStateAndClose(id, 'Rejected').subscribe(
        res => {
          this.service.EmailService(sender, 'Rejected', 'we are sorry, your order is rejected.').subscribe();
          this.getUserCommands();
        },
        err => {
          console.log(err);
        }
      );
    }


  }
  stateInPorgress(id, sender) {
    const confirmation = confirm("Confirm state in progress? ");
    if (confirmation) {
      this.service.changeState(id, 'In porgress').subscribe(
        res => {
          this.service.EmailService(sender, 'In porgress', 'Your order is in progress').subscribe();
          this.getUserCommands();
        },
        err => {
          console.log(err);
        }
      );
    }

  }
  stateDone(id, sender) {
    const confirmation = confirm("Confirm this order? ");
    if (confirmation) {
      this.service.changeStateAndClose(id, 'Done').subscribe(
        res => {
          this.service.EmailService(sender, 'Order ready', 'Your order is in ready').subscribe();
          this.getUserCommands();
        },
        err => {
          console.log(err);
        }
      );
    }

  }

}
