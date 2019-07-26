import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
    selector: 'app-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.css'],
    providers: [ChatService]
})
export class ChatMessageComponent implements OnInit {

    user: string;
    room: string;
    messageArray: Array<{ user: string, message: string }> = [];
    messageText: string;

    // tslint:disable-next-line:variable-name
    constructor(private _chatService: ChatService) {
    }

    ngOnInit() {
        this._chatService.newUserJoined()
            .subscribe(data => this.messageArray.push(data));
        console.log(this.messageArray);

        this._chatService.userLeftRoom()
            .subscribe(data => this.messageArray.push(data));
        console.log(this.messageArray);

        this._chatService.newMessageReceived()
            .subscribe(data => this.messageArray.push(data));

    }

    join() {
        this._chatService.joinRoom({ user: this.user, room: this.room });
    }

    leave() {
        this._chatService.leaveRoom({ user: this.user, room: this.room });
    }

    sendMessage() {
        this._chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
    }
}
