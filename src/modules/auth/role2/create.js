import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { permissions: [] };
        this.error = {};
        // this.permission = [];
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    save() {
        var menus=[];
        // console.log("data",this.data);
        // console.log(this.permission);
        // var permissionVal = {permission:1 };
        this.data.permissions.menu.forEach(s=>{
            if(s.isEdit){
                menus.push(s);
                // permissionnss.push(permissionVal);

            }
        });

        this.data.permissions = menus;

        this.service.create(this.data)
            .then(result => {
                alert("Data Berhasil Dibuat");
                this.list();
            })
            .catch(e => {
                this.error = e;
            })
    }
}
