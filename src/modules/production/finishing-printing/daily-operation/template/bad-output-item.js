import { bindable } from 'aurelia-framework'
var BadOutputReasonLoader = require('../../../../../loader/bad-output-reason-loader');

export class BadOutputItem {
    @bindable badOutputReason;
    activate(context) {
        this.data = context.data;
        this.error = typeof context.error === 'object'  ? context.error : {};
        this.options = context.options;
        this.badOutputReason = this.data.badOutputReason;
        this.filter = context.context.options;
        // this.data.precentage = this.error && this.error.length ? this.data.length : this.data.precentage;
        // this.data.length = this.data.length && !this.error ? this.data.length : this.data.precentage;
        this.data.length = this.data.hasOwnProperty("length") ? this.data.length : this.data.hasOwnProperty("precentage") ? this.data.precentage : 0;

        this.data.action = this.data.hasOwnProperty("action") ? this.data.action : this.filter.action; 
        console.log(context);
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    actionList = ["", "Reproses", "Digudangkan", "Diavalkan"];

    get badOutputReasonLoader() {
        return BadOutputReasonLoader;
    }

    badOutputReasonChanged(newValue, oldValue) {
        if (newValue) {
            this.data.badOutputReason = newValue;
            this.data.badOutputReasonId = newValue._id;
        } else {
            this.data.badOutputReason = {};
            delete this.data.badOutputReasonId;
        }
    }

}