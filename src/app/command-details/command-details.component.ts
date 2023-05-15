import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommandService } from '../shared/command.service';

@Component({
  selector: 'app-command-details',
  templateUrl: './command-details.component.html',
  styleUrls: ['./command-details.component.css']
})
export class CommandDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar,
    private service: CommandService,
    public dialogRef: MatDialogRef<CommandDetailsComponent>) { }
  command;
  ngOnInit(): void {
    this.command = this.data.command;
  }

  cancelCommand() {
    this.service.DeleteCommand(this.command.idNotification).subscribe();
    this.dialogRef.close();

  }

}
