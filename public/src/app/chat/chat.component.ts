import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    header = 'Chat';
    findFriend: any;

    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        this.findFriend = { friend: ''};
    }
    findOne() {
        console.log(this.findFriend.friend);
        this._httpService.chatFindOne(this.findFriend.friend).subscribe(data => {
            console.log(data);
        });
    }
}
