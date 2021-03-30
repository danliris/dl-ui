import { inject, bindable} from 'aurelia-framework'
import { Service, ServiceProduct } from '../service';

var ProductLoader = require('../../../../loader/product-purchasing-null-tags-loader');
var GarmentDebtLoader = require('../../../../loader/garment-debt-loader');

@inject(ServiceProduct, Service)
export class MemoDetailPurchasedItem {
  @bindable dataDebt;

  get garmenDebtLoader() {
    return GarmentDebtLoader;
  }

  activate(context) {
    console.log(context);
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
    if (!this.data.items) {
      this.data.items = {};
    }
    if (this.data.items) {
      this.dataDebt = this.data.items;
    }
  }

  dataDebtChanged(newValue) {
    console.log(newValue);
    this.data.items = newValue;
    if (this.data.items) {
      this.data.items.total = this.data.items.debitNominal * this.data.items.CurrencyRate;
      this.data.GarmentDeliveryOrderNo = this.data.GarmentDeliveryOrderNo || {};
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}