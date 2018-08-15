import { Timovi } from './../../models/timovi.model';
import { Igraci } from './../../models/igraci.model';
import { Event } from './../../models/event.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '../../../../node_modules/@angular/forms';
import { Http, Headers } from '../../../../node_modules/@angular/http';
import { Router } from '../../../../node_modules/@angular/router';
import { Authentication } from '../../services/authentication';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public eventpicker: Event;
  public teampicker: string;
  public searchTool = new FormGroup({
    zahtevaniTim: new FormControl()
  });

  public svidogadjaji: Event[] = [];
  public dogadjajizadropdown: Event[] = [];
  public skupigraca: Igraci[] = [];

  public statusodigravanja:string;
  public datumodigravanja: string;
  public team1name: string;
  public team2name: string;
  public kreatormodel: string;

  public skuptimova: Timovi[] = [];

  //Ako je lista timova prazna pa se mora popuniti a kreator je jednak juzeru onda
  public provera: boolean = false;

  public alert: boolean = false;
  

  public eventTool = new FormGroup({
    selectModel: new FormControl()

  });


  public imeKorisnika: string;
  constructor(private _http: Http, private _router: Router, private _auth: Authentication) {
  }

  ngOnInit() {

    this.teampicker = "";

    this.preuzmiDogadjaje();
    this.preuzmiigrace();
    this.prikupitimove();
  }

  public pozovitimnamec() {
    this.alert = false;
    let team2ime: string = "";
    if (this.searchTool.value.zahtevaniTim == this.eventpicker.tim1) {
      this.alert = true;
    }
    let tr = false;
    for (let i = 0; i < this.skuptimova.length; i++) {
      if (this.skuptimova[i].nazivTima == this.searchTool.value.zahtevaniTim) {
        tr = true;
        team2ime = this.searchTool.value.zahtevaniTim;
      }
    }

    if (tr) {
      this.alert = false;
      this.team2name = team2ime;
      let data = "id_dog=" + this.eventpicker.id_dog + "&tim2=" + team2ime;

      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this._http.post('http://localhost/sportyAppPhp/updateteam2.php', data, { headers: headers }).subscribe((result) => {
      },
        err => {
          console.log("Greška prilikom setovanja drugog imena za tim u eventu.");
        }
      );
      this.provera=false;

    } else {
      this.alert = true;
      console.log("Zahtevani tim ne postoji", team2ime);
    }
  }

  //Funkcija koja puni dropdown onfocus
  public popunidropdown() {
    this.dogadjajizadropdown = [];
    for (let i = 0; i < this.svidogadjaji.length; i++) {
      for (let j = 0; j < this.skupigraca.length; j++) {
        if ((this.svidogadjaji[i].tim1 == this.skupigraca[j].nazivtima || this.svidogadjaji[i].tim2 == this.skupigraca[j].nazivtima) &&
          this.svidogadjaji[i].kreator == this.skupigraca[j].igrac) {
          this.dogadjajizadropdown.push(this.svidogadjaji[i]);
        }
      }
    }
    if (this.dogadjajizadropdown.length > 1) {
      for (let i = 0; i < this.dogadjajizadropdown.length; i++) {

        for (let j = i + 1; j < this.dogadjajizadropdown.length; j++) {
          if (this.dogadjajizadropdown[i].id_dog == this.dogadjajizadropdown[j].id_dog) {
            console.log(this.dogadjajizadropdown[j]);
            this.dogadjajizadropdown.splice(j, 1);

          }
        }
      }
    }
  }

  public popuniOnSelect() {
    if (this.eventpicker.tim2 == "" || this.eventpicker.tim2 == " ") {
      this.provera = true;
    } else {
      this.provera = false;
    }
    this.datumodigravanja = this.eventpicker.dan + ". " + this.eventpicker.mesec + " u " + this.eventpicker.sat + "h";
    this.team1name = this.eventpicker.tim1;
    this.team2name = this.eventpicker.tim2;
    this.kreatormodel = this.eventpicker.kreator;
    if(this.eventpicker.status==0){
      
      this.statusodigravanja="Na čekanju";
    }else{
      this.statusodigravanja="Odobren";
    }

  }

  //Prikupljanje svih timova za search listu
  public prikupitimove() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.get('http://localhost/sportyAppPhp/gettimove.php', { headers: headers })
      .subscribe(data => {
        let count = 0;
        this.skuptimova = JSON.parse(data['_body']).skuptimova;
      }, err => {
        alert(JSON.parse(err._body).error);
      }
      );
  }
  //Preuzimanje igrača i timova
  public preuzmiigrace() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this._http.get('http://localhost/sportyAppPhp/getigrace.php', { headers: headers })
      .subscribe(data => {
        this.skupigraca = JSON.parse(data['_body']).skupigraca;

      }, err => {
        alert(JSON.parse(err._body).error);
      }
      );
  }

  public preuzmiDogadjaje() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.get('http://localhost/sportyAppPhp/getdogadjaje.php', { headers: headers })
      .subscribe(data => {
        this.svidogadjaji = JSON.parse(data['_body']).dogadjaji;
      }
        , err => {
          alert(JSON.parse(err._body).error);
        }
      );
  }
}
