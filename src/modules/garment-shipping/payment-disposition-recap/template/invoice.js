import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "../service";

const InvoiceLoader = require('../../../../loader/garment-shipping-invoice-loader');

@inject(Service)
export class invoice {
    @bindable selectedInvoice;

    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
    }
}