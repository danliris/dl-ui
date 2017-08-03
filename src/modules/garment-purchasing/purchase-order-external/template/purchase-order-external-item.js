import { bindable } from 'aurelia-framework'
var UomLoader = require('../../../../loader/uom-loader');

export class PurchaseOrderItem {
  @bindable selectedDealUom
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isUseIncomeTax = this.context.context.options.isUseIncomeTax || false;
    this.selectedDealUom = this.data.dealUom;
  }

  updatePrice() {
    if (this.data.useIncomeTax) {
      this.data.pricePerDealUnit = (100 * this.data.priceBeforeTax) / 110;
    } else {
      this.data.pricePerDealUnit = this.data.priceBeforeTax;
    }
  }

  selectedDealUomChanged(newValue) {
    if (newValue._id) {
      this.data.dealUom = newValue;
      if (newValue.unit)
        if (this.data.dealUom.unit == this.data.defaultUom.unit) {
          this.data.conversion = 1;
        }
    }
  }

  conversionChanged(e) {
    if (this.data.dealUom.unit)
      if (this.data.dealUom.unit == this.data.defaultUom.unit) {
        this.data.conversion = 1;
      }
  }

  priceBeforeTaxChanged(e) {
    this.updatePrice();
  }

  useIncomeTaxChanged(e) {
    this.updatePrice();
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return uom.unit
  }

  get prNo() {
    return `${this.data.prNo} - ${this.data.prRefNo}`;
  }

  get product() {
    return this.data.product.name;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}