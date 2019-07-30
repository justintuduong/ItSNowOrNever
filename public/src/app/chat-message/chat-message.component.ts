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

        this.join();

    }

    join() {
        this.user = 'Justin'; // session name will go here
        this._chatService.joinRoom({ user: this.user, room: this.room });
    }

    // leave() { // user will never leave chat once initiated
    //     this._chatService.leaveRoom({ user: this.user, room: this.room });
    // }

    sendMessage() {
        console.log(this.messageText.length);
        if (this.messageText.length !== 0) {
            this._chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
            this.messageText = '';
        }
    }

    keyDownFunction(event) {
        if (event.keyCode === 13) {
            // alert('you just clicked enter');
            this.sendMessage();
        }
    }
}
