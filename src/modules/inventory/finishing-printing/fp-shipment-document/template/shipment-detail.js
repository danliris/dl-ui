import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './../service';

@inject(Service, BindingEngine, BindingSignaler)
export class ShipmentDetail {

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        console.log(this.options);
        this.selectedProductionOrder = this.data.selectedProductionOrder;
    }

    controlOptions = {
        control: {
            length: 12
        }
    }

    productionOrderFields = ["_id", "orderNo", "orderType.name", "designCode", "designNumber"];

    itemColumns = ["Daftar Produk"];

    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newVal, oldVal) {
        if (this.selectedProductionOrder && this.selectedProductionOrder._id) {
            this.data.selectedProductionOrder = this.selectedProductionOrder;
            this.data.productionOrderId = this.selectedProductionOrder._id;
        }

        // this.selectedProductionOrder = newVal;
    }

    get productionOrderLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: this.productionOrderFields };
            return this.service.searchProductionOrder(info)
                .then((result) => {
                    return result.data;
                });
        }
    }
}