import { Authentication } from './../../services/authentication';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { ApiService } from 'src/app/services/api.service';


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

  constructor(private api: ApiService, private _router: Router, private _auth: Authentication) { }

  ngOnInit() {
  }

  public register() {

    let korisnik: User = new User(this.registerForm.value.imeKorisnika, this.registerForm.value.prezimeKorisnika, this.registerForm.value.korisnickoIme, this.registerForm.value.password,this.registerForm.value.emailAdresa);

    this.api.post('register', korisnik).then((result) => {
      this._router.navigateByUrl('login');
    },
      err => {
        console.log("greska u registraciji");
      }
    );
  }

}



