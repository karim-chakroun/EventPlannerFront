import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly BaseURI = 'https://localhost:7164/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Adresse:[''],
    AboutMe:[''],
    Birthday:[''],
    PhoneNumber: [''],
    Role:[''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      PhoneNumber: this.formModel.value.PhoneNumber,
      Password: this.formModel.value.Passwords.Password,
      Role:this.formModel.value.Role,
      adresse:"test"
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData){
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile(){
    
    return this.http.get(this.BaseURI+ '/UserProfile');
  }

  getUserById(idUser){
    
    return this.http.get(this.BaseURI+ '/UserProfile/'+idUser);
  }

  getUserByName(name){
    return this.http.get(this.BaseURI+ '/UserProfile/GetUsersByUsername?username='+name);

  }

  putUserImage(path){
    var body = {
      image:path
    };
    return this.http.put(this.BaseURI+ '/UserProfile',body);
  }



  roleMatch(allowedRoles): boolean{
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element =>{
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  EditCandidat() {
    var body = {
      

      userName: this.formModel.value.UserName,
      fullName: this.formModel.value.FullName,
      adresse: this.formModel.value.Adresse,
      aboutMe: this.formModel.value.AboutMe,
      birthday: this.formModel.value.Birthday,
      
      email : this.formModel.value.Email,

      phoneNumber : this.formModel.value.PhoneNumber,
 
      


    };
    return this.http.put(this.BaseURI + '/UserProfile/EditUser', body);
  }
}
