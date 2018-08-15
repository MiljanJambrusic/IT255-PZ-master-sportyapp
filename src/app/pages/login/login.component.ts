import { User } from './../../models/user.model';
import { Authentication } from './../../services/authentication';
import { Component, OnInit } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

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
  constructor(private _http: Http, private _router: Router, private _auth: Authentication) { }

  public login() {
    this.errors = [];
    const data = 'korisnickoime=' + this.loginForm.value.korisnickoIme + '&password=' + this.loginForm.value.lozinka;
    this.user = new User("", "", this.loginForm.value.korisnickoIme, this.loginForm.value.lozinka, "", 0);
    this._auth.login(this.user)
      .then((user) => {
        
        this._router.navigateByUrl("home");
        localStorage.setItem('token', user.json().token);
        if (user.json().admin == 1) {
          this._auth.setAdmin(true);
        } else {
          this._auth.setAdmin(false);
        }
        this._auth.setAuth(true);
        location.reload();
      })
      .catch((err) => {
        let obj = JSON.parse(err._body);
        let res = obj.error.split("\\r\\n");
        res.pop();
        res[0] = res[0].substr(1);
        res.forEach(element => {
          this.errors.push(element);
        });
      });

    /*const headers = new Headers();

    console.log(data);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.post('http://localhost/sportyAppPhp/loginservice.php', data, { headers: headers }).subscribe((result) => {
      const obj = JSON.parse(result['_body']);
      console.log(result['_body']);
      localStorage.setItem('token', obj.token);
      this._router.navigateByUrl("home");
      location.reload();
    },
      err => {
        alert(JSON.parse(err._body).error);
      }
    );
    */

  }
  ngOnInit() {
  }

}
