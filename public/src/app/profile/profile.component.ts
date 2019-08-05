import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    header = 'First Name Last Name';
    userId;
    user: any;

  constructor( private _httpService: HttpService,
    private route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        console.log(params['id'])
        this.userId = params['id']
    });
    this.findOne()
}
  
  findOne() {
    this._httpService.findOneById(this.userId).subscribe(data => {
        console.log(data);
        this.user = data['data'];
        console.log('hello from the other side');
        console.log(this.user);
    });
}
}
