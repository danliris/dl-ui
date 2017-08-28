import {bindable} from 'aurelia-framework'

export class PurchaseRequestItem {
  activate(context) {
    this.data = context.data;
    this.options = context.options;
    this.error = context.error;
  }

  get category() {
    return `${this.data.category.name}`;
  }

  get product() {
    return `${this.data.product.code} - ${this.data.product.name}`;
  }

  get uom() {
    return `${this.data.defaultUom.unit}`;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}