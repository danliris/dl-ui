import {
  inject,
  bindable,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service } from "./../service";

var SalesInvoiceLoader = require("../../../../loader/sales-invoice-loader");

@inject(Service, BindingEngine, BindingSignaler)
export class DoReturnDetail {
  @bindable data;
  @bindable error;

  returnOptions = {};

  returnDetailsInfo = {
    columns: ["No. Bon Pengiriman Barang"],
    onRemove: function () {
      this.ReturnDetailsCollection.bind();
    }.bind(this),
  };

  constructor(service, bindingEngine, bindingSignaler) {
    this.service = service;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    this.selectedSalesInvoice = this.data.SalesInvoice || null;
  }

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedSalesInvoice;
  async selectedSalesInvoiceChanged(newValue, oldValue) {
    if (newValue) {
      var salesInvoice = await this.service
        .getSalesInvoiceById(newValue.Id)
        .then((result) => result);
      this.data.SalesInvoice = salesInvoice;
      if (salesInvoice) {
        this.data.DOReturnDetailItems = salesInvoice.SalesInvoiceDetails.map(
          (detail) => detail
        );
      }
    } else {
      this.data.DOReturnDetailItems = [];
    }
  }

  get salesInvoiceLoader() {
    return SalesInvoiceLoader;
  }
}
