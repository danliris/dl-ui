import { inject, bindable, containerless, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";
var ProductLoader = require('../../../../loader/product-loader');
var UomLoader = require('../../../../loader/uom-loader');

@containerless()
@inject(Service, BindingEngine)
export class InventoryDocumentItem {
  productFields = ["code", "name"];

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  async activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  async bind(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    if (!this.data.productId) {
      this.data.productId = "";
    } else {
      if (!this.data.selectedProduct) {
        this.selectedProduct = await this.service.getProductById(this.data.productId, this.productFields);
        this.data.selectedProduct = this.selectedProduct;
      } else {
        this.selectedProduct = this.data.selectedProduct;
      }
    }
    if (!this.data.uomId) {
      this.data.uomId = "";
    } else {
      if (!this.data.selectedUom) {
        this.selectedUom = await this.service.getUomById(this.data.uomId);
        this.data.selectedUom = this.selectedUom;
      } else {
        this.selectedUom = this.data.selectedUom;
      }
    }
  }

  @bindable selectedProduct;
  selectedProductChanged(newValue, oldValue) {
    if (this.selectedProduct && this.selectedProduct._id) {
      this.selectedUom = this.selectedProduct.uom;
      this.data.productId = this.selectedProduct._id;
      this.data.productCode = this.selectedProduct.code;
      this.data.productName = this.selectedProduct.name;
    }
    else {
      this.data.productId = "";
      this.data.productCode = "";
      this.data.productName = "";
    }
  }

  productView = (product) => {
    return `${product.code} - ${product.name}`;
  }

  get productLoader() {
    return ProductLoader;
  }

  @bindable selectedUom;
  selectedUomChanged(newValue, oldValue) {
    if (this.selectedUom && this.selectedUom._id) {
      this.data.uomId = this.selectedUom._id;
      this.data.uom = this.selectedUom.unit;
    }
    else {
      this.data.uomId = "";
      this.data.uom = "";
    }
  }

  uomView = (uom) => {
    return uom.unit;
  }

  get uomLoader() {
    return UomLoader;
  }

  controlOptions = {
    control: {
      length: 10
    }
  };
}