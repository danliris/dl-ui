import {Aurelia, inject} from 'aurelia-framework';
import {Session} from './utils/session';

@inject(Aurelia, Session)
export class login {
    constructor(aurelia, session) {
        this.aurelia = aurelia;
        this.session = session;
        if (this.session.isAuthenticated)
            this.aurelia.setRoot('app');
    }

    login() {
        console.log(this.session);
        this.session.username = "john.doe";
        this.session.roles = ["admin", ""]
        this.aurelia.setRoot('app');
    }
}