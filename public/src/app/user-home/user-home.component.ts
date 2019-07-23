import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

  getAllUserInfo() {
    this._httpService.getAll().subscribe( data =>{
      console.log("Login successful!")
    })
  }


}
