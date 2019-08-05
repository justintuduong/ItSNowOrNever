import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';


@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
    header = 'Welcome, name';
    
    userId;
    users: any;
    user:any;

    // tslint:disable-next-line:variable-name
    constructor(private _httpService: HttpService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            console.log(params['id'])
            this.userId = params['id']
        });
        this.findOne(),
        this.getAllUserInfo();
    }

    findOne() {
        this._httpService.findOneById(this.userId).subscribe(data => {
            console.log(data);
            this.user = data['data'];
            console.log('hello from the other side');
            console.log(this.user);
        });
    }

    getAllUserInfo() {
        this._httpService.findAll().subscribe(data => {
            console.log('Successfully got all users: ', data);
            this.users = data['users']
        });
    }


}
