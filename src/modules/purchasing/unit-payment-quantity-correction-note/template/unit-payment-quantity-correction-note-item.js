import {bindable} from 'aurelia-framework'

export class UnitPaymentQuantityCorrectionNoteItem {

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
  }
    controlOptions = {
    control: {
      length: 12
    }
  };
  quantityChanged(e) {
    this.data.priceTotalAfter = this.data.pricePerDealUnitAfter * e.target.value;
  }
  
}