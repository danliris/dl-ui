import { inject, bindable } from "aurelia-framework";

var UomLoader = require("../../../../loader/uom-loader");

export class SalesInvoce {
  @bindable Total;
  @bindable Price;

  activate(context) {
    // this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.readOnly = context.options.readOnly;

    this.Total = this.data.Total;
    this.Price = this.data.Price;
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;
    if (this.data.UomId && this.data.UomUnit) {
      this.selectedUom = {
        'Id': this.data.UomId,
        'Unit': this.data.UomUnit
      };
    }
  }

  TotalChanged(newValue, oldValue) {
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;
    this.data.Total = this.Total;
  }

  PriceChanged(newValue, oldValue) {
    this.getAmount = this.Total * this.Price;
    this.data.Amount = this.getAmount;
    this.data.Price = this.Price;
  }

  AmountChanged(newValue, oldValue) {
    this.data.Amount = this.getAmount;
  }

  @bindable selectedUom;
  selectedUomChanged(newValue, oldValue) {
    if (this.selectedUom && this.selectedUom.Id) {
      this.data.UomId = this.selectedUom.Id;
      this.data.UomUnit = this.selectedUom.Unit;
    } else {
      this.data.UomId = null;
      this.data.UomUnit = null;
    }
  }

  get uomLoader() {
    return UomLoader;
  }

  handleDataTypeChange() {
    this.data.DefaultValue = "";
    this.data.UomUnit = this.selectedUom.Unit;
  }
}
