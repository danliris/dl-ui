import {bindable} from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');
var UomLoader = require('../../../../loader/uom-loader');

export class PurchaseOrderItem {
  @bindable selectedDealUom
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isUseIncomeTax = this.context.context.options.isUseIncomeTax || false;
    if (this.data) {
      this.updateItem();
    }
  }

  updateItem() {
    if (this.data.dealQuantity === 0) {
      this.data.dealQuantity = this.data.defaultQuantity;
    }
    if (!this.data.dealUom.unit) {
      Object.assign(this.data.dealUom, this.data.defaultUom);
    }

    if (!this.error && this.data.priceBeforeTax === 0) {
      this.data.priceBeforeTax = this.data.product.price;
    }

    if (this.data.conversion === 0) {
      this.data.priceBeforeTax = this.data.product.price;
    }

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

  get productLoader() {
    return ProductLoader;
  }

  get uomLoader() {
    return UomLoader;
  }

  productView = (product) => {
    return `${product.code} - ${product.name}`
  }

  uomView = (uom) => {
    return uom.unit
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}