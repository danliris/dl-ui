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

    // if (this.data.isGetPPh) {
    //   this.data.isGetPPh = true;
    // }
    // else {
    //   this.data.isGetPPh = false;
    // }

    // if (this.data.isGetPPn) {
    //   this.data.isGetPPn = true;
    // }
    // else {
    //   this.data.isGetPPn = false;
    // }

    // if (this.data.incomeTax) {
    //   this.selectedIncomeTax = this.data.incomeTax;
    //   this.data.incomeTaxRate = this.data.incomeTax.rate;
    // }
    console.log(this.data)

    this.selectedIncomeTax = this.data.IncomeTax || null;
    this.selectedIncomeTaxBy = this.data.IncomeTaxBy || "";
    this.selectedAmount = this.data.Amount || 0;

    this.calculateTotalAmount();
    // this.vbRequestTotalCalc
  }

  // @bindable Total;
  // @bindable incomeTaxBy;
  // incomeTaxByChanged(newValue, oldValue) {
  //     console.log("test");
  //     if (this.incomeTaxBy) {

  //         if (this.incomeTaxBy == "Supplier") {
  //             console.log(this.data.Amount)
  //             var cnt = (this.data.Amount * this.data.incomeTaxRate) / 100;
  //             this.Total = this.data.Amount - cnt;
  //         }
  //     }
  // }

  // @bindable vbRequestTotal;

  // @computedFrom('data.isGetPPn', 'data.Amount', 'data.isGetPPh', 'data.incomeTaxRate', 'data.IncomeTaxBy')
  // get vbRequestTotalCalc() {
  //   // console.log("test");
  //   // console.log(this.data.isGetPPh);
  //   if (this.data.isGetPPn == true && this.data.isGetPPh == false) {

  //     var temp = this.data.Amount * 0.1;
  //     // this.data.isGetPPh = false;
  //     // console.log("test1");
  //     this.vbRequestTotal = this.data.Amount + temp;
  //   }
  //   // else if (this.data.isGetPPn == true && this.data.isGetPPh == false) {
  //   //     var temp = this.data.Amount * 0.1;
  //   //     console.log("test2");
  //   //     this.vbRequestTotal = this.data.Amount + temp;
  //   // }
  //   // else if (this.data.isGetPPh == true) {
  //   //     console.log("test3");

  //   //     var cnt = this.data.incomeTaxRate / 100;
  //   //     var temp = this.data.Amount * cnt;

  //   //     if (this.data.IncomeTaxBy == "Dan Liris") {
  //   //         this.vbRequestTotal = this.data.Amount;
  //   //     }
  //   //     else {
  //   //         this.vbRequestTotal = this.data.Amount - temp;
  //   //     }

  //   // }
  //   else if (this.data.isGetPPh == true && this.data.isGetPPn == false) {
  //     // console.log("test4");

  //     var cnt = this.data.incomeTaxRate / 100;
  //     var temp = this.data.Amount * cnt;
  //     // console.log(this.data.IncomeTaxBy);
  //     if (this.data.IncomeTaxBy == "Dan Liris") {
  //       // console.log(this.data.Amount);
  //       this.vbRequestTotal = this.data.Amount;
  //       // return this.data.Amount;
  //       // return this.vbRequestTotal;
  //     }
  //     else if (this.data.IncomeTaxBy == "Supplier") {
  //       this.vbRequestTotal = this.data.Amount - temp;
  //       // return this.vbRequestTotal;
  //     }

  //   }

  //   else if (this.data.isGetPPn == true && this.data.isGetPPh == true) {
  //     // console.log("test5");
  //     var temp = this.data.Amount * 0.1;

  //     var cnt = this.data.incomeTaxRate / 100;
  //     var temp2 = this.data.Amount * cnt;

  //     // var temp_amt = cnt + temp2;
  //     if (this.data.IncomeTaxBy == "Dan Liris") {
  //       this.vbRequestTotal = this.data.Amount + temp;
  //     }
  //     else {
  //       this.vbRequestTotal = this.data.Amount + temp - temp2;
  //     }

  //   }
  //   else {
  //     // console.log("test6");
  //     this.vbRequestTotal = this.data.Amount;
  //     return this.vbRequestTotal;
  //   }



  // }

  // @computedFrom("data.isGetPPn || data.Amount || data.isGetPPh || data.IncomeTaxBy || data.incomeTaxRate")
  // get Total(){

  //     if(this.data.isGetPPn == true){
  //         var temp = this.data.Amount * 0.1;
  //         this.data.isGetPPh = false;
  //         return this.data.Amount + temp;
  //     }
  //     else if(this.data.isGetPPn == true && this.data.isGetPPh == false){
  //         var temp = this.data.Amount * 0.1;
  //         return this.data.Amount + temp;
  //     }
  //     else if(this.data.isGetPPh == true){

  //         var cnt = this.data.incomeTaxRate * 0.1;
  //         var temp = this.data.Amount * cnt;

  //         if(this.data.IncomeTaxBy == "Dan Liris"){
  //             return this.data.Amount
  //         }
  //         else{
  //             return this.data.Amount - temp;
  //         }       

  //     }
  //     else if(this.data.isGetPPh == true && this.data.isGetPPn == false){

  //         var cnt = this.data.incomeTaxRate * 0.1;
  //         var temp = this.data.Amount * cnt;

  //         if(this.data.IncomeTaxBy == "Dan Liris"){
  //             return this.data.Amount
  //         }
  //         else{
  //             return this.data.Amount - temp;
  //         }       

  //     }

  //     else if(this.data.isGetPPn == true && this.data.isGetPPh == true){


  //     }
  //     else{
  //         return this.data.Amount;
  //     }
  //     // return this.data.Amount; this.data.isGetPPn == false &&
  // }

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
      console.log(newValue);
      this.data.IncomeTaxBy = newValue
      this.calculateTotalAmount();
    }
    else {
      delete this.data.IncomeTaxBy;
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount() {
    if (this.data.IncomeTaxBy == "Supplier" && this.data.IncomeTax) {
      this.data.Total = this.data.Amount - (this.data.Amount * (this.data.IncomeTax.rate / 100))
    } else {
      this.data.Total = this.data.Amount;
    }
  }

  @bindable selectedIncomeTax;
  selectedIncomeTaxChanged(newValue) {
    // var _selectedIncomeTax = newValue;

    if (newValue) {
      // this.data.Amount = 
      // console.log(newValue);
      this.data.IncomeTax = newValue;
      this.calculateTotalAmount();
      // this.data.Amount = 
    } else {
      delete this.data.IncomeTax
      this.calculateTotalAmount();
    }

    // if (!_selectedIncomeTax) {
    //   this.data.incomeTaxRate = 0;
    //   this.data.useIncomeTax = false;
    //   this.data.incomeTax = {};
    //   this.data.incomeTaxBy = "";
    // } else if (_selectedIncomeTax._id || _selectedIncomeTax.Id) {
    //   this.data.incomeTaxRate = _selectedIncomeTax.rate ? _selectedIncomeTax.rate : 0;
    //   this.data.useIncomeTax = true;
    //   this.data.incomeTax = _selectedIncomeTax;
    //   this.data.incomeTax._id = _selectedIncomeTax.Id || _selectedIncomeTax._id;
    // }
  }

  @bindable selectedAmount;
  selectedAmountChanged(newValue) {
    if (newValue) {
      this.data.Amount = newValue;
      this.calculateTotalAmount();
    }
  }
}
