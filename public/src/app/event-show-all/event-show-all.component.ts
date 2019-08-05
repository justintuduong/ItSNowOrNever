import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-event-show-all',
  templateUrl: './event-show-all.component.html',
  styleUrls: ['./event-show-all.component.css']
})
export class EventShowAllComponent implements OnInit {

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

}
