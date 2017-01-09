import { Aurelia, inject } from 'aurelia-framework';
import { AuthService } from "aurelia-authentication";
import '../styles/signin.css';

@inject(AuthService)
export class Login {
    // username = "dev";
    // password = "Standar123";

    username="";
    password="";

    constructor(authService) {
        this.authService = authService;
    }

    login() {
        return this.authService.login({ "username": this.username, "password": this.password })
            .then(response => {
                console.log("success logged " + response);
            })
            .catch(err => {
                console.log(err);
                console.log("login failure");
            });
    }
} 