import {bindable} from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');

export class TransferRequestItem {
  
    gradeOptions=["A","B","C"];
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
    if (!this.data.productId) {
      this.data.productId = {};
    }
    this.data.status="Belum diterima Pembelian";

    if(this.data.Id){
        this.data.product.toString = function () {
            return [this.code, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }

        this.data.product.uom=this.data.uom;
    }
  }

  get productLoader() {
    return ProductLoader;
  }

  productChanged(e) {
    if (this.data.product){
      this.data.productId = this.data.product._id ? this.data.product._id : {};
      this.data.uom=this.data.product.uom ? this.data.product.uom:{};
    }
  }

  productView = (product) => {
      return `${product.code}-${product.name}`;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}