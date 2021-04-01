import { inject, bindable} from 'aurelia-framework'
import { Service } from '../service';

var GarmentDebtLoader = require('../../../../loader/garment-debt-loader');

@inject(Service)
export class MemoDetailPurchasedItem {
  @bindable dataDebt;

  get garmenDebtLoader() {
    return GarmentDebtLoader;
  }

  constructor() {
    if (this.data) {
      this.dataDebt = this.data.GarmentDeliveryOrderNo;
    }
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    if (!this.data) {
      this.data.MemoDetailGarmentPurchasingDetail = {};
    }
  }

  dataDebtChanged(newValue) {
    if (newValue !== null) {
      this.data.InternalNoteNo = newValue.InternalNoteNo;
      this.data.BillsNo = newValue.BillsNo;
      this.data.PaymentBills = newValue.PaymentBills;
      this.data.SupplierCode = newValue.SupplierCode;
      this.data.CurrencyCode = newValue.CurrencyCode;
      this.data.PurchasingRate = newValue.CurrencyRate;
      this.data.SaldoAkhir = newValue.DPPAmount + newValue.VATAmount - newValue.IncomeTaxAmount;
      this.data.MemoAmount = 0;
    }

    this.dataDebtModel.editorValue = "";
    this.dataDebtModel.valueChanged();
  }

  get getAmountIdr() {
    return (this.data.MemoAmount * this.data.PurchasingRate) || 0;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}