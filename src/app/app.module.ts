import { Authentication } from './services/authentication';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdmincompComponent } from './pages/admincomp/admincomp.component';
import { FilterterminPipe } from './pipes/filtertermin.pipe';
import { FilterdanPipe } from './pipes/filterdan.pipe';
import { ApiService } from './services/api.service';
import { httpInterceptorProviders } from './services/auth-interceptor.service';
import { TokenStorageService } from './services/token-storage.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    TeamsComponent,
    LoginComponent,
    RegisterComponent,
    AdmincompComponent,
    FilterterminPipe,
    FilterdanPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [Authentication, ApiService, httpInterceptorProviders, TokenStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
