import { bindable } from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');
var UomLoader = require('../../../../loader/uom-loader');

export class DeliveryOrderItem {
  isWarning = false;
  @bindable doQuantity;
  @bindable selectedDealUom;

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.data.pricePerDealUnit = this.data.pricePerDealUnit.toLocaleString('en-EN', { minimumFractionDigits: 4 }).replace(",","");
    this.data.dealQuantity = this.data.dealQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 }).replace(",","");
    this.data.conversion = this.data.conversion.toLocaleString('en-EN', { minimumFractionDigits: 2 }).replace(",","");
    this.data.doQuantity = this.data.doQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 }).replace(",","");
    this.error = context.error;
    this.options = context.options;
    this.hasView = this.context.context.options.hasView;
    this.hasEdit = this.context.context.options.hasEdit;
    this.hasCreate = this.context.context.options.hasCreate;
    this.hasEdit = this.context.context.options.hasEdit;
    this.data.isSave=false;
    this.isEdit = this.context.context.options.isEdit || false;
    if (this.data) {
      if(this.context.context.options.hasCreate){
        if(this.data.doQuantity>=0){
          this.data.doQuantity = Number(this.data.dealQuantity)-Number(this.data.doQuantity);
          this.doQuantity=this.data.doQuantity;
        }
      } else if(!this.context.context.options.hasCreate){
        if(this.hasEdit){
          this.data.isSave=true;
        }
        if(this.data.doQuantity>=0){
          this.doQuantity=this.data.doQuantity;
        }
      }
      if(this.data.conversion){
        this.data.conversion=this.data.conversion.toLocaleString('en-EN', { minimumFractionDigits: 10 });}
      if(this.data.pricePerDealUnit){
        this.data.pricePerDealUnit=this.data.pricePerDealUnit.toLocaleString('en-EN',  { minimumFractionDigits: 4 });}
      if(this.data.dealQuantity){
        this.data.dealQuantity=this.data.dealQuantity.toLocaleString('en-EN', { minimumFractionDigits: 10 });}

      this.selectedDealUom = this.data.purchaseOrderUom;
    
    } else {
      this.data.doQuantity = 0;
    }
  }

  get smallQuantity() {
    this.data.smallQuantity= this.data.doQuantity * this.data.conversion;
    return (Number(this.data.doQuantity) * Number(this.data.conversion)).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  })
  }

  get priceTotal() {
    this.data.priceTotal = this.data.doQuantity * this.data.pricePerDealUnit;
    return (Number(this.data.doQuantity) * Number(this.data.pricePerDealUnit)).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });
  }

  get productLoader() {
    return ProductLoader;
  }

  productView = (product) => {
    return `${product.Code} - ${product.Name}`
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return uom.unit ? uom.unit : uom.Unit;
  }

  selectedDealUomChanged(newValue) {
    if (newValue._id || newValue.Id ) {
      if (newValue.Unit)
        if (this.data.purchaseOrderUom.Unit == newValue.Unit) {
          this.data.conversion = 1;
        } else {
          this.data.conversion = 0;
        }
        this.data.purchaseOrderUom=newValue;
    }
  }

  doQuantityChanged(newValue) {
    if(!this.error){
      this.error={};
    }
    if (typeof newValue === "number" && !this.context.context.options.hasView) {
      if(this.data.dealQuantity<newValue){
        this.isWarning=true;
        this.data.doQuantity=newValue;
      } else {
        this.isWarning=false;
        this.data.doQuantity=newValue;
      }
    } else {
      if (this.isWarning) {
        this.isWarning = false;
      }
      if (newValue === null) {
        this.doQuantity = 0
      } else {
        this.doQuantity = newValue;
      }
    }
  }

  conversionChanged(e) {
    if(!this.error)
      this.error={};
    if(!this.context.context.options.hasView){
      if(this.data.conversion%1>=0){
        if(!((this.data.conversion.length<=16 && this.data.conversion.indexOf(".")>0) || (this.data.conversion.length<=15 && this.data.conversion.indexOf(".")<0))){
          this.error.conversion="Konversi tidak boleh lebih dari 15 digit";
        }
        else if(this.data.conversion==0 || this.data.conversion=='0'){
          this.error.conversion="Conversion can not 0";
        }
        else {
          this.error={};
        }
      }
      else {
        this.error.conversion="Konversi Harus Diisi Dengan Angka";
      }
      this.data.conversion=e.srcElement.value;
    }
    // this.data.priceTotal=this.doQuantity*this.conversion;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}