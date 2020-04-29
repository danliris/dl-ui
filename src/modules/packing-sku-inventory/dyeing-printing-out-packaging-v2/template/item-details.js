import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/output-packaging-loader');

@inject(Dialog)
export class PackagingDetails {
    @bindable product;

    constructor(dialog){
        this.dialog = dialog;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

}