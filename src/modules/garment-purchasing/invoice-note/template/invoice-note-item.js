import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
var DeliveryOrderLoader = require('../../../../loader/garment-delivery-order-basic-loader')
var PurchaseOrderExternalLoader = require('../../../../loader/garment-purchase-order-external-by-supplier-loader');

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
    this.deliveryOrder = this.data.deliveryOrderNo ? this.data.deliveryOrderNo : "";
  }

  get total() {
    if (this.data.items) {
      if (this.data.items.length > 0) {
        var qty = this.data.items
          .map((item) => Number.isInteger(item.pricePerDealUnit * item.deliveredQuantity) ? item.pricePerDealUnit * item.deliveredQuantity : Number((item.pricePerDealUnit * item.deliveredQuantity).toFixed(2)))
        return qty
          .reduce((prev, curr, index) => { return prev + curr }, 0);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  deliveryOrderChanged(newValue, oldValue) {
    if (this.deliveryOrder && this.deliveryOrder._id) {
      var items = this.deliveryOrder.items.map(doItem => {
        var fulfillment = doItem.fulfillments.map(doFulfillment => {
          return {
            purchaseOrderExternalId: doItem.purchaseOrderExternalId,
            purchaseOrderExternalNo: doItem.purchaseOrderExternalNo,
            purchaseOrderId: doFulfillment.purchaseOrderId,
            purchaseOrderNo: doFulfillment.purchaseOrderNo,
            purchaseRequestId: doFulfillment.purchaseRequestId,
            purchaseRequestNo: doFulfillment.purchaseRequestNo,
            purchaseRequestRefNo: doFulfillment.purchaseRequestRefNo,
            roNo: doFulfillment.roNo,
            productId: doFulfillment.productId,
            product: doFulfillment.product,
            purchaseOrderQuantity: doFulfillment.purchaseOrderQuantity,
            purchaseOrderUom: doFulfillment.purchaseOrderUom,
            deliveredQuantity: doFulfillment.deliveredQuantity,
            pricePerDealUnit: doFulfillment.pricePerDealUnit,
            paymentMethod: doItem.paymentMethod,
            paymentType: doItem.paymentType,
            paymentDueDays: doItem.paymentDueDays,
          }
        });
        fulfillment = [].concat.apply([], fulfillment);
        return fulfillment;
      });
      items = [].concat.apply([], items);

      this.data.deliveryOrderId = this.deliveryOrder._id;
      this.data.deliveryOrderNo = this.deliveryOrder.no;
      this.data.deliveryOrderSupplierDoDate = this.deliveryOrder.supplierDoDate;
      this.data.deliveryOrderDate = this.deliveryOrder.date;
      this.data.items = items;
    }
    else {
      this.data = {};
      this.data.items = [];
    }
  }
  get purchaseOrderExternalLoader() {
    return PurchaseOrderExternalLoader;
  }

  get deliveryOrderLoader() {
    return DeliveryOrderLoader;
  }

  get filter() {
    if (this.options.supplierCode) {
      return { "hasInvoice": false, "supplier.code": this.options.supplierCode, "_deleted": false }
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