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

    async activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.context = context.context;

        if (!this.data && !this.data.properties.weight) {
            this.data.weight = 0;
        }
        if (!this.data && !this.data.properties.length) {
            this.data.length = 0;
        }

        if (this.data._id) {
            var filter = {
                productCode: this.data.code
            }
            var info = { filter: JSON.stringify(filter) }
            this.inventorySummary = await this.service.searchInventory(info);
            this.inventoryData = this.inventorySummary.data.length > 0 ? this.inventorySummary.data[0] : 0;
            this.data.quantity = this.inventoryData.quantity;
            // console.log(this.inventoryBalance);
        } else {
            this.data.quantity = 0;
        }
    }

    get weightTotal() {
        return (this.data.properties.weight * this.data.quantity).toFixed(2);
    }

    get lengthTotal() {
        return (this.data.properties.length * this.data.quantity).toFixed(2);
    }
}