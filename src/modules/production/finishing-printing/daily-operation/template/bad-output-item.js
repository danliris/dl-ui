import { bindable } from 'aurelia-framework'
var BadOutputReasonLoader = require('../../../../../loader/bad-output-reason-loader');

export class BadOutputItem {
    @bindable badOutputReason;
    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.badOutputReason = this.data.badOutputReason;
        this.filter = context.context.options;
        //console.log(context);
    }

    controlOptions = {
        control: {
        length: 12
        }
    };

    get badOutputReasonLoader() {
        return BadOutputReasonLoader;
    }
    
    badOutputReasonChanged(newValue, oldValue) {
        if(newValue){
            this.data.badOutputReason = newValue;
            this.data.badOutputReasonId = newValue._id;
        }else{
            this.data.badOutputReason = {};
            delete this.data.badOutputReasonId;
        }
    }

}