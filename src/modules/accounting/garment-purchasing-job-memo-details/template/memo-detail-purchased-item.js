import { inject, bindable} from 'aurelia-framework'
import { Service, ServiceProduct } from '../service';

var GarmentDebtLoader = require('../../../../loader/garment-debt-loader');

@inject(Service)
export class MemoDetailPurchasedItem {
  @bindable dataDebt;

  get garmenDebtLoader() {
    return GarmentDebtLoader;
  }

  activate(context) {
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
    this.data.items = newValue;
    if (this.data.items) {
      this.data.GarmentDeliveryOrderNo = this.data.items.GarmentDeliveryOrderNo || {};
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}