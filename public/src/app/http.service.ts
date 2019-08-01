import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    createUser(newUser: { first_name: string; last_name: string; email: string; password: string; }) {
        throw new Error("Method not implemented.");
    }

  constructor(private _http: HttpClient) { }

  getAll() {  // correlates with what will be passed into the home/hom.component.ts
    return this._http.get('/all'); //correlates with the routes established in the server.js
  }

  createUser(user){
    return this._http.post('/create', user)
  }

}
