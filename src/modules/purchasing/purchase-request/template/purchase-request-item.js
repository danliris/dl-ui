import {bindable, inject, BindingEngine} from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-purchasing-null-tags-loader');

@inject(BindingEngine)
export class PurchaseRequestItem {
  @bindable dataProduct;

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }
  @bindable categoryCode;
  @bindable isPostedQuery;
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.categoryCode = this.context.context.options.categoryCode;
    if (!this.data.productId) {
      this.data.productId = {};
    }
    if (this.data.product) {
      this.dataProduct = this.data.product;
      this.updateTotalPrice();
    }
    this.quantitySubscription = this.bindingEngine.propertyObserver(this.data, 'quantity').subscribe(() => {
      this.updateTotalPrice();
    });

    this.isPostedQuery = {
    "Active": true,
    [`CategoryCode == "${this.categoryCode}"`]: true
  };

  }

  get productLoader() {
    return ProductLoader;
  }

  dataProductChanged(newValue) {
    this.data.product = newValue;
    if (this.data.product) {
      this.data.productId = this.data.product.Id || {};
      this.data.product._id = this.data.productId;
      this.data.product.uom = {
        _id: this.data.product.UOM.Id,
        unit: this.data.product.UOM.Unit
      };
      this.data.pricePerDealUnit = this.data.product.Price;
      this.data.currency = {
        _id: this.data.product.Currency.Id,
        code: this.data.product.Currency.Code,
        symbol: this.data.product.Currency.Symbol
      }
      this.updateTotalPrice();
      delete this.data.product.UOM._id;
    }
  }

  updateTotalPrice() {
    if (this.data.pricePerDealUnit && this.data.quantity) {
      let quantity = parseFloat(this.data.quantity.toString().replace(/,/g, '')) || 0;
      this.data.totalPrice = this.data.pricePerDealUnit * quantity;
    }
  }

  detached() {
    if (this.quantitySubscription) {
      this.quantitySubscription.dispose();
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}