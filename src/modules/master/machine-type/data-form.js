import {inject, bindable, computedFrom} from 'aurelia-framework';

export class DataForm {
    @bindable readOnly = false;
    @bindable data = { "import": true };
    @bindable error = {};
    @bindable Options = {
        "readOnly": false,
        "isMaster": true
    }
 
    constructor() {

    }
    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    // resetData() {
    //     // this.data.indicators 
    // }

    activate() {

    }

    attached() {

    }
} 