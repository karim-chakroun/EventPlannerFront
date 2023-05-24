import { Component, OnInit } from '@angular/core';
import { MyServicesService } from '../shared/my-services.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {

  constructor(public service: MyServicesService,
  ) { }

  response: {dbPath: ''};

  ngOnInit(): void {

  }

  uploadFinished = (event) => { 
    this.response = event; 
    console.log("dbpath"+ this.response.dbPath)
  }

  onSubmit() {
    this.service.AddService(this.response.dbPath).subscribe(
      (res: any) => {
          
          this.service.formModel.reset();
          //this.router.navigateByUrl('/Offres');
          //this.toastr.success('New user created!', 'Registration successful.');
      },
          err => {
            console.log(err);
          }
    );
  }

}
