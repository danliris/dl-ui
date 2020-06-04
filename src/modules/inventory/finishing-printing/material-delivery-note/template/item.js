import { bindable, computedFrom } from 'aurelia-framework';

//var CurrencyLoader = require('../../../../loader/currency-loader');

export class Item {
  constructor() {
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.WeightBruto = this.data.WeightBruto;

  }

  // // get currencyLoader() {
  // //     return CurrencyLoader;
  // // }

  // @bindable selectedCurrency;
  // selectedCurrencyChanged(newValue, oldValue) {
  //     this.data.Currency = newValue;
  // }

  @computedFrom("data.WeightBale")
  get getTotal() {
    this.data.getTotal = 0;
    if (this.data.WeightBale) {
      this.data.getTotal = this.data.WeightBale * 217.7243376;
    }
    else{
      this.data.getTotal = 0;
    }

    return this.data.getTotal;
  }
}
