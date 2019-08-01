import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { AngularWebStorageModule, LocalStorage, LocalStorageService } from 'angular-web-storage';

import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

    // @LocalStorage() userId: any;        // for users that are in our db
    // @LocalStorage() active: boolean;
    // @LocalStorage() authUser: [         // for users that sign in through OAuth
    //     { userId: any },
    //     { first_name: any },
    //     { last_name: any },
    //     { email: any },
    //     { image: any },
    //     { token: any }
    // ];
    // @SessionStorage() sessionValue: string = `Hello ${+new Date}`;

    constructor(private socialAuthService: AuthService,
        // tslint:disable-next-line:variable-name
                private _route: ActivatedRoute,
        // tslint:disable-next-line:variable-name
                private _router: Router,
                // public local: LocalStorageService,
        // public session: SessionStorageService
    ) { }
    ngOnInit() {
    }

    goProfile(id) {
        this._router.navigate([`/user/home/${id}`]);
    }
    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log(socialPlatform + ' sign in data : ', userData);
                console.log("I am working");
                // this.authUser = [
                //     { userId: userData.name },
                //     { first_name: userData.name },
                //     { last_name: userData.name },   // will need to split name by space and store as new var.
                //     { email: userData.email },
                //     { image: userData.image },
                //     { token: userData.token }
                // ];
                // this.active = true;
                // console.log(this.authUser, this.active);
                // console.log(userData.id); test to check id. WILL NEED TO ADD SESSION VAR HERE
                this.goProfile(userData.id);
            }
        );
    }
}
