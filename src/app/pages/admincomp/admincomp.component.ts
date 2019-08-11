import { TerminFul } from './../../models/terminful.model';
import { FilterdanPipe } from './../../pipes/filterdan.pipe';
import { FilterterminPipe } from './../../pipes/filtertermin.pipe';
import { Component, OnInit } from '@angular/core';
import { Termin } from '../../models/termin.model';
import { Datum } from '../../models/datum.model';
import { Authentication } from './../../services/authentication';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { empty } from '../../../../node_modules/rxjs';
import { Event } from '../../models/event.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-admincomp',
  templateUrl: './admincomp.component.html',
  styleUrls: ['./admincomp.component.scss']
})
export class AdmincompComponent implements OnInit {

  public data122: Termin[] = [];
  public terminful1: TerminFul[] = [];
  public mesecc: string;
  public dan: number = 31;
  public svidogadjaji: Event[] = [];
  public dani: any = [];
  public modeldan: number;
  public zabranjenitermini: Termin[] = [];
  public sati: any = [];
  termini: Termin[];

  public istina: boolean;

  public mogucisati: string[] = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
  public dozvoljenitermini: string[] = this.mogucisati;
  public sportovi: string[] = ["Fudbal", "Odbojka", "Tenis"];
  public modelsat: string;
  public modelsport: string;
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
  constructor(private api:ApiService, private _router: Router, private _auth: Authentication) { }

  ngOnInit() {
    this.mesecc = "";

    this.dani = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    

    // this._http.get('http://localhost/sportyAppPhp/getzabranjeniterminifull.php', { headers: headers })
    //   .subscribe(data1 => {
    //     this.terminful1 = JSON.parse(data1['_body']).terminiful;
    //   }
    //     , err => {
    //       alert(JSON.parse(err._body).error);
    //     }
    //   );

    // this._http.get('http://localhost/sportyAppPhp/getzabranjenitermini.php', { headers: headers })
    //   .subscribe(data => {
    //     this.zabranjenitermini = JSON.parse(data['_body']).termini;
    //     this.zabranjenitermini = this.zabranjenitermini;
    //   }
    //     , err => {
    //       alert(JSON.parse(err._body).error);
    //     }
    //   );

    //pozivi
    this.preuzmiDogadjaje();
  }



  //Za događaje
  public preuzmiDogadjaje() {
    // this._http.get('http://localhost/sportyAppPhp/getdogadjaje.php', { headers: headers })
    //   .subscribe(data => {
    //     this.svidogadjaji = JSON.parse(data['_body']).dogadjaji;
    //   }
    //     , err => {
    //       alert(JSON.parse(err._body).error);
    //     }
    //   );
  }

  public potvrdidogadjaj(dogadjaj: Event) {
    for(let i=0;i<this.svidogadjaji.length;i++){
      if(this.svidogadjaji[i].id_dog=dogadjaj.id_dog){
        this.svidogadjaji.splice(i,1);
      }
    }
    let data = "id_dog="+dogadjaj.id_dog;
    // this._http.post('http://localhost/sportyAppPhp/updatestatusdogadjaja.php', data, { headers: headers }).subscribe((result) => {
    // },
    //   err => {
    //     console.log("Greška prilikom setovanja drugog imena za tim u eventu.");
    //   }
    // );
  }

  //Dodavanje zabranjenog termina
  public dodajZabranjeniTermin() {
    if (this.modelsat == undefined && this.modelsport == undefined) {
      this.istina = false;
      console.log("Polja su prazna,morate da ispunite polja");
    } else {
      this.data122.push(new Termin(this.modelsport, this.mesecc, this.modeldan, this.modelsat));
      let data1 = 'sport=' + this.modelsport + '&mesec=' + this.mesecc + '&dan=' + this.modeldan + '&sat=' + this.modelsat;
      // this._http.post('http://localhost/sportyAppPhp/postzabranjenitermin.php', data1, { headers: headers }).subscribe((result) => {
      // },
      //   err => {
      //     console.log("greska u slanju zabranjenog termina");
      //   }
      // );
      location.reload();
    }
  }

  public obrisiTerminIzListe() {
    for (let i = 0; i < this.dozvoljenitermini.length; i++) {
      if (this.mesecc == this.data122[i].mesec) {
        if (this.modeldan == this.data122[i].dan) {
          for (let j = 0; j < this.mogucisati.length; j++) {
            if (this.data122[i].sat != this.mogucisati[j]) {
              this.dozvoljenitermini.push(this.mogucisati[j]);
            }
          }
        }
      }
    }
  }
  //Deo za proveru mogućih termina koji mogu da se zabrane
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

  public obrisiTermin(termin: TerminFul) {
    for (let i = 0; i < this.terminful1.length; i++) {
      if (this.terminful1[i].zabr_id == termin.zabr_id) {
        this.terminful1.splice(i, 1);
      }
    }
    if (this._auth.getAuth && this._auth.getAdmin) {
      let data = 'zabr_id=' + termin.zabr_id;
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // this._http.post('http://localhost/sportyAppPhp/deletezabranjenitermin.php', data, { headers: headers }).subscribe((result) => {
      //   console.log("Uspešno ste obrisali termin");
      // },
      //   err => {
      //     console.log("Greška prilikom brisanja termina");
      //   }
      // );
    }
  }
}
