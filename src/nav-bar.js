import {inject, Aurelia} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Session} from './utils/session';

@inject(Aurelia, Router, Session)
export class NavBar {
    constructor(aurelia, router, session) {
        this.aurelia = aurelia;
        this.router = router;
        this.session = session;

        var stage = process.env.STAGE;
        stage = (stage || "").trim().toLowerCase();

        this.title = ["DANLIRIS", stage].filter(item => {
            return item && item != '';
        }).join(" - ");

        this.bgColor = stage == "development" ? "#d61010" : stage == "uat" ? "#008729" : "#222";
    }

    logout() {
        this.session.remove();
        this.router.navigate('/')
        this.router.reset();
        this.aurelia.setRoot('login');
    }
}