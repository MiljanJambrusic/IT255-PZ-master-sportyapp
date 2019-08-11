import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private ENDPOINT = 'http://localhost:8080'
  
  constructor(private http: HttpClient) { }

  public get(route: String): Promise<any> {
    return this.http.get(`${this.ENDPOINT}/${route}`).toPromise();
  }

  public post(route: String, data: any): Promise<any> {
    return this.http.post(`${this.ENDPOINT}/${route}`, data).toPromise();
  }

  public delete(route: String, data: any): Promise<any> {
    return this.http.delete(`${this.ENDPOINT}/${route}/${data}`).toPromise();
  }
}

