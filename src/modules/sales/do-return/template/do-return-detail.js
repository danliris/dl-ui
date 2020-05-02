import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './../service';

var SalesInvoiceLoader = require("../../../../loader/sales-invoice-loader");

@inject(Service, BindingEngine, BindingSignaler)
export class DoReturnDetail {

    returntOptions = {};

    returnDetailsInfo = {
        columns: ["No. Bon Pengiriman Barang"],
        onRemove: function () {
            this.context.ReturnDetailsCollection.bind();
        }.bind(this)
    };

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
    }

    @bindable selectedSalesInvoice;
    selectedSalesInvoiceChanged(newValue, oldValue) {
        if (this.selectedSalesInvoice && this.selectedSalesInvoice.SalesInvoiceId) {
            this.data.SalesInvoiceId = this.selectedSalesInvoice.SalesInvoiceId;
            this.data.SalesInvoiceNo = this.selectedSalesInvoice.SalesInvoiceNo;
        } else {
            this.data.SalesInvoiceId = null;
            this.data.SalesInvoiceNo = null;
        }
        console.log(this.selectedSalesInvoice)
    }

    get salesInvoiceLoader() {
        return SalesInvoiceLoader;
    }
}