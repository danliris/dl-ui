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
    return `${this.data.Product.Code} - ${this.data.Product.Name}`;
  }

  get uom() {
    return `${this.data.Uom.Unit}`;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}