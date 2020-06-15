import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const BuyerLoader = require('../../../loader/garment-buyers-loader');
const UomLoader = require('../../../loader/uom-loader');

@inject(Service)
export class DataForm {

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };
    LCOptions=["AT SIGHT", "USANCE"];

    get buyerLoader() {
        return BuyerLoader;
    }

    buyerView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    get uomLoader() {
        return UomLoader;
    }

    uomView = (data) => {
        return `${data.Unit || data.unit}`;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
    }

}
