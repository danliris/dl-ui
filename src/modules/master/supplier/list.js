import {inject} from 'aurelia-framework'; 
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];

    constructor(router, service) {
        this.service = service;
        this.router = router; 
    } 

    activate() {
        this.service.search('')
            .then(data => {
                
                this.data = data;
            })
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }
    
    create() {
        this.router.navigateToRoute('create');
    }
    
    searching(){
        this.service.getByCode(this.data.code)
        .then(data => {
                 this.data=data;
            }) 
            .catch(e=> {
            // console.log(e);
            alert('Data Supplier tidak ditemukan');
        })
    }
}