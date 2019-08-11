import { User } from './../../models/user.model';
import { Authentication } from './../../services/authentication';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public errors: string[] = [];
  public loginForm = new FormGroup({
    korisnickoIme: new FormControl(),
    lozinka: new FormControl()
  });

  private user: User;
  constructor(private api: ApiService, private _router: Router, private _auth: Authentication, private tokenStorage: TokenStorageService) { }

  public login() {
    this.errors = [];

    this.user = new User("", "", this.loginForm.value.korisnickoIme, this.loginForm.value.lozinka, "");
    this._auth.login(this.user)
      .then((user) => {
        
        this._router.navigateByUrl("home");
        this.tokenStorage.saveToken(user.accessToken);
        this.tokenStorage.saveUsername(user.email);
        
        this._auth.setAuth(true);

        if (user.authorities.some(x => x.authority === 'ADMIN')) {
          this._auth.setAdmin(true);
        } else {
          this._auth.setAdmin(false);
        }
        this._auth.setAuth(true);
      })
      .catch((err) => {
        console.log("Pogresan username ili password");
      });

  }
  ngOnInit() {
  }

}
