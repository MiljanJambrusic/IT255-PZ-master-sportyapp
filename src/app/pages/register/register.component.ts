import { Authentication } from './../../services/authentication';
import { Component, OnInit } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public errors: string[] = [];

  public registerForm = new FormGroup({
    imeKorisnika: new FormControl(),
    prezimeKorisnika: new FormControl,
    korisnickoIme: new FormControl(),
    password: new FormControl(),
    emailAdresa: new FormControl()
  });

  constructor(private _http: Http, private _router: Router, private _auth: Authentication) { }

  ngOnInit() {
  }

  public register() {

    let korisnik: User = new User(this.registerForm.value.imeKorisnika, this.registerForm.value.prezimeKorisnika, this.registerForm.value.korisnickoIme, this.registerForm.value.emailAdresa, this.registerForm.value.password, 0);
    let data = 'ime=' + korisnik.ime + '&prezime='+ korisnik.prezime + '&korisnickoime=' + korisnik.korisnickoime + '&password='+korisnik.password + '&email='+korisnik.email + '&privilegije=' +korisnik.privilegije;
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.post('http://localhost/sportyAppPhp/registerservice.php', data, { headers: headers }).subscribe((result) => {
      const obj = JSON.parse(result['_body']);
      this._router.navigateByUrl('login');
    },
      err => {
        console.log("greska u registraciji");
      }
    );
  }

}



