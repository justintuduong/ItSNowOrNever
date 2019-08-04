import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    header = 'Chat';
    findFriend: any;
    recipient: any;

    // tslint:disable-next-line:variable-name
    constructor(private _httpService: HttpService,
                // tslint:disable-next-line:variable-name
                private _router: Router,
    ) { }

    ngOnInit() {
        this.findFriend = { friend: '' };
    }
    initiateChat(recipientId) {
        this._router.navigate([`/message/${recipientId}`]);
    }
    findOne() {
        console.log(this.findFriend.friend);
        this._httpService.findOneByName(this.findFriend.friend).subscribe(data => {
            this.recipient = data;
            console.log(this.recipient);
            console.log(this.recipient.data.id);
            // update query goes here to add chatroom to db
            this.initiateChat(this.recipient.data.id);
        });
    }
}
