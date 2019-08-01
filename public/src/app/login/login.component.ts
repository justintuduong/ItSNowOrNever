import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

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

    constructor(private socialAuthService: AuthService,
                // tslint:disable-next-line:variable-name
                private _route: ActivatedRoute,
                // tslint:disable-next-line:variable-name
                private _router: Router,
                public session: SessionStorageService
                ) { }
    ngOnInit() {
    }

    goProfile(id, name, email, image, token) {

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
                // console.log(userData.id); test to check id. WILL NEED TO ADD SESSION VAR HERE
                if (userData) {
                    this.goProfile(userData.id, userData.name, userData.email, userData.image, userData.token);
                }
            }
        );
    }
}
