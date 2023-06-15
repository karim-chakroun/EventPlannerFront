import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands/commands.component';
import { EventPageComponent } from './event-page/event-page.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { SearchComponent } from './search/search.component';
import { ProfilesComponent } from './profiles/profiles.component';

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
    path: 'providerDashboard',
    component: SidebarComponent,
    children: [
      { path: '', component: ProviderDashboardComponent }
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
  {
    path: 'commands',
    component: SidebarComponent,
    children: [
      { path: '', component: CommandsComponent }
    ]
  },
  {
    path: 'myevents',
    component: SidebarComponent,
    children: [
      { path: '', component: EventsComponent }
    ]
  },
  {
    path: 'event/:id',
    component: SidebarComponent,
    children: [
      { path: '', component: EventComponent }
    ]
  },
  {
    path: 'user/:id',
    component: SidebarComponent,
    children: [
      { path: '', component: ProfilesComponent }
    ]
  },
  {
    path: 'search/:id',
    component: SidebarComponent,
    children: [
      { path: '', component: SearchComponent }
    ]
  },
  {
    path: 'eventPage/:id',
    component: SidebarComponent,
    children: [
      { path: '', component: EventPageComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
