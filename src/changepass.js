import { Aurelia, inject } from 'aurelia-framework';
import { AuthService } from "aurelia-authentication";
import {Service} from './modules/auth/account/service';
import '../styles/signin.css';

@inject(AuthService,Service)
export class ChangePass {
    // username = "dev";
    // password = "Standar123";

    username="";
    // password="";
    error = false;
    disabledButton = false;

    constructor(authService,service) {
        this.authService = authService;
        this.service = service;
    }

    async activate(params) {
        console.log("param",params);
        this.username = params.Username;
      }

    save() {
        this.error = false;
        this.disabledButton = true;
        this.data ={};
        if(this.password1 == this.password2)
        {
            this.data.username =  this.username;
            this.data.password = this.password1;

            this.service.updatePass(this.data)  
            .then(result => {
                alert("Kata Sandi Berhasil DiUbah");
                this.authService.logout("#/login");
            })
            .catch(e => {
                this.error = e;
                this.disabledButton = false;
            })

        }else
        {
            alert("Kata Sandi dan Konfirmasi Kata Sandi harus sama.")
            this.disabledButton = false;
        }
    }
} 