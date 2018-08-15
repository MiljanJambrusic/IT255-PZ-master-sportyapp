import { Svikorisnici } from './../../models/korisnicizainvite.model';
import { Timovi } from './../../models/timovi.model';
import { Authentication } from './../../services/authentication';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '../../../../node_modules/@angular/http';
import { Router } from '../../../../node_modules/@angular/router';
import { Igraci } from '../../models/igraci.model';
import { FormGroup, FormControl } from '../../../../node_modules/@angular/forms';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  constructor(private _http: Http, private _router: Router, private _auth: Authentication) { }


  //Za potvrde
  public skupigraca: Igraci[] = [];
  public nepotvrdjenizahtevizatim: Igraci[] = [];
  public proveraZahteva: boolean = false;

  //Za timove i kreatore
  public skuptimova: Timovi[] = [];
  public selektovanavrednost: string = "";
  public skupzadropdown: String[] = [];

  public kreator: string;
  public nazivtimazaformu: string;
  public proveraAtenticnostiKreatora: boolean;
  public igracizaformu: string[];

  public listaZaSearch: Svikorisnici[] = [];
  public svikorisnici: Svikorisnici[] = [];

  //TREĆI DEO

  public timovikreatora: Timovi[] = [];
  public viseodtri: boolean = true;

  public searchTool = new FormGroup({
    zahtevaniSearchName: new FormControl()

  });

  public napravitim = new FormGroup({
    teamname: new FormControl()
  })


  ngOnInit() {
    this.zahtevizatim();
    this.prikupitimove();
    this.preuzmiKorisnike();
  }



  //Metoda za popunuliste dropdown-a za timove

  public timoviKreatora() {

  }

  public popunidropdown() {
    this.skupzadropdown = [];
    for (let i = 0; i < this.skupigraca.length; i++) {
      if (this._auth.getUsername() == this.skupigraca[i].igrac && this.skupigraca[i].status == 1) {
        this.skupzadropdown.push(this.skupigraca[i].nazivtima);
      }
    }

    for (let i = 0; i < this.skuptimova.length; i++) {
      let pomoc: boolean = true;
      for (let j = 0; j < this.skupzadropdown.length; j++) {
        if (this.skuptimova[i].nazivTima == this.skupzadropdown[j]) {
          pomoc = false;
        }
      }
      if (pomoc && this.skuptimova[i].kreator == this._auth.getUsername()) {
        this.skupzadropdown.push(this.skuptimova[i].nazivTima);
      }
    }
  }


  //Metoda za popunjavanje forme prilikom odabira timova iz dropdown-a
  public popuniformu() {
    this.igracizaformu = [];
    this.listaZaSearch=[];
    for (let i = 0; i < this.skuptimova.length; i++) {
      if (this.selektovanavrednost == this.skuptimova[i].nazivTima) {
        this.kreator = this.skuptimova[i].kreator;
        this.nazivtimazaformu = this.skuptimova[i].nazivTima;
      }
    }
    for (let i = 0; i < this.skupigraca.length; i++) {
      if (this.selektovanavrednost == this.skupigraca[i].nazivtima && this.skupigraca[i].status==1) {
        this.igracizaformu.push(this.skupigraca[i].igrac);
      }
    }
    if (this.selektovanavrednost = "") {
      this.kreator = "";
      this.nazivtimazaformu = "";
      this.igracizaformu = [];
    }
  }
  //provera za invite
  public proveraAutenticnosti() {
    let count=0;

    for(let i=0;i<this.skupigraca.length;i++){
      if(this.skupigraca[i].status == 1 && this.skupigraca[i].nazivtima==this.selektovanavrednost){
        count++;
      }
    }
    if (this._auth.getUsername() == this.kreator && count < 9) {
      this.proveraAtenticnostiKreatora = true;
    }
    else {
      this.proveraAtenticnostiKreatora = false;
    }
  }


  //Metoda za pretragu igrača koji nisu deo tima
  public searchKorisnikeKojiNisuDeoTima() {
    this.listaZaSearch = [];
    for (let i = 0; i < this.svikorisnici.length; i++) {
      if (this.svikorisnici[i].korisnickoime != this.kreator) {
        this.listaZaSearch.push(this.svikorisnici[i]);
      }
    }
    if (this.igracizaformu.length > 0) {
      for (let i = 0; i < this.listaZaSearch.length; i++) {
        for (let j = 0; j < this.igracizaformu.length; j++) {
          if (this.listaZaSearch[i].korisnickoime == this.igracizaformu[j] || this.listaZaSearch[i].korisnickoime == this.kreator) {
            this.listaZaSearch.splice(i, 1);
            i--;
          }
        }
      }
    }
    if (this.searchTool.value.zahtevaniSearchName == "") {
      this.listaZaSearch = [];
    }
  }


  //Metoda koja prikuplja sve igrače koji pripadaju nekom timu

  public zahtevizatim() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this._http.get('http://localhost/sportyAppPhp/getigrace.php', { headers: headers })
      .subscribe(data => {
        this.skupigraca = JSON.parse(data['_body']).skupigraca;
        for (let i = 0; i < this.skupigraca.length; i++) {
          if (this.skupigraca[i].igrac == this._auth.getUsername() && this.skupigraca[i].status == 0) {
            this.nepotvrdjenizahtevizatim.push(this.skupigraca[i]);
            this.proveraZahteva = true;
          }
        }
      }, err => {
        alert(JSON.parse(err._body).error);
      }
      );
  }


  //Metoda za prikupljanje svih timova
  public prikupitimove() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.get('http://localhost/sportyAppPhp/gettimove.php', { headers: headers })
      .subscribe(data => {
        let count = 0;
        this.skuptimova = JSON.parse(data['_body']).skuptimova;
        for (let i = 0; i < this.skuptimova.length; i++) {
          if (this.skuptimova[i].kreator == this._auth.getUsername()) {
            this.timovikreatora.push(this.skuptimova[i]);
            count++;
          }
        }
        if (count < 3) {
          this.viseodtri = true;
        }
        else {
          this.viseodtri = false;
        }
      }, err => {
        alert(JSON.parse(err._body).error);
      }
      );

  }


  //Minor metode

  //POZIVANJE U TIM
  public pozoviUTim(search: Svikorisnici) {
    let indeksTima: number;
    for (let i = 0; i < this.skuptimova.length; i++) {
      if (this.skuptimova[i].nazivTima == this.selektovanavrednost) {
        indeksTima = this.skuptimova[i].id_tima;
      }
    }
    for (let i = 0; i < this.listaZaSearch.length; i++) {
      if (this.listaZaSearch[i].korisnickoime == search.korisnickoime) {

        this.listaZaSearch.splice(i, 1);
        i--;
      }
    }
    let id = this.skupigraca[this.skupigraca.length - 1].id;
    id = id + 1;
    let privremeni: Igraci = new Igraci(search.korisnickoime, id, 0, this.nazivtimazaformu);
    this.skupigraca.push(privremeni);
    let data = 'igrac=' + search.korisnickoime + '&status=' + 0 + '&nazivtima=' + this.nazivtimazaformu;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.post('http://localhost/sportyAppPhp/pozoviutim.php', data, { headers: headers }).subscribe((result) => {
    },
      err => {
        console.log("greska u slanju zahteva igraču za tim");
      }
    );
  }

  //Pravljenje novog tima
  napraviTim() {
    let newteam: string = this.napravitim.value.teamname;
    let data = 'nazivtima=' + newteam + '&kreator=' + this._auth.getUsername();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.post('http://localhost/sportyAppPhp/napravitim.php', data, { headers: headers }).subscribe((result) => {
    },
      err => {
        console.log("greška prilikom pravljenja novog tima");
      }
    );
  }

  public dodajNoviTimUListuIgraca() {
    let newteam: string = this.napravitim.value.teamname;
    let data1 = 'igrac=' + this._auth.getUsername() + '&status=' + 1 + '&nazivtima=' + newteam;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.post('http://localhost/sportyAppPhp/napravitimulistiigraca.php', data1, { headers: headers }).subscribe((result) => {
    },
      err => {
        console.log("greška prilikom dodavanja novog tima i kreatora u listu igrača.");
      }
    );
    location.reload();
  }

  //Brisanje tima

  public obrisiTimIzListeTimova(tim: Timovi) {
    let data = 'nazivtima=' + tim.nazivTima;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.post('http://localhost/sportyAppPhp/obrisitimizlistetimova.php', data, { headers: headers }).subscribe((result) => {
    },
      err => {
        console.log("Greška prilikom brisanja tima iz liste timova");
      }
    );

    for (let i = 0; i < this.skuptimova.length; i++) {
      if (this.skuptimova[i].nazivTima == tim.nazivTima) {
        this.skuptimova.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < this.timovikreatora.length; i++) {
      if (this.timovikreatora[i].nazivTima == tim.nazivTima) {
        this.timovikreatora.splice(i, 1);
        i--;
      }
    }
    this.viseodtri = true;

  }

  public obrisiTimIzListeIgraca(tim: Timovi) {
    let data1 = 'nazivtima=' + tim.nazivTima;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.post('http://localhost/sportyAppPhp/obrisitimizlisteigraca.php', data1, { headers: headers }).subscribe((result) => {
    },
      err => {
        console.log("Greška prilikom brisanja tima iz liste timova");
      }
    );

    for (let i = 0; i < this.skupigraca.length; i++) {
      if (this.skupigraca[i].nazivtima == tim.nazivTima) {
        this.skupigraca.splice(i, 1);
        i--;
      }
    }
  }


  //Odbijanje tima
  public odbijTim(igracodbija: Igraci) {
    let data = 'id=' + igracodbija.id;
    for (let i = 0; i < this.nepotvrdjenizahtevizatim.length; i++) {
      if (this.nepotvrdjenizahtevizatim[i].id == igracodbija.id) {
        this.nepotvrdjenizahtevizatim.splice(i, 1);
      }
    }
    if (this.nepotvrdjenizahtevizatim.length = 0) {
      this.proveraZahteva = false;
    } else {
      this.proveraZahteva = true;
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.post('http://localhost/sportyAppPhp/obrisizahtevzatim.php', data, { headers: headers }).subscribe((result) => {
    },
      err => {
        console.log("Greška prilikom odbijanja tima");
      }
    );
  }

  //Prihvatanje tima
  public prihvatiTim(igrac: Igraci) {
    let data = 'id=' + igrac.id;
    for (let i = 0; i < this.nepotvrdjenizahtevizatim.length; i++) {
      if (this.nepotvrdjenizahtevizatim[i].id == igrac.id) {
        this.nepotvrdjenizahtevizatim.splice(i, 1);
      }
    }
    for (let i = 0; i < this.skupigraca.length; i++) {
      if (this.skupigraca[i].nazivtima == igrac.nazivtima && this.skupigraca[i].igrac == igrac.igrac && this.skupigraca[i].status == 0) {
        this.skupigraca[i].status = 1;
      }
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.post('http://localhost/sportyAppPhp/prihvatizahtevzatim.php', data, { headers: headers }).subscribe((result) => {
    },
      err => {
        console.log("Greška prilikom prihvatanja tima");
      }
    );
  }

  //Metoda za prikupljanje svih korisnika
  public preuzmiKorisnike() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this._http.get('http://localhost/sportyAppPhp/getsvekorisnike.php', { headers: headers })
      .subscribe(data123 => {
        this.svikorisnici = JSON.parse(data123['_body']).korisnici;
      }
        , err => {
          alert(JSON.parse(err._body).error);
        }
      );
  }
}