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
import { GlobalEventsComponent } from './global-events/global-events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ChatComponent } from './chat/chat.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth/auth.guard';
import { RequesterDashboardComponent } from './requester-dashboard/requester-dashboard.component';

const routes: Routes = [


  {path:'',redirectTo:'home',pathMatch:'full'},
  {
    path: 'home',
    component: HeaderComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  
  { path: 'registration', component: RegistrationComponent },

  {
    path: 'dashboard',
    component: SidebarComponent,
    children: [
      { path: '', component: HomeComponent,canActivate:[AuthGuard] }
    ]
  },
  {
    path: 'providerDashboard',
    component: SidebarComponent,
    children: [
      { path: '', component: ProviderDashboardComponent,canActivate:[AuthGuard],data :{permittedRoles:['FOURNISSEUR'] } }
    ]
  },
  {
    path: 'requesterDashboard',
    component: SidebarComponent,
    children: [
      { path: '', component: RequesterDashboardComponent,canActivate:[AuthGuard],data :{permittedRoles:['DEMANDEUR'] } }
    ]
  },
  {
    path: 'profile',
    component: SidebarComponent,
    children: [
      { path: '', component: ProfileComponent,canActivate:[AuthGuard] }
    ]
  },
  {
    path: 'myservices',
    component: SidebarComponent,
    children: [
      { path: '', component: MyServicesComponent,canActivate:[AuthGuard],data :{permittedRoles:['FOURNISSEUR'] } }
    ]
  },
  {
    path: 'commands',
    component: SidebarComponent,
    children: [
      { path: '', component: CommandsComponent,canActivate:[AuthGuard],data :{permittedRoles:['FOURNISSEUR'] } }
    ]
  },
  {
    path: 'myevents',
    component: SidebarComponent,
    children: [
      { path: '', component: EventsComponent,canActivate:[AuthGuard],data :{permittedRoles:['DEMANDEUR'] } }
    ]
  },
  {
    path: 'event/:id',
    component: SidebarComponent,
    children: [
      { path: '', component: EventComponent,canActivate:[AuthGuard],data :{permittedRoles:['DEMANDEUR'] } }
    ]
  },
  {
    path: 'user/:id',
    component: SidebarComponent,
    children: [
      { path: '', component: ProfilesComponent,canActivate:[AuthGuard] }
    ]
  },
  {
    path: 'search/:id',
    component: SidebarComponent,
    children: [
      { path: '', component: SearchComponent,canActivate:[AuthGuard] }
    ]
  },
  {
    path: 'eventPage/:id',
    component: SidebarComponent,
    children: [
      { path: '', component: EventPageComponent,canActivate:[AuthGuard],data :{permittedRoles:['DEMANDEUR'] } }
    ]
  },
  {
    path: 'eventDetails/:id',
    component: SidebarComponent,
    children: [
      { path: '', component: EventDetailsComponent,canActivate:[AuthGuard],data :{permittedRoles:['DEMANDEUR'] } }
    ]
  },
  {
    path: 'globalEvents',
    component: SidebarComponent,
    children: [
      { path: '', component: GlobalEventsComponent,canActivate:[AuthGuard] }
    ]
  },
  {
    path: 'global-Events',
    component: HeaderComponent,
    children: [
      { path: '', component: GlobalEventsComponent }
    ]
  },
  {
    path: 'chat',
    component: SidebarComponent,
    children: [
      { path: '', component: ChatComponent,canActivate:[AuthGuard] }
    ]
  },
  {
    path: 'messages',
    component: SidebarComponent,
    children: [
      { path: '', component: MessagesComponent,canActivate:[AuthGuard] }
    ]
  },
  {
    path: 'messages/:id',
    component: SidebarComponent,
    children: [
      { path: '', component: MessagesComponent,canActivate:[AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
