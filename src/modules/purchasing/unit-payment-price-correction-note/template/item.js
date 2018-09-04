import {bindable} from 'aurelia-framework'
export class UnitReceiptNoteItem {
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.readOnly = context.options.readOnly;
    this.pricePerUnitCorrectionReadOnly = this.context.context.options;
    this.pricePerUnit = this.data.pricePerUnit || 0;
  }
  
  get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}

  @bindable pricePerUnit
  pricePerUnitChanged(newValue,oldValue){
    this.data.pricePerUnit = newValue;
    this.data.priceTotal = this.data.quantity * newValue;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}