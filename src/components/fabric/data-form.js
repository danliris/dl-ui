import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class DataForm {
    @bindable data = {};
    @bindable error = {};
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate() { }
    attached() { }
} 