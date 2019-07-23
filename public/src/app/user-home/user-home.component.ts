import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
<<<<<<< HEAD

  constructor(private _httpService: HttpService) { }
=======
    header = 'Welcome Name';
  constructor() { }
>>>>>>> 527234cf73239375530860d39523d3cdbf449beb

  ngOnInit() {
  }

  getAllUserInfo() {
    this._httpService.getAll().subscribe( data =>{
      console.log("Login successful!")
    })
  }


}
