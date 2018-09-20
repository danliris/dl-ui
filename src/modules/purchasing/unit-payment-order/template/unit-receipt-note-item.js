export class UnitReceiptNoteItem {
  
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.readOnly = context.options.readOnly;
    if(this.data.deliveredQuantity){
      this.data.deliveredQuantity=this.data.deliveredQuantity.toLocaleString('en-EN', { minimumFractionDigits: 4 });
    }
  }
  
  get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}

  get totalPrice(){
    return this.data.pricePerDealUnit * parseFloat(this.data.deliveredQuantity);
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}