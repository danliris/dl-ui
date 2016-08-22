import {inject, bindable} from 'aurelia-framework';

export class DataForm {
    @bindable data = {};
    @bindable error = {};
    
    constructor() {
        this.data.deliveryDate = new Date();
    }

    activate() {
         
    }

    attached() { 
        
    } 
    
    
} 