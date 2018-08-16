import { AdmincompComponent } from './../pages/admincomp/admincomp.component';
import { RegisterComponent } from './../pages/register/register.component';
import { LoginComponent } from './../pages/login/login.component';
import { TeamsComponent } from './../pages/teams/teams.component';
import { EventsComponent } from './../pages/events/events.component';
import { HomeComponent } from './../pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"events",
    component:EventsComponent
  },
  {
    path:"teams",
    component:TeamsComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },{
    path:"admincomp",
    component:AdmincompComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
  
})
export class AppRoutingModule { }
