import {inject, Aurelia} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Session} from './utils/session';

@inject(Aurelia, Router, Session)
export class NavBar {
    constructor(aurelia, router, session) {
        this.aurelia = aurelia;
        this.router = router;
        this.session = session;
    }

    logout() {
        this.session.remove();
        this.router.navigate('/')
        this.router.reset();
        this.aurelia.setRoot('login');
    }
}