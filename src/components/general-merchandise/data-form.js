import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';



@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    
    supplierApiUri='http://localhost:8900/v1/core/suppliers'; 
    
    constructor(router, service) { 
        this.router = router;
        this.service = service;  
    }
    activate() { }
    attached() { }
} 