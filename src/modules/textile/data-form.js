import {inject, bindable} from 'aurelia-framework';

export class DataForm {
    @bindable data = {};
    @bindable error = {};
    uomApiUri = require('../../host').core + '/v1/core/uoms';
    constructor() {

    }

    activate() {
         
    }

    attached() { 
        
    } 
} 