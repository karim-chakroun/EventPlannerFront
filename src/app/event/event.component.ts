import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyServicesService } from '../shared/my-services.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class EventComponent implements OnInit {

  fruits: any[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];
  constructor(private _formBuilder: FormBuilder,
    private myServiceServices : MyServicesService,) {}
  ngOnInit(): void {
    this.getServices();
  }

  remove(fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  MyServices;
  getServices(){
    this.myServiceServices.getServices().subscribe(
      res =>{
        this.MyServices = res;
      },
      err =>{
        console.log(err);
      }
    );
  }

}
