import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserService } from './shared/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import {MatRadioModule} from '@angular/material/radio';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MyServicesComponent } from './my-services/my-services.component';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddServicesComponent } from './add-services/add-services.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EventsComponent } from './events/events.component';

import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { AddEventComponent } from './add-event/add-event.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { EventComponent } from './event/event.component';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EventPageComponent } from './event-page/event-page.component';
import { CommandsComponent } from './commands/commands.component';

import { FullCalendarModule } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AngularOpenlayersModule } from 'ngx-openlayers';
import { CommandDetailsComponent } from './command-details/command-details.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { RequesterDashboardComponent } from './requester-dashboard/requester-dashboard.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UploadComponent } from './upload/upload.component';
import { UploadProfileImgComponent } from './upload-profile-img/upload-profile-img.component';
import { SearchComponent } from './search/search.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { AddCommandComponent } from './add-command/add-command.component';
import { GlobalEventsComponent } from './global-events/global-events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ChatComponent } from './chat/chat.component';
import { MessagesComponent } from './messages/messages.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    SidebarComponent,
    MyServicesComponent,
    AddServicesComponent,
    EventsComponent,
    AddEventComponent,
    EventComponent,
    EventPageComponent,
    CommandsComponent,
    CommandDetailsComponent,
    EditEventComponent,
    ProviderDashboardComponent,
    RequesterDashboardComponent,
    UploadComponent,
    UploadProfileImgComponent,
    SearchComponent,
    ProfilesComponent,
    AddCommandComponent,
    GlobalEventsComponent,
    EventDetailsComponent,
    ChatComponent,
    MessagesComponent,
    EditProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDialogModule,

    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatExpansionModule,

    ScheduleModule,RecurrenceEditorModule,
    FullCalendarModule,
    LeafletModule,
    AngularOpenlayersModule,
    NgxChartsModule,
    IonicModule.forRoot()
  ],
  providers: [
    DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService,
    UserService, {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
