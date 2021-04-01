import { inject, bindable} from 'aurelia-framework'
import { Service } from '../service';

var GarmentDebtLoader = require('../../../../loader/garment-debt-loader');

@inject(Service)
export class MemoDetailPurchasedItem {
  @bindable dataDebt;

  get garmenDebtLoader() {
    return GarmentDebtLoader;
  }

  constructor() {}

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
    if (!this.data.MemoDetailGarmentPurchasingDetail) {
      this.data.MemoDetailGarmentPurchasingDetail = {};
    }
    if (this.data.MemoDetailGarmentPurchasingDetail) {
      this.dataDebt = this.data.MemoDetailGarmentPurchasingDetail;
    }
  }

  dataDebtChanged(newValue) {
    this.data.MemoDetailGarmentPurchasingDetail = newValue;
    if (this.data.MemoDetailGarmentPurchasingDetail) {
      this.data.GarmentDeliveryOrderNo = this.data.MemoDetailGarmentPurchasingDetail.GarmentDeliveryOrderNo || {};
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}