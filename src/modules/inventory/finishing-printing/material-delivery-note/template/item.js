import { bindable, computedFrom } from 'aurelia-framework';

export class Item {
  constructor() {
    this.error = {};
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.WeightBruto = this.data.WeightBruto;

  }

  @computedFrom("data.weightBale")
  get getTotal() {
    this.data.getTotal = 0;
    if (this.data.weightBale) {
      this.data.getTotal = this.data.weightBale * 217.7243376;
    }
    else{
      this.data.getTotal = 0;
    }

    return this.data.getTotal;
  }
}
