import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
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
   
    if (this.data) {
      this.deliveryOrder = { doNo: this.data.doNo }
    }
  }

  // get total() {
  //   if (this.data.items) {
  //     if (this.data.items.length > 0) {
  //       var qty = this.data.items
  //         .map((item) => Number.isInteger(item.pricePerDealUnit * item.deliveredQuantity) ? item.pricePerDealUnit * item.deliveredQuantity : Number((item.pricePerDealUnit * item.deliveredQuantity).toFixed(2)))
  //        // .map((item) => Number.isInteger(item.totalAmount(2)))
  //       return qty
  //         .reduce((prev, curr, index) => { return prev + curr }, 0);
  //     } else {
  //       return 0;
  //     }
  //   } else {
  //     return 0;
  //   }
  // }

  deliveryOrderChanged(newValue, oldValue) {
    console.log(this.data);
    this.data.details = [];
    if (this.deliveryOrder && this.deliveryOrder.Id) {
     for(var doItem of newValue.items){
       for(var doFulfillment of doItem.fulfillments)
       {
          var details={
            ePOId: doItem.purchaseOrderExternal.Id,
            ePONo: doItem.purchaseOrderExternal.no,
            pOId: doFulfillment.pOId,
            //pONo: doItem.pONo,
            pRItemId: doFulfillment.pRItemId,
            pRNo: doFulfillment.pRNo,
            poSerialNumber: doFulfillment.poSerialNumber,
            roNo: doFulfillment.rONo,
            product: doFulfillment.product,
            //purchaseOrderQuantity: doFulfillment.doQuantity,
            uoms: doFulfillment.smallUom,
            doQuantity: doFulfillment.doQuantity,
            pricePerDealUnit: doFulfillment.PricePerDealUnit,
            paymentMethod: doItem.paymentMethod,
            paymentType: doItem.paymentType,
            paymentDueDays: doItem.paymentDueDays,
            useVat:doItem.usevat,
            useIncomeTax: doItem.useIncomeTax
          };
          this.data.details.push(details);
        }
      }
        // fulfillment = [].concat.apply([], fulfillment);
        // return fulfillment;
     
     
     //items = [].concat.apply([], items);

      // this.data.deliveryOrder = this.deliveryOrder;
      this.data.Id = this.deliveryOrder.Id;
      this.data.doNo = this.deliveryOrder.doNo;
      this.data.doDate = this.deliveryOrder.doDate;
      this.data.arrivalDate = this.deliveryOrder.arrivalDate;
      //this.data.items = items;
      this.data.totalAmount=this.deliveryOrder.totalAmount;
      this.data.deliveryOrder=this.deliveryOrder;
      // if (oldValue) {
      //   // this.deliveryOrder = {};
      //   this.data.deliveryOrderDate = undefined;
      //   this.data.deliveryOrderId = "";
      //   this.data.deliveryOrderNo = "";
      //   this.data.deliveryOrderSupplierDoDate = undefined;
      //   this.data.items = [];
      // }
    }
    else {

      this.data.arrivalDate = undefined;
      this.data.Id = "";
      this.data.doNo = "";
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
  get filter() {
    if (this.options.supplierCode) {
           return {  "IsInvoice": false,  "supplierCode": this.options.supplierCode,"IsDeleted" :false}
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