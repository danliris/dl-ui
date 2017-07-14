export class UnitReceiptNoteItem {
  
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.readOnly = context.options.readOnly;
  }
  
  get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}

  get totalPrice(){
    return this.data.pricePerDealUnit * this.data.deliveredQuantity
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}