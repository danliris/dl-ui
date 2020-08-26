import { bindable, computedFrom, BindingSignaler, inject } from 'aurelia-framework';
var IncomeTaxLoader = require('../../../../loader/income-tax-loader');

// @inject(BindingSignaler)
export class Item {

  constructor() {
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
   
    this.selectedIncomeTax = this.data.IncomeTax || null;
    this.selectedIncomeTaxBy = this.data.IncomeTaxBy || "";
    this.selectedAmount = this.data.Amount || 0;
    this.selectedPPh = this.data.isGetPPh;
    this.selectedVat = this.data.isGetPPn;

    this.calculateTotalAmount();
  }

  IncomeTaxByOptions = ["", "Supplier", "Dan Liris"];

  get incomeTaxLoader() {
    return IncomeTaxLoader;
  }

  incomeTaxView = (incomeTax) => {

    return incomeTax.name ? `${incomeTax.name} - ${incomeTax.rate}` : "";

  }

  @bindable selectedIncomeTaxBy;
  selectedIncomeTaxByChanged(newValue) {
    if (newValue) {
      this.data.IncomeTaxBy = newValue
      this.calculateTotalAmount();
    }
    else {
      delete this.data.IncomeTaxBy;
      this.calculateTotalAmount();
    }
  }

  @bindable selectedVat;
  selectedVatChanged(newValue) {
    if (newValue) {
      this.data.isGetPPn = newValue
      this.calculateTotalAmount();
    } else {
      delete this.data.isGetPPn;
      this.calculateTotalAmount();
    }
  }

  @bindable selectedPPh;
  selectedPPhChanged(newValue) {
    if (newValue) {
      this.data.isGetPPh = newValue;
      this.calculateTotalAmount();
    } else {
      this.selectedIncomeTax = null;
      this.selectedIncomeTaxBy = "";
      delete this.data.isGetPPh;
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount() {
    if (this.data.IncomeTaxBy == "Supplier" && this.data.isGetPPh && this.data.IncomeTax) {
      let vatAmount = 0;
      if (this.data.isGetPPn)
        vatAmount = this.data.Amount * 0.1;
      this.data.Total = this.data.Amount - (this.data.Amount * (this.data.IncomeTax.rate / 100)) + vatAmount;
    } else {
      let vatAmount = 0;
      if (this.data.isGetPPn)
        vatAmount = this.data.Amount * 0.1;
      this.data.Total = this.data.Amount + vatAmount;
    }
  }

  @bindable selectedIncomeTax;
  selectedIncomeTaxChanged(newValue) {
    
    if (newValue) {
      this.data.IncomeTax = newValue;
      this.calculateTotalAmount();
      
    } else {
      delete this.data.IncomeTax
      this.calculateTotalAmount();
    }
  }

  @bindable selectedAmount;
  selectedAmountChanged(newValue) {
    if (newValue) {
      this.data.Amount = newValue;
      this.calculateTotalAmount();
    }
  }
}
