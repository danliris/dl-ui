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
    this.useVat = this.context.context.options.useVat || false;
    if(!this.useVat){
      this.data.includePpn=false;
    }
    if (this.data) {
      this.updateItem();
    }
  }

  updateItem() {
    if (!this.data.dealQuantity || this.data.dealQuantity === 0) {
      this.data.dealQuantity = this.data.defaultQuantity;
    }
    if (!this.data.dealUom) {
      this.data.dealUom={};
      Object.assign(this.data.dealUom, this.data.defaultUom);
    }
    if (!this.error && this.data.priceBeforeTax === 0) {
      this.data.priceBeforeTax = this.data.product.price;
    }

    if (!this.data.conversion || this.data.conversion === 0) {
      this.data.priceBeforeTax = this.data.product.price;
    }

    this.selectedDealUom = this.data.dealUom;
    if(!this.data.defaultUom){
      this.data.defaultUom=this.data.product.uom;
      if(!this.data.conversion || this.data.conversion === 0)
        if (this.data.dealUom.unit == this.data.defaultUom.unit) {
              this.data.conversion = 1;
        }
    }
    else{
      if (this.data.dealUom.unit == this.data.defaultUom.unit) {
              this.data.conversion = 1;
        }
    }
  }

  updatePrice() {
    if (this.data.includePpn) {
      this.data.pricePerDealUnit = (100 * this.data.priceBeforeTax) / 110;
    } else {
      this.data.pricePerDealUnit = this.data.priceBeforeTax;
    }
  }

  selectedDealUomChanged(newValue) {
    console.log(newValue)
    if (newValue._id || newValue.Id ) {
      this.data.dealUom = newValue;
      if (newValue.Unit)
        if (this.data.dealUom.Unit == this.data.defaultUom.Unit || this.data.dealUom.unit == this.data.defaultUom.unit) {
          this.data.conversion = 1;
        }
        this.data.dealUom._id=newValue.Id;
        this.data.dealUom.unit=newValue.Unit;
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
    return uom.unit ? uom.unit : uom.Unit;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}