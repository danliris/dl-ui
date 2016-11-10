import {Aurelia, inject} from 'aurelia-framework';
import {Session} from './utils/session';
import {AuthService} from './utils/auth-service';
import '../styles/signin.css';

@inject(Aurelia, Session, AuthService)
export class Login {
    username = "dev";
    password = "Standar123";
    constructor(aurelia, session, authService) {
        this.service = authService;
        this.aurelia = aurelia;
        this.session = session;
        if (this.session.isAuthenticated)
            this.aurelia.setRoot('app');
    }

    login() {
        this.service.authenticate(this.username, this.password)
            .then(token => {
                this.service.me(token)
                    .then(account => {
                        this.session.token = token;
                        this.session.data = account;
                        this.aurelia.setRoot('app');
                    })
            })
    }
} 