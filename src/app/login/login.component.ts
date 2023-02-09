import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:UserService,private router:Router,private snackBar: MatSnackBar) { }
  

  formModel={
    userName: '',
    password: ''
  }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
    this.router.navigateByUrl('/accueil');
  }

  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any)=>{

        this.snackBar.open("connected", "welcom!");
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/accueil');

      },
      err=>{
        this.snackBar.open("wrong password", "try again");
      }

    );
    
  }

}
