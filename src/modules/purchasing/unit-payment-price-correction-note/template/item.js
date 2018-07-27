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

  get totalPrice(){
    this.data.priceTotalAfter=this.data.quantity * this.data.pricePerDealUnitAfter;
    return this.data.priceTotalAfter
  }

  // pricePerDealUnitAfterChanged(e){
  //   if(!this.pricePerUnitCorrectionReadOnly){
  //     this.data.priceTotalAfter=this.data.quantity * this.data.pricePerDealUnitAfter;
      
  //   console.log(this.data.pricePerDealUnitAfter )
  //   }
  // }

  controlOptions = {
    control: {
      length: 12
    }
  };
}