import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [

  { path: 'accueil', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'registration', component: RegistrationComponent },

  {
    path: 'dashboard',
    component: SidebarComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: 'profile',
    component: SidebarComponent,
    children: [
      { path: '', component: ProfileComponent }
    ]
  },
  {
    path: 'myservices',
    component: SidebarComponent,
    children: [
      { path: '', component: MyServicesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
