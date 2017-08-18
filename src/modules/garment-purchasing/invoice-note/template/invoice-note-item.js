import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'
var DeliveryOrderLoader = require('../../../../loader/garment-delivery-order-no-invoice-loader');

@containerless()
export class DeliveryOrderItem {
  @bindable selectedDeliveryOrder;

  itemsColumns = [
    { header: "Nomor PO Eksternal" },
    { header: "Nomor PR" },
    { header: "Kode - Nama Barang" },
    { header: "Jumlah" },
    { header: "Satuan" },
    { header: "Harga Satuan" },
    { header: "Harga Total" }
  ]

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    this.filterSupplier = this.context.context.options.supplierId ? { "supplierId": this.context.context.options.supplierId } : {};
    this.filterCurrency = this.context.context.options.currencyCode ? { "currencyCode": this.context.context.options.currencyCode } : {};
    this.filter = Object.assign({}, this.filterSupplier, this.filterCurrency);

    this.isShowing = false;
    if (this.data) {
      this.selectedDeliveryOrder = { "_id": this.data.deliveryOrderId, "no": this.data.deliveryOrderNo };
      if (this.data.items.length > 0) {
        this.isShowing = true;
      }
    }
  }

  get total() {
    if (this.data.items) {
      if (this.data.items.length > 0) {
        var qty = this.data.items
          .map((item) => parseInt(item.pricePerDealUnit * item.deliveredQuantity));
        return qty
          .reduce((prev, curr, index) => { return prev + curr }, 0);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  get deliveryOrderLoader() {
    return DeliveryOrderLoader;
  }

  selectedDeliveryOrderChanged(newValue) {
    if (newValue === null) {
      this.data.items = [];
      this.error = {};
      this.isShowing = false;
    } else if (newValue._id) {
      this.data.deliveryOrderId = newValue._id;
      this.data.deliveryOrderNo = newValue.no;
      this.data.deliveryOrderDate = newValue.date;
      this.data.deliveryOrderSupplierDoDate = newValue.supplierDoDate;

      var items = newValue.items.map(doItem => {
        var fulfillment = doItem.fulfillments.map(doFulfillment => {
          return {
            purchaseOrderExternalId: doItem.purchaseOrderExternalId,
            purchaseOrderExternalNo: doItem.purchaseOrderExternalNo,
            purchaseOrderId: doFulfillment.purchaseOrderId,
            purchaseOrderNo: doFulfillment.purchaseOrderNo,
            purchaseRequestId: doFulfillment.purchaseRequestId,
            purchaseRequestNo: doFulfillment.purchaseRequestNo,
            productId: doFulfillment.productId,
            product: doFulfillment.product,
            purchaseOrderQuantity: doFulfillment.purchaseOrderQuantity,
            purchaseOrderUom: doFulfillment.purchaseOrderUom,
            deliveredQuantity: doFulfillment.deliveredQuantity,
            pricePerDealUnit: doFulfillment.pricePerDealUnit
          }
        });
        fulfillment = [].concat.apply([], fulfillment);
        return fulfillment;
      });
      items = [].concat.apply([], items);
      this.data.items = items;
      this.isShowing = true;

    } else {
      this.data.items = [];
      this.error = {};
      this.isShowing = false;
    }
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  deliveryOrderView = (deliveryOrder) => {
    return deliveryOrder.no
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}