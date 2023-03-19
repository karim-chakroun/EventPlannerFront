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

  displayedColumns: string[] = ['service', 'dateNotif', 'user', 'event', 'content','action'];
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

}
