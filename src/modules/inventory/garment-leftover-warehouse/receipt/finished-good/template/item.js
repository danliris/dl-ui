import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { GarmentProductionService } from "../service";
const LeftoverComodityLoader = require('../../../../../../loader/garment-leftover-comodity-loader');

@inject(GarmentProductionService)
export class Item {
    @bindable selectedComodity;

    get leftoverComodityLoader() {
        return LeftoverComodityLoader;
    }
    leftoverComodityView = (leftoverComodity) => {
        return `${leftoverComodity.Code} - ${leftoverComodity.Name}`;
    }
    constructor(garmentProductionService) {
        this.garmentProductionService = garmentProductionService;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;

        this.readOnly = context.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        if(this.data.Id){
            this.selectedComodity=this.data.LeftoverComodity;
        }
    }

    selectedComodityChanged(newValue){
        if(newValue){
            this.data.LeftoverComodity=newValue;
        }
    }
}