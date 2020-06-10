import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutingModule } from './app.routing'
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-alerts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './_shared/header/header.component';
import { AvatarModule } from 'ngx-avatar';
import { UsersService } from './_services/users/users.service';
import { MatBadgeModule } from '@angular/material/badge';
import { UserListComponent } from './home/user-list/user-list.component';
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { UserEditComponent } from './home/user-edit/user-edit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    UserListComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot({ maxMessages: 1, timeout: 4000, position: 'right' }),
    BrowserAnimationsModule,
    AvatarModule,
    MatBadgeModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
