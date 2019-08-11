import { Timovi } from './../../models/timovi.model';
import { FilterdanPipe } from './../../pipes/filterdan.pipe';
import { FilterterminPipe } from './../../pipes/filtertermin.pipe';
import { LoginComponent } from './../login/login.component';
import { Termin } from './../../models/termin.model';
import { Datum } from './../../models/datum.model';
import { Authentication } from './../../services/authentication';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public zabranjenitermini: Termin[] = [];
  public mesecc: string;
  public dan: number = 31;

  public dani: any = [];
  public modeldan: number;
  public timovikreatora: Timovi[] = [];
  public modelsat = "";
  public sati: any = [];
  public modeltim: string = "";
  termini: Termin[];
  public istina: boolean = false;
  public mogucisati: string[] = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
  public dozvoljenitermini: string[] = this.mogucisati;
  public ok: boolean = false;

  datumi: Datum[] = [
    { mesec: "Januar", dan: 31 },
    { mesec: "Februar", dan: 28 },
    { mesec: "Mart", dan: 30 },
    { mesec: "April", dan: 30 },
    { mesec: "Maj", dan: 31 },
    { mesec: "Jun", dan: 30 },
    { mesec: "Jul", dan: 31 },
    { mesec: "Avgust", dan: 31 },
    { mesec: "Septembar", dan: 30 },
    { mesec: "Oktobar", dan: 31 },
    { mesec: "Novembar", dan: 30 },
    { mesec: "Decembar", dan: 31 }
  ];

  public promeniok() {
    this.ok = false;
  }



  constructor(private api: ApiService, private _router: Router, private _auth: Authentication) { }



  ngOnInit() {

    this.mesecc = "";
    this.dani = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];


    // this._http.get('http://localhost/sportyAppPhp/getzabranjenitermini.php', { headers: headers })
    //   .subscribe(data => {
    //     this.zabranjenitermini = JSON.parse(data['_body']).termini;
    //   }
    //     , err => {
    //       alert(JSON.parse(err._body).error);
    //     }
    //   );
    this.prikupitimove();
  }




  //prikupljanje timova
  public prikupitimove() {

    // this._http.get('http://localhost/sportyAppPhp/gettimove.php', { headers: headers })
    //   .subscribe(data => {
    //     let skuptimova: Timovi[] = [];
    //     skuptimova = JSON.parse(data['_body']).skuptimova;
    //     for (let i = 0; i < skuptimova.length; i++) {
    //       if (skuptimova[i].kreator == this._auth.getUsername()) {
    //         this.timovikreatora.push(skuptimova[i]);
    //       }
    //     }
    //   }, err => {
    //     alert(JSON.parse(err._body).error);
    //   }
    //   );

  }

  public slobodniTermin() {
    this.modelsat = "";
    this.dozvoljenitermini = [];
    for (let termin of this.mogucisati) {
      this.dozvoljenitermini.push(termin);
    }
    for (let i = 0; i < this.zabranjenitermini.length; i++) {
      for (let j = 0; j < this.dozvoljenitermini.length; j++) {
        if (this.zabranjenitermini[i].sat == this.dozvoljenitermini[j] && this.zabranjenitermini[i].mesec == this.mesecc && this.zabranjenitermini[i].dan == this.modeldan) {
          this.dozvoljenitermini.splice(j, 1);
          j--;
        }
      }
    }


  }

  public kreirajdogadjaj() {
    let data = "tim1=" + this.modeltim + "&tim2=" + "" + "&mesec=" + this.mesecc + "&dan=" + this.modeldan + "&sat=" + this.modelsat + "&status=" + 0 + "&kreator=" + this._auth.getUsername();
    this.istina = false;
    if (this.modeldan == null || this.modelsat == "" || this.mesecc == "") {
      this.istina = true;
    } else {
      this.istina = false;
      this.ok = true;
      this.modeldan == null;
      this.modelsat == "";
      this.mesecc == "";

      // this._http.post('http://localhost/sportyAppPhp/napravidogadjaj.php', data, { headers: headers }).subscribe((result) => {
      // },
      //   err => {
      //     console.log("greška prilikom pravljenja novog događaja");
      //   }
      // );
    }

  }

  public proveriMesec() {
    this.dani = [];
    this.modeldan = null;
    this.modelsat = "";
    for (let i = 0; i < 12; i++) {
      if (this.mesecc == this.datumi[i].mesec) {
        this.dan = this.datumi[i].dan;
      }
    }
    for (let i = 1; i <= this.dan; i++) {
      this.dani[i] = i;
    }
  }


}
