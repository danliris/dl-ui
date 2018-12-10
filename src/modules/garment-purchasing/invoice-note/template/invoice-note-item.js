import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
import { Currency } from '../../../master/product-budgeting/template/currency';
var DeliveryOrderLoader = require('../../../../loader/garment-delivery-order-by-supplier-loader')

@containerless()
@inject(BindingEngine, Service)
export class DeliveryOrderItem {
  @bindable deliveryOrder;
  itemsColumns = [
    { header: "Nomor PO Eksternal" },
    { header: "Nomor RO" },
    { header: "Nomor PR" },
    { header: "Nomor Ref PR" },
    { header: "Kode - Nama Barang" },
    { header: "Jumlah" },
    { header: "Satuan" },
    { header: "Harga Satuan" },
    { header: "Harga Total" }
  ]

  constructor(bindingEngine, service) {
    this.bindingEngine = bindingEngine;
    this.service = service;
  }

  @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.isShowing = false;
    this.options = context.context.options;
    
    if(this.data.deliveryOrder){
      this.data.deliveryOrder.totalAmount=this.data.deliveryOrder.totalAmount.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
  
    }
   
    if (this.data.Id) {
      console.log(this.data);
      this.deliveryOrder =  this.data.deliveryOrder.doNo ;
       this.data.deliveryOrder.totalAmount= this.data.deliveryOrder.totalAmount.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
    }
    this.filter={};
    if (this.options.supplierCode && this.options.currencyCode && !this.options.useIncomeTax) {
      this.filter= {  
        "IsInvoice": false,  
        "supplierCode": this.options.supplierCode,
        "IsDeleted" :false,
        "DOCurrencyCode":this.options.currencyCode,
        "useVat":this.options.useVat, 
        "useIncomeTax":false
      };
    }
    else if(this.options.supplierCode && this.options.currencyCode && this.options.useIncomeTax ){
      if(this.options.incomeTaxId==undefined)
      {
        this.options.incomeTaxId ="";
        this.options.incomeTaxName="";
      }
      this.filter= {  
        "IsInvoice": false,  
        "supplierCode": this.options.supplierCode,
        "IsDeleted" :false,
        "DOCurrencyCode":this.options.currencyCode,
        "useVat":this.options.useVat,
        "incomeTaxId":this.options.incomeTaxId,
        "useIncomeTax":this.options.useIncomeTax  ,
        "incomeTaxName":this.options.incomeTaxName
      }
      console.log(this.filter);
    }
    // if (this.options.supplierCode && this.options.useIncomeTax == false && this.options.useVat== false) {
     
    //   this.filter= {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useVat":false, "useIncomeTax":false};
    
    // }
    // else if(this.options.supplierCode && this.options.useIncomeTax  && this.options.useVat== false)
    // { 
  
    //   this.filter= {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useIncomeTax":this.options.useIncomeTax }
    // }
    // else if(this.options.supplierCode && this.options.useVat && this.options.useIncomeTax ==false)
    // {

    //   this.filter= {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useVat":this.options.useVat,"incomeTaxId":this.options.incomeTaxId }
    // }
    // else if(this.options.supplierCode && this.options.useIncomeTax  && this.options.useVat)
    // {
    
    //   this.filter= {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useVat":this.options.useVat,"incomeTaxId":this.options.incomeTaxId,"useIncomeTax":this.options.useIncomeTax  }

    // }
    
    for(var Do of this.context.context.items){
      if(Do.data.deliveryOrder)
        this.filter[`doNo == "${Do.data.deliveryOrder.doNo}"`]=false;

    }
  }

  deliveryOrderChanged(newValue, oldValue) {
    this.data.details = []; 
    if (this.deliveryOrder && this.deliveryOrder.Id) {
    
     for(var doItem of newValue.items){
       for(var doFulfillment of doItem.fulfillments)
       {
          var details={
            ePOId: doItem.purchaseOrderExternal.Id,
            ePONo: doItem.purchaseOrderExternal.no,
            pOId: doFulfillment.pOId,
            pRItemId: doFulfillment.pRItemId,
            pRNo: doFulfillment.pRNo,
            pOSerialNumber: doFulfillment.poSerialNumber,
            roNo: doFulfillment.rONo,
            product: doFulfillment.product,
            uoms: doFulfillment.purchaseOrderUom,
            doQuantity: doFulfillment.doQuantity,
            pricePerDealUnit: doFulfillment.pricePerDealUnit,
            paymentDueDays: doItem.paymentDueDays,
            paymentMethod: newValue.paymentMethod,
            paymentType: newValue.paymentType,
            useVat:doItem.useVat,
            useIncomeTax: doItem.useIncomeTax,
            dODetailDOId:doFulfillment.Id
          };
          
            this.data.details.push(details);
           
        }
      }
      this.data.Id = this.deliveryOrder.Id;
      this.data.doDate = this.deliveryOrder.doDate;
      this.data.arrivalDate = this.deliveryOrder.arrivalDate;
      this.deliveryOrder.totalAmount=  this.deliveryOrder.totalAmount.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
     
      this.data.totalAmount=this.deliveryOrder.totalAmount;
      this.data.deliveryOrder=this.deliveryOrder;
    }
    else {

      this.data.arrivalDate = undefined;
      this.data.Id = "";
      this.data.doNo = "";
      this.data.currency="";
      this.data.doDate = undefined;
      this.data.items = [];
    }
  }

  get deliveryOrderLoader() { 
    return DeliveryOrderLoader;
  }
  doView = (dOrder) => {
    return`${dOrder.doNo}`
  }
  // get filter() {
    
  //   if (this.options.supplierCode && this.options.useIncomeTax == false && this.options.useVat== false) {
     
  //       return {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useVat":false, "useIncomeTax":false};

         
  //        }
  //        else if(this.options.supplierCode && this.options.useIncomeTax  && this.options.useVat== false)
  //        { 
        
  //         return {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useIncomeTax":this.options.useIncomeTax }
  //        }
  //        else if(this.options.supplierCode && this.options.useVat && this.options.useIncomeTax ==false)
  //        {
     
  //         return {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useVat":this.options.useVat,"incomeTaxId":this.options.incomeTaxId }
  //        }
  //        else if(this.options.supplierCode && this.options.useIncomeTax  && this.options.useVat)
  //        {
         
  //         return {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"DOCurrencyCode":this.options.currencyCode,"useVat":this.options.useVat,"incomeTaxId":this.options.incomeTaxId,"useIncomeTax":this.options.useIncomeTax  }

  //        }
  //       }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}