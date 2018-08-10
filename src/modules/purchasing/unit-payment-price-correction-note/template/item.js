import {bindable} from 'aurelia-framework'
export class UnitReceiptNoteItem {
  @bindable pricePerDealUnitAfter
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.readOnly = context.options.readOnly;
    this.pricePerUnitCorrectionReadOnly = this.context.context.options;
    this.totalPrice=this.data.priceTotalAfter;
    this.pricePerDealUnitAfter=this.data.pricePerDealUnitAfter;
  }
  
  get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}

  // get totalPrice(){
  //   this.data.priceTotalAfter=this.data.quantity * this.data.pricePerDealUnitAfter;
  //   return this.data.priceTotalAfter
  // }

  pricePerDealUnitAfterChanged(newValue){
    if(!this.readOnly){
      this.data.priceTotalAfter=this.data.quantity * newValue;
      this.totalPrice=this.data.priceTotalAfter;
      this.data.pricePerDealUnitAfter=newValue;
    }
    
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}