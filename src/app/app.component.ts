import { Authentication } from './services/authentication';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private _auth: Authentication) { };
  
  
  public onLogOut() {
    localStorage.removeItem('token');
    this._auth.setAuth(false);
    this._auth.setAdmin(false);
  }
}


