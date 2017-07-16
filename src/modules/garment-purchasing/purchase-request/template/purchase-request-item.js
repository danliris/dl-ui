import {bindable} from 'aurelia-framework'

export class PurchaseRequestItem {
  activate(context) {
    this.data = context.data;
    this.options = context.options; 
  }

  get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}

  get uom() {
		return `${this.data.uom.unit}`;
	}

  controlOptions = {
    control: {
      length: 12
    }
  };
}