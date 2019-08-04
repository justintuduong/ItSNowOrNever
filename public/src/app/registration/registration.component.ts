import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    // tslint:disable-next-line:semicolon
    newUser = {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    };
    // userError = {
    //     'first_name': '',
    //     'last_name': '',
    //     'email': '',
    //     'password': ''
    // };
    // tslint:disable-next-line:variable-name
    constructor(private _httpService: HttpService,
                // tslint:disable-next-line:variable-name
                private _router: Router) { }

    ngOnInit() {
    }

    onSubmit() {
        this._httpService.createUser(this.newUser).subscribe(data => {
            console.log(data);
            // this.userError = {
            //     'first_name': '',
            //     'last_name': '',
            //     'email': '',
            //     'password': ''
            // };
            // if (data['message'] == "Error") {
            //     console.log('There was an error')
            //     if (data['error']['errors']['first_name']) {
            //         this.userError['first_name'] = data['error']['errors']['first_name']['message']
            //     }
            //     if (data['error']['errors']['last_name']) {
            //         this.userError['last_name'] = data['error']['errors']['last_name']['message']
            //     }
            //     if (data['error']['errors']['email']) {
            //         this.userError['email'] = data['error']['errors']['email']['message']
            //     }
            //     if (data['error']['errors']['password']) {
            //         this.userError['password'] = data['error']['errors']['password']['message']
            //     }
            {
                console.log('success, added a new user to db');
                // this.newUser = {
                //     first_name: '',
                //     last_name: '',
                //     email: '',
                //     password: ''
                // };
                console.log();
                this.goHome();
            }
        })
    }
    goHome() {
        this._router.navigate([`/user/home/:id`]);
    }
}
