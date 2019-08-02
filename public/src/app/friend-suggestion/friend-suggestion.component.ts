import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-friend-suggestion',
    templateUrl: './friend-suggestion.component.html',
    styleUrls: ['./friend-suggestion.component.css']
})
export class FriendSuggestionComponent implements OnInit {
    users: any;
    // tslint:disable-next-line:variable-name
    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        this.getAllUserInfo();
    }
    getAllUserInfo() {
        this._httpService.findAll().subscribe(data => {
            console.log('Successfully got all users: ', data);
            this.users = data['users'];
        });
    }
}
