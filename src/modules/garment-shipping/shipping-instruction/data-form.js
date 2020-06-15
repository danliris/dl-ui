import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";


@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedExpenditureGood;
    @bindable selectedUnitFrom;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    ShipOptions=["BY SEA", "BY AIR", "BY SEA - AIR"];
    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        
    }

    
}
