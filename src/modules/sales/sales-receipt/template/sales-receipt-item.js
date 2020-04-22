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

    var NotPaid = this.data.TotalPayment - this.data.TotalPaid;
    if (NotPaid < 0) {
      this.getNotPaid = 0;
    } else {
      this.getNotPaid = NotPaid;
    }

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

    var dueTime = new Date(this.data.DueDate).getTime();
    var salesReceiptTime = new Date(context.context.options.SalesReceiptDate).getTime();

    if (dueTime && salesReceiptTime) {
      this.getTempo = (dueTime - salesReceiptTime) / (1000 * 60 * 60 * 24);
      this.data.Tempo = this.getTempo;
    }

    // if (this.data.SalesInvoiceId && this.data.SalesInvoiceNo) {
    //   this.selectedSalesInvoice = {
    //     SalesInvoiceId: this.data.SalesInvoiceId,
    //     SalesInvoiceNo: this.data.SalesInvoiceNo,
    //     TotalPayment: this.data.TotalPayment,
    //     TotalPaid: this.data.TotalPaid,
    //     Currency: this.data.Currency,
    //   };
    // }
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

  // @bindable selectedSalesInvoice;
  // selectedSalesInvoiceChanged(newValue, oldValue) {
  //   if (this.selectedSalesInvoice && this.selectedSalesInvoice.Id) {
  //     this.data.SalesInvoice = this.selectedSalesInvoice;
  //     this.data.SalesInvoice.Id = this.selectedSalesInvoice.Id;
  //     this.data.SalesInvoice.SalesInvoiceNo = this.selectedSalesInvoice.SalesInvoiceNo;
  //     this.data.DueDate = this.selectedSalesInvoice.DueDate;
  //     this.data.VatType = this.selectedSalesInvoice.VatType;
  //     this.data.TotalPaid = this.selectedSalesInvoice.TotalPaid;
  //     this.data.SalesInvoiceDetails = this.selectedSalesInvoice.SalesInvoiceDetails;
  //     var dueTime = new Date(this.data.DueDate).getTime();
  //     var salesReceiptTime = new Date(this.SalesReceiptDate).getTime();
  //     if (this.data.DueDate && this.SalesReceiptDate)
  //       this.getTempo = (dueTime - salesReceiptTime) / (1000 * 60 * 60 * 24);
  //     this.data.Tempo = this.getTempo;
  //     var NotPaid = this.data.TotalPayment - this.data.TotalPaid;
  //     if (NotPaid < 0) {
  //       this.getNotPaid = 0;
  //     } else {
  //       this.getNotPaid = NotPaid;
  //     }
  //   } else {
  //     this.data.SalesInvoice.Id = null;
  //     this.data.SalesInvoice.SalesInvoiceNo = null;
  //     this.data.DueDate = null;
  //     this.data.VatType = null;
  //     this.data.TotalPayment = null;
  //     this.data.TotalPaid = null;
  //     this.data.SalesInvoiceDetails = null;
  //   }
  // }

  get salesInvoiceLoader() {
    return SalesInvoiceLoader;
  }
}
