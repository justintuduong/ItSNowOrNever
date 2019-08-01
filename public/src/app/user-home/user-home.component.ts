import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {


  users: any;

  // tslint:disable-next-line:variable-name
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllUserInfo();
  }

  getAllUserInfo() {
    this._httpService.getAll().subscribe( data => {
      console.log('Successfully got all users: ', data);
      this.users = data['users']
    });
  }


}
