import { Authentication } from './services/authentication';
import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private _auth: Authentication,private api: ApiService, private tokenService: TokenStorageService) { };
  
  
  public onLogOut() {
    this._auth.setAuth(false);
    this._auth.setAdmin(false);
    this.tokenService.signOut();
  }
}


