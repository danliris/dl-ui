import { bindable } from 'aurelia-framework'
var MachineLoader = require('../../../../../loader/machine-loader');

export class BadOutputItem {
    @bindable badOutputReason;
    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.badOutputReason = this.data.badOutputReason;
    }

    controlOptions = {
        control: {
        length: 12
        }
    };
    
    badOutputReasonChanged(newValue) {
        if(newValue){
            this.data.badOutputReason = newValue;
            this.data.badOutputReasonId = newValue._id;
        }else{
            this.data.badOutputReason = {};
            delete this.data.badOutputReasonId;
        }
    }
}