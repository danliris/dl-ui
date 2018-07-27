export class UnitReceiptNoteItem {
  
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.readOnly = context.options.readOnly;
    this.pricePerUnitCorrectionReadOnly = this.context.context.options;
  }
  
  get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}

  // get totalPrice(){
  //   return this.data.pricePerDealUnit * this.data.deliveredQuantity
  // }

  pricePerDealUnitAfterChanged(e){
    if(this.pricePerUnitCorrectionReadOnly && !this.readOnly)
      this.data.priceTotalAfter=this.data.quantity * this.data.pricePerDealUnitAfter;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}