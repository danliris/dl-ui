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
  returntOptions = {};

  returnDetailsInfo = {
    columns: ["No. Bon Pengiriman Barang"],
    onRemove: function () {
      this.context.ReturnDetailsCollection.bind();
    }.bind(this),
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
      var SalesInvoiceData = this.selectedSalesInvoice;
      if (!this.data.Id) {
        this.data.DoReturnDetailItems = [];
        this.data.DoReturnItems = [];
        for (var detailItem of SalesInvoiceData) {
          var drdi = {
            selectedShipmentDocument: detailItem.ShipmentDocument,
          };
        }
        this.data.DoReturnDetailItems.push(drdi);
      }
      
      console.log(this.selectedSalesInvoice)
    } else {
      this.data.SalesInvoiceId = null;
      this.data.SalesInvoiceNo = null;
    }
  }

  get salesInvoiceLoader() {
    return SalesInvoiceLoader;
  }
}
