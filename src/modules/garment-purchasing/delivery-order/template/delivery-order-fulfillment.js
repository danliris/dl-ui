import { bindable, computedFrom } from 'aurelia-framework'
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
var ProductLoader = require('../../../../loader/product-loader');
var UomLoader = require('../../../../loader/uom-loader');

export class DeliveryOrderItem {
  isWarning = false;
  @bindable doQuantity;
  @bindable selectedDealUom;
            conversionError = '';

  async activate(context) {
    this.context = context;
    this.data = context.data;
    console.log(this.data);
    this.data.pricePerDealUnit = this.data.pricePerDealUnit.toLocaleString('en-EN', { minimumFractionDigits: 4 }).replace(",","");
    this.data.dealQuantity = this.data.dealQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 }).replace(",","");
    // this.data.conversion = this.data.conversion.toLocaleString('en-EN', { minimumFractionDigits: 2 }).replace(",","");
    this.data.doQuantity = this.data.doQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 }).replace(",","");
    this.data.doQuantityRemains = this.data.doQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 }).replace(",","")
    // this.data.remark = this.data.productRemark;
    this.error = context.error;
    this.options = context.options;
    this.hasView = this.context.context.options.hasView;
    this.hasEdit = this.context.context.options.hasEdit;
    this.hasCreate = this.context.context.options.hasCreate;
    this.hasEdit = this.context.context.options.hasEdit;

    if (!this.hasCreate) {
      this.data.remark = this.data.productRemark;
      };
    // this.data.isSave=false;
    this.isEdit = this.context.context.options.isEdit || false;
    if (this.data) {
        if((this.hasEdit || this.hasView) && this.data.errorCount<1){
          this.data.isSave=true;
        }
        if(this.data.purchaseOrderUom){
          this.selectedDealUom=this.data.purchaseOrderUom;
        }
      this.doQuantity=this.data.doQuantity;
      // if(this.data.conversion){
      //   this.data.conversion=this.data.conversion.toLocaleString('en-EN', { minimumFractionDigits: 10 });}
      if(this.data.pricePerDealUnit){
        this.data.pricePerDealUnit=this.data.pricePerDealUnit.toLocaleString('en-EN',  { minimumFractionDigits: 4 });}
      if(this.data.dealQuantity){
        this.data.dealQuantity=this.data.dealQuantity.toLocaleString('en-EN', { minimumFractionDigits: 10 });}
        } else {
      this.data.doQuantity = 0;
    }

    if (this.hasCreate) {
      await this.loadConversion();
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

  doQuantityChanged(newValue) {
    if(!this.error){
      this.error={};
    }
    console.log(this.data.doQuantityRemains);
    if (typeof newValue === "number" && !this.context.context.options.hasView) {
      if(newValue==0){
        this.error.doQuantity = "DoQuantity harus > 0";
        this.data.doQuantity = newValue;
        this.isWarning=false;
      } else {
        // if(this.data.dealQuantity<newValue){
        //   this.isWarning=true;
        // } else {
        //   this.isWarning=false;
        // }

        if(this.data.doQuantityRemains<newValue){
          this.isWarning=true;
        } else {
          this.isWarning=false;
        }
        this.data.doQuantity=newValue;
        this.error.doQuantity=null;
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
      this.error.doQuantity=null;
    }
  }

  conversionChanged(e) {
    if(!this.error)
      this.error={};
    if(!this.context.context.options.hasView){
      if(this.data.conversion%1>=0){
        if(this.data.purchaseOrderUom.Unit==this.data.smallUom.Unit && Number(this.data.conversion)!=1){
          this.error.conversion="Konversi harus 1";
        }
        else {
          if(!((this.data.conversion.length<=16 && this.data.conversion.indexOf(".")>0) || (this.data.conversion.length<=15 && this.data.conversion.indexOf(".")<0))){
            this.error.conversion="Konversi tidak boleh lebih dari 15 digit";
          }
          else if(this.data.conversion==0 || this.data.conversion=='0'){
            this.error.conversion="Conversion can not 0";
          }
          else {
            this.error.conversion=null;
          }
        }
      }
      else {
        this.error.conversion="Konversi Harus Diisi Dengan Angka";
      }
      this.data.conversion=e.srcElement.value;
    }
  }

    selectedDealUomChanged(newValue) {
    if (newValue && newValue.Id) {
      this.data.purchaseOrderUom = newValue;
      if (this.data && !this.hasView) this.loadConversion();
    }
  }

    @computedFrom("data.conversion")
  get conversionText() {
    var v = Number(this.data.conversion);
    if (isNaN(v)) return '';
    return v.toLocaleString('id-ID', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  }

  async findConversion(big, small) {
    var endpoint = Container.instance.get(Config).getEndpoint("core");
    var unitOf = (u) => (u.Unit || u.unit || '').toString().trim().toUpperCase();
    var result = await endpoint.find('master/uom-conversions', { keyword: unitOf(big), size: 100 });
    var list = (result && result.data) || [];
    return list.find(c =>
      (c.BigUomId === big.Id || (c.BigUomUnit || '').trim().toUpperCase() === unitOf(big)) &&
      (c.SmallUomId === small.Id || (c.SmallUomUnit || '').trim().toUpperCase() === unitOf(small))
    );
  }

  async loadConversion() {
    if (!this.data) return;
    var big = this.data.purchaseOrderUom;
    var small = this.data.smallUom;
    if (!big || !small) return;

    var norm = (u) => (u.Unit || u.unit || '').toString().trim().toUpperCase();
    if (big.Id === small.Id || norm(big) === norm(small)) {
      this.data.conversion = 1;
      this.data.conversionMissing = false;
      this.conversionError = '';
    } else {
      try {
        var found = await this.findConversion(big, small);
        if (found) {
          this.data.conversion = Number(found.Value);
          this.data.conversionMissing = false;
          this.conversionError = '';
        } else {
          this.data.conversionMissing = true;
          this.conversionError = 'Master Satuan Konversi harus diisi';
        }
      } catch (e) {
        this.data.conversionMissing = true;
        this.conversionError = 'Gagal mengambil Master Satuan Konversi';
      }
    }
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return uom.Unit
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}