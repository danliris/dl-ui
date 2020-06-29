import {bindable, computedFrom} from 'aurelia-framework'

export class GarmentPreparingDetail {
    activate(context) {
        this.data = context.data;
        this.options = context.context.options;
        this.error = context.error;
        this.contextOptions = context.context.options;
        this.readOnly = this.options.readOnly;
        this.data.Currency = "IDR";
       console.log(this.data);
        this.data.UENItemId = this.data.Id;
   
        
    }

}