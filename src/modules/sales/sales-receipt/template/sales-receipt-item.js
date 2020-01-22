import { inject, bindable } from "aurelia-framework";

var SalesInvoiceLoader = require("../../../../loader/sales-invoice-loader");

export class SalesReceipt {
  @bindable Nominal;
  @bindable getTempo;

  activate(context) {
    // this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.option = context.options;
    this.readOnly = context.options.readOnly;
    this.options = context.context.options;
    this.SalesReceiptDate = context.context.options.SalesReceiptDate;

    if (!this.data.Paid) {
      this.data.Paid = 0;
    }
    if (!this.data.Unpaid) {
      this.data.Unpaid = 0;
    }

    this.Nominal = this.data.Nominal;
    this.TotalPayment = this.data.TotalPayment;
    this.TotalPaid = this.data.TotalPaid;
    this.getPaid = this.TotalPaid + this.Nominal;  
    this.data.Paid = this.getPaid;
    this.getUnpaid = this.TotalPayment - (this.TotalPaid + this.Nominal);
    this.data.Unpaid = this.getUnpaid;

    // console.log("this.Nominal " + this.Nominal)
    // console.log("this.TotalPayment " + this.TotalPayment)
    // console.log("this.TotalPaid " + this.TotalPaid)
    // console.log("this.getPaid " + this.getPaid)
    // console.log("this.getUnpaid " + this.getUnpaid)
    // console.log("this.data.Paid " + this.data.Paid)
    // console.log("this.data.Unpaid " + this.data.Unpaid)

    var dueTime = new Date(this.data.DueDate).getTime();
    var salesReceiptTime = new Date(this.SalesReceiptDate).getTime();
    
    if(dueTime && salesReceiptTime) {
      this.getTempo = (dueTime - salesReceiptTime) / (1000 * 60 * 60 * 24);
    }

    if (
      this.data.SalesInvoiceId &&
      this.data.SalesInvoiceNo
    ) {
      this.selectedSalesInvoice = {
        Id: this.data.SalesInvoiceId,
        SalesInvoiceNo: this.data.SalesInvoiceNo,
        TotalPayment: this.data.TotalPayment,
        TotalPaid: this.data.TotalPaid,

        CurrencyCode: this.data.CurrencyCode,
        DueDate: this.data.DueDate
      };
    }
  }

  // DueDateChanged(newValue, oldValue) {
  //   if (this.data.DueDate && this.SalesReceiptDate) {
  //     this.data.DueDate = this.DueDate;
  //     context.context.options.SalesReceiptDate = this.SalesReceiptDate;

  //     var dueTime = new Date(this.data.DueDate).getTime();
  //     var salesReceiptTime = new Date(this.SalesReceiptDate).getTime();
  //     this.getTempo = (dueTime - salesReceiptTime) / (1000 * 60 * 60 * 24);
  //   }
  // }

  NominalChanged(newValue, oldValue) {   
    this.getPaid = this.data.TotalPaid + this.Nominal;  
    this.data.Paid = this.getPaid;
    this.getUnpaid = this.data.TotalPayment - (this.data.TotalPaid + this.Nominal);
    this.data.Unpaid = this.getUnpaid;
    this.data.Nominal = this.Nominal;
  }

  PaidChanged(newValue, oldValue) {  
    this.data.Paid = this.getPaid;
  }

  UnpaidChanged(newValue, oldValue) {
    this.data.Unpaid = this.getUnpaid;
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
      this.data.TotalPayment = this.selectedSalesInvoice.TotalPayment;
      this.data.TotalPaid = this.selectedSalesInvoice.TotalPaid;
      this.data.SalesInvoiceDetails = this.selectedSalesInvoice.SalesInvoiceDetails;
      var dueTime = new Date(this.data.DueDate).getTime();
      var salesReceiptTime = new Date(this.SalesReceiptDate).getTime();
      if (this.data.DueDate && this.SalesReceiptDate)
        this.getTempo = (dueTime - salesReceiptTime) / (1000 * 60 * 60 * 24);

    } else {
      this.data.SalesInvoiceId = null;
      this.data.SalesInvoiceNo = null;
      this.data.DueDate = null;
      this.data.CurrencyId = null;
      this.data.CurrencyCode = null;
      this.data.CurrencySymbol = null;
      this.data.CurrencyRate = null;
      this.data.UseVat = null;
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
