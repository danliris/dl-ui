import {inject} from 'aurelia-framework'; 
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];

    constructor(router, service) {
        this.service = service;
        this.router = router; 
          this.uomId = "";
         this.uoms = [];
    } 

    activate() {
        this.service.search('')
            .then(data => {
                
                this.data = data;
            })
    }
    

    searching(){
        this.service.getByCategory(this.data.category)
        .then(data => {
                 this.data=data;
            }) 
            .catch(e=> {
            console.log(e);
            alert('Data Unit of Measurement tidak ditemukan');
        })
    }
    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }
    
    create() {
        this.router.navigateToRoute('create');
    }
    
    
}