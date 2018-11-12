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

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.isShowing = false;
    this.options = context.context.options;
    if (this.data.Id) {
      this.deliveryOrder =  this.data.deliveryOrder.doNo ;
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
            uoms: doFulfillment.smallUom,
            doQuantity: doFulfillment.doQuantity,
            pricePerDealUnit: doFulfillment.pricePerDealUnit,
            paymentDueDays: doItem.paymentDueDays,
            paymentMethod: doItem.paymentMethod,
            paymentType: doItem.paymentType,
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
    console.log(this.data);
  }

  get deliveryOrderLoader() { 
    return DeliveryOrderLoader;
  }
  doView = (dOrder) => {
    return`${dOrder.doNo}`
  }
  get filter() {
    
    if (this.options.supplierCode && this.options.useIncomeTax == false && this.options.useVat== false) {
     
          return {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"currencyCode":this.options.currencyCode };
         
         }
         else if(this.options.supplierCode && this.options.useIncomeTax  && this.options.useVat== false)
         { 
        
          return {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"currencyCode":this.options.currencyCode,"useIncomeTax":this.options.useIncomeTax }
         }
         else if(this.options.supplierCode && this.options.useVat && this.options.useIncomeTax ==false)
         {
     
          return {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"currencyCode":this.options.currencyCode,"useVat":this.options.useVat,"incomeTaxId":this.options.incomeTaxId }
         }
         else if(this.options.supplierCode && this.options.useIncomeTax  && this.options.useVat)
         {
         
          return {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false,"currencyCode":this.options.currencyCode,"useVat":this.options.useVat,"incomeTaxId":this.options.incomeTaxId,"useIncomeTax":this.options.useIncomeTax  }

         }
        }

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