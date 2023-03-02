import { inject, computedFrom } from 'aurelia-framework';
import { AuthService } from "aurelia-authentication";
import { Router } from "aurelia-router";

@inject(AuthService,Router)
export class NavBar {
    constructor(authService,router) {
        this.authService = authService;
        this.router = router;
    }

    @computedFrom('authService.authenticated')
    get isAuthenticated() {
        if (this.authService.authenticated) {
            this.authService.getMe()
                .then((result) => {
                    this.me = result.data;
                })
        }
        else {
            this.me = null;
        }

        return this.authService.authenticated;
    }

    logout() {
        this.authService.logout("#/login");
    }

    changePass(event) {
        this.router.navigateToRoute("changepass",{
            Username: event,
        });
    }
}
