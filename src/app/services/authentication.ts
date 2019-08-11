import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class Authentication implements OnInit {
    private isAuth: boolean;
    private isAdmin: boolean;
    private username: string;

    constructor(private api: ApiService) {
        this.isAuth = this.isAuthenticated();
        this.isPrivileged();
        this.getUsernameNow();
    }

    ngOnInit() {

    }

    private isPrivilegedHelp() {
        const token = localStorage.getItem('token');
        let data = "token=" + token;
        let url: string = `${234}/getAdmin.php`;
        // return this._http.post(url, data, { headers: this.headers }).toPromise();
    }
    public isPrivileged() {
        // this.isPrivilegedHelp().then((data) => {
        //     let obj = JSON.parse(data['_body']).user;
        //     let priv = obj[0].privilegije;
        //     if (priv == 1) {
        //         this.isAdmin = true;
        //     }
        //     else {
        //         this.isAdmin = false;
        //     }
        // }).catch((err) => {
        //     console.log(err)
        // });
    }


    private getUsernameHelp() {
        const token = localStorage.getItem('token');
        let data = "token=" + token;
        let url: string = `${123}/getUsername.php`;
        // return this._http.post(url, data, { headers: this.headers }).toPromise();
    }

    public getUsernameNow() {
        let name:string;
        // this.getUsernameHelp().then((data) => {
        //     let obj = JSON.parse(data['_body']).user;
        //     name = obj[0].korisnickoime;
        //     this.username = name;
        // }).catch((err) => {
        //     console.log(err)
        // });
        
    }


    public login(korisnik) {
         return this.api.post('login',korisnik);
    }

    public isAuthenticated(): boolean {

        const token = localStorage.getItem('token');
        if (token != null) {
            this.isAuth = true;
            return true;
        }
        else {
            this.isAuth = false;
            return false;
        }
    }




    public setAuth(auth: boolean) {
        this.isAuth = auth;
    }

    public getAuth(): boolean {
        return this.isAuth;
    }

    public setAdmin(auth: boolean) {
        this.isAdmin = auth;
    }

    public getAdmin(): boolean {
        return this.isAdmin;
    }
   

    public getUsername(): string {
        return this.username;
    }
}