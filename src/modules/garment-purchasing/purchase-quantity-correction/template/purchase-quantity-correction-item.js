import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './../service';


@inject(Service, BindingEngine, BindingSignaler)
export class PurchaseQuantityCorrectionItem {
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
        this.currentQuantity = this.data.quantity;
    }

    @bindable currentQuantity;
    currentQuantityChanged(e) {
        this.data.quantity = this.currentQuantity;
        this.data.priceTotal = parseFloat((this.currentQuantity * this.data.pricePerUnit).toFixed(2));
    }
}