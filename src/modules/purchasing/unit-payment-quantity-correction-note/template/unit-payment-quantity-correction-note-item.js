import {bindable} from 'aurelia-framework'

export class UnitPaymentQuantityCorrectionNoteItem {

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
   console.log(this.data);
  }
    controlOptions = {
    control: {
      length: 12
    }
  };
  quantityChanged(e) {
    // console.log(e.target.value);
    this.data.priceTotalAfter = this.data.pricePerDealUnitAfter * e.target.value;
    // console.log(this.data);
  }
  
}