import { inject, bindable } from "aurelia-framework";
import numeral from "numeral";

var SalesInvoiceLoader = require("../../../../loader/sales-invoice-loader");

export class SalesReceipt {
  @bindable getTempo;

  activate(context) {
    // this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.readOnly = context.options.readOnly;
  }

  @bindable selectedSalesInvoice;
  selectedSalesInvoiceChanged(newValue, oldValue) {
    if (this.selectedSalesInvoice && this.selectedSalesInvoice.Id) {
      this.data.SalesInvoiceId = this.selectedSalesInvoice.Id;
      this.data.SalesInvoiceNo = this.selectedSalesInvoice.SalesInvoiceNo;      
      this.data.DueDate = this.selectedSalesInvoice.DueDate;
      this.data.CurrencyId = this.selectedSalesInvoice.CurrencyId;
      this.data.CurrencyCode = this.selectedSalesInvoice.CurrencyCode;
      this.data.CurrencySymbol = this.selectedSalesInvoice.CurrencySymbol;
      this.data.CurrencyRate = this.selectedSalesInvoice.CurrencyRate;
      this.data.UseVat = this.selectedSalesInvoice.UseVat;
    } else {
      this.data.SalesInvoiceId = null;
      this.data.SalesInvoiceNo = null;
      this.data.DueDate = null;
      this.data.CurrencyId = null;
      this.data.CurrencyCode = null;
      this.data.CurrencySymbol = null;
      this.data.CurrencyRate = null;
      this.data.UseVat = null;
    }
  }

  get salesInvoiceLoader() {
    return SalesInvoiceLoader;
  }

  handleDataTypeChange() {
    this.data.DefaultValue = "";
  }
}
