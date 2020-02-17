import { inject, bindable } from "aurelia-framework";

var SalesInvoiceLoader = require("../../../../loader/sales-invoice-loader");

export class SalesReceipt {
  @bindable Nominal;

  activate(context) {
    // this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.option = context.options;
    this.readOnly = context.options.readOnly;
    this.options = context.context.options;
    this.SalesReceiptDate = context.context.options.SalesReceiptDate;

    //Menampilkan auto getUnpaid
    this.Nominal = this.data.Nominal;
    this.TotalPayment = this.data.TotalPayment;
    this.TotalPaid = this.data.TotalPaid;
    this.getPaid = this.TotalPaid + this.Nominal;

    this.getUnpaid = this.TotalPayment - (this.TotalPaid + this.Nominal);
    if (this.getUnpaid < 0) {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = 0;
      this.data.OverPaid = Math.abs(this.getUnpaid);
      this.data.IsPaidOff = true;
    } else if (this.getUnpaid == 0) {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = 0;
      this.data.OverPaid = 0;
      this.data.IsPaidOff = true;
    } else {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = Math.abs(this.getUnpaid);
      this.data.OverPaid = 0;
      this.data.IsPaidOff = false;
    }

    console.log(this.data.Paid)
    var dueTime = new Date(this.data.DueDate).getTime();
    var salesReceiptTime = new Date(context.context.options.SalesReceiptDate).getTime();

    if (dueTime && salesReceiptTime) {
      this.getTempo = (dueTime - salesReceiptTime) / (1000 * 60 * 60 * 24);
      this.data.Tempo = this.getTempo;
    }

    if (this.data.SalesInvoiceId && this.data.SalesInvoiceNo) {
      this.selectedSalesInvoice = {
        Id: this.data.SalesInvoiceId,
        SalesInvoiceNo: this.data.SalesInvoiceNo,
        TotalPayment: this.data.TotalPayment,
        TotalPaid: this.data.TotalPaid,
        CurrencyCode: this.data.CurrencyCode
      };
    }
  }

  NominalChanged(newValue, oldValue) {
    this.getPaid = this.data.TotalPaid + this.Nominal;
    this.getUnpaid =
      this.data.TotalPayment - (this.data.TotalPaid + this.Nominal);
    if (this.getUnpaid < 0) {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = 0;
      this.data.OverPaid = Math.abs(this.getUnpaid);
      this.data.IsPaidOff = true;
    } else if (this.getUnpaid == 0) {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = 0;
      this.data.OverPaid = 0;
      this.data.IsPaidOff = true;
    } else {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = Math.abs(this.getUnpaid);
      this.data.OverPaid = 0;
      this.data.IsPaidOff = false;
    }
    this.data.Nominal = this.Nominal;
    this.data.PreviousPayment = this.TotalPaid;
  }

  @bindable selectedSalesInvoice;
  selectedSalesInvoiceChanged(newValue, oldValue) {
    if (this.selectedSalesInvoice && this.selectedSalesInvoice.Id) {
      this.data.SalesInvoiceId = this.selectedSalesInvoice.Id;
      this.data.SalesInvoiceNo = this.selectedSalesInvoice.SalesInvoiceNo;
      this.data.DueDate = this.selectedSalesInvoice.DueDate;    
      this.data.VatType = this.selectedSalesInvoice.VatType;
      this.data.CurrencyId = this.selectedSalesInvoice.CurrencyId;
      this.data.CurrencyCode = this.selectedSalesInvoice.CurrencyCode;
      this.data.CurrencySymbol = this.selectedSalesInvoice.CurrencySymbol;
      this.data.CurrencyRate = this.selectedSalesInvoice.CurrencyRate;
      this.data.TotalPayment = this.selectedSalesInvoice.TotalPayment;
      this.data.TotalPaid = this.selectedSalesInvoice.TotalPaid;
      this.data.SalesInvoiceDetails = this.selectedSalesInvoice.SalesInvoiceDetails;
      var dueTime = new Date(this.data.DueDate).getTime();
      var salesReceiptTime = new Date(this.SalesReceiptDate).getTime();
      if (this.data.DueDate && this.SalesReceiptDate)
        this.getTempo = (dueTime - salesReceiptTime) / (1000 * 60 * 60 * 24);
      this.data.Tempo = this.getTempo;
    } else {
      this.data.SalesInvoiceId = null;
      this.data.SalesInvoiceNo = null;
      this.data.DueDate = null;
      this.data.VatType = null;
      this.data.CurrencyId = null;
      this.data.CurrencyCode = null;
      this.data.CurrencySymbol = null;
      this.data.CurrencyRate = null;
      this.data.TotalPayment = null;
      this.data.TotalPaid = null;
      this.data.SalesInvoiceDetails = null;
    }
  }

  get salesInvoiceLoader() {
    return SalesInvoiceLoader;
  }

  handleDataTypeChange() {
    this.data.DefaultValue = "";
  }
}
