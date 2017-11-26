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
    if (!this.data.secondUomId) {
      this.data.secondUomId = "";
    } else {
      if (!this.data.selectedSecondUom) {
        this.selectedSecondUom = await this.service.getUomById(this.data.secondUomId);
        this.data.selectedSecondUom = this.selectedSecondUom;
      } else {
        this.selectedSecondUom = this.data.selectedSecondUom;
      }
    }
    if (!this.data.thirdUomId) {
      this.data.thirdUomId = "";
    } else {
      if (!this.data.selectedThirdUom) {
        this.selectedThirdUom = await this.service.getUomById(this.data.thirdUomId);
        this.data.selectedThirdUom = this.selectedThirdUom;
      } else {
        this.selectedThirdUom = this.data.selectedThirdUom;
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

  @bindable  selectedSecondUom;
  selectedSecondUomChanged(newValue, oldValue) {
    if (this.selectedSecondUom && this.selectedSecondUom._id) {
      this.data.secondUomId = this.selectedSecondUom._id;
      this.data.secondUom = this.selectedSecondUom.unit;
    }
    else {
      this.data.secondUomId = "";
      this.data.secondUom = "";
    }
  }

  @bindable  selectedThirdUom;
  selectedSecondUomChanged(newValue, oldValue) {
    if (this.selectedThirdUom && this.selectedThirdUom._id) {
      this.data.thirdUomId = this.selectedThirdUom._id;
      this.data.thirdUom = this.selectedThirdUom.unit;
    }
    else {
      this.data.thirdUomId = "";
      this.data.thirdUom = "";
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