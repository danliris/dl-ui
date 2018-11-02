import { bindable } from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');
var UomLoader = require('../../../../loader/uom-loader');

export class DeliveryOrderItem {
  isWarning = false;
  @bindable deliveredQuantity;

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.hasView = this.context.context.options.hasView;
    this.hasEdit = this.context.context.options.hasEdit;
    this.hasCreate = this.context.context.options.hasCreate;
    this.hasEdit = this.context.context.options.hasEdit;
    // this.data.isSave=false;
    this.isEdit = this.context.context.options.isEdit || false;
    if (this.data) {
      if(this.hasEdit){
        this.data.isSave=true;
      }
      if(this.data.doQuantity>=0){
        this.data.doQuantity = (Number(this.data.dealQuantity) - Number(this.data.doQuantity)).toLocaleString('en-EN', { minimumFractionDigits: 2 });
      }
      if(this.data.conversion)
        this.data.conversion=this.data.conversion.toLocaleString('en-EN', { minimumFractionDigits: 2 });
      if(this.data.pricePerDealUnit)
        this.data.pricePerDealUnit=this.data.pricePerDealUnit.toLocaleString('en-EN', { minimumFractionDigits: 4 });
      if(this.data.dealQuantity)  
        this.data.dealQuantity=this.data.dealQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
      
    } else {
      this.data.doQuantity = 0;
    }
    this.data.priceTotal = this.data.dealQuantity * this.data.pricePerDealUnit;
    this.data.smallQuantity = this.data.doQuantity * this.data.conversion;
    
    // if (!this.options.readOnly) {
    //   if (this.data.remainsQuantity < this.data.deliveredQuantity) {
    //     this.isWarning = true
    //   }
    //   else {
    //     this.isWarning = false;
    //   }
    // }
  }

  get quantityConversion() {
    return (this.data.doQuantity * this.data.conversion).toLocaleString('en-EN', { minimumFractionDigits: 2 })
  }

  get priceTotal() {
    return (this.data.dealQuantity * this.data.pricePerDealUnit).toLocaleString('en-EN', { minimumFractionDigits: 2 });
  }

  get productLoader() {
    return ProductLoader;
  }

  productView = (product) => {
    return `${product.Code} - ${product.Name}`
  }

  doQuantityChanged(e) {
    this.error={};
    if(this.data.dealQuantity-(e.srcElement.value+this.data.doQuantity)<0){
      this.error.doQuantity="Jumlah diterima lebih besar dari jumlah dipesan";
    }
  }

  conversionChanged(e) {
    this.error={};
    
    if(this.data.conversion%1>=0){
      if(!((this.data.conversion.length<=16 && this.data.conversion.indexOf(".")>0) || (this.data.conversion.length<=15 && this.data.conversion.indexOf(".")<0))){
        this.error.conversion="Konversi tidak boleh lebih dari 15 digit";
      }
    }
    else {
      this.error.conversion="Konversi Harus Diisi Dengan Angka";
    }
    
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}