import { inject, bindable, containerless, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";
var PurchaseOrderExternalLoader = require('../../../../loader/garment-purchase-order-external-by-supplier-loader');

@containerless()
@inject(Service, BindingEngine)
export class DeliveryOrderItem {
  @bindable selectedPurchaseOrderExternal;

  itemsColumns = [
    { header: "Nomor PR" },
    { header: "Nomor Referensi PR" },
    { header: "Barang" },
    { header: "Dipesan" },
    { header: "Diterima" },
    { header: "Satuan" },
    { header: "Konversi" },
    { header: "Jumlah Kecil" },
    { header: "Satuan Kecil" },
    { header: "Harga" },
    { header: "Harga Total" },
    { header: "Mata Uang" },
    { header: "Catatan" }
  ]

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.filter = this.context.context.options.supplierId ? { "supplierId": this.context.context.options.supplierId } : {};
    this.isEdit = this.context.context.options.isEdit || false;
    this.isShowing = false;
    if (this.data) {
      this.selectedPurchaseOrderExternal = { "_id": this.data.purchaseOrderExternalId, "no": this.data.purchaseOrderExternalNo };
    }
  }

  get purchaseOrderExternalLoader() {
    return PurchaseOrderExternalLoader;
  }

  async selectedPurchaseOrderExternalChanged(newValue) {
    if (newValue === null) {
      this.data.fulfillments = [];
      this.error = {};
      this.isShowing = false;
    } else if (newValue._id) {
      this.data.purchaseOrderExternalNo = newValue.no;
      this.data.purchaseOrderExternalId = newValue._id;
      this.data.payment = newValue.paymentMethod;
      var doFulfillments = this.data.fulfillments || [];
      var poExternal = newValue || {};
      var poCollection = poExternal.items.map((item) => { return item.poId })
      poCollection = poCollection.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
      })

      var jobs = [];
      for (var poId of poCollection) {
        jobs.push(this.service.getPurchaseOrderById(poId, ["items.fulfillments", "items.currency", "items.pricePerDealUnit", "items.product", "_id", "items.dealQuantity", "items.realizationQuantity"]))
      }

      Promise.all(jobs)
        .then(purchaseOrders => {
          var fulfillments = [];
          for (var poExternalItem of poExternal.items) {
            var poInternal = purchaseOrders.find(po => po._id.toString() === poExternalItem.poId.toString())
            var poInternalItem = poInternal.items.find(poItem => poItem.product._id.toString() === poExternalItem.productId.toString())
            if (poInternalItem) {
              var correctionQty = [];
              if (poInternalItem.fulfillments) {
                poInternalItem.fulfillments.map((fulfillment) => {
                  if (fulfillment.corrections) {
                    fulfillment.corrections.map((correction) => {
                      if (correction.correctionType == "Jumlah") {
                        correctionQty.push((correction.oldCorrectionQuantity - correction.newCorrectionQuantity) < 0 ? (correction.oldCorrectionQuantity - correction.newCorrectionQuantity) * -1 : (correction.oldCorrectionQuantity - correction.newCorrectionQuantity))
                      }
                    })
                  }
                })
              }
              var isQuantityCorrection = correctionQty.length > 0;
              if ((poInternalItem.dealQuantity - poInternalItem.realizationQuantity) > 0) {
                var deliveredQuantity = (doFulfillments[fulfillments.length] || {}).deliveredQuantity ? doFulfillments[fulfillments.length].deliveredQuantity : (poInternalItem.dealQuantity - poInternalItem.realizationQuantity);
                var remainingQuantity = poInternalItem.dealQuantity - poInternalItem.realizationQuantity;
                if (isQuantityCorrection) {
                  deliveredQuantity += correctionQty.reduce((prev, curr) => prev + curr);
                  remainingQuantity += correctionQty.reduce((prev, curr) => prev + curr);
                }
                var fulfillment = {
                  purchaseOrderId: poExternalItem.poId,
                  purchaseOrderNo: poExternalItem.poNo,
                  purchaseRequestId: poExternalItem.prId,
                  purchaseRequestNo: poExternalItem.prNo,
                  purchaseRequestRefNo: poExternalItem.prRefNo,
                  productId: poExternalItem.productId,
                  product: poExternalItem.product,
                  purchaseOrderQuantity: poExternalItem.dealQuantity,
                  purchaseOrderUom: poExternalItem.dealUom,
                  currency: poInternalItem.currency,
                  pricePerDealUnit: poInternalItem.pricePerDealUnit,
                  remainsQuantity: remainingQuantity,
                  deliveredQuantity: deliveredQuantity,
                  quantityConversion: deliveredQuantity * (poExternalItem.conversion || 1),
                  uomConversion: poExternalItem.uomConversion || poExternalItem.dealUom,
                  conversion: poExternalItem.conversion,
                  remark: (doFulfillments[fulfillments.length] || {}).remark ? doFulfillments[fulfillments.length].remark : ''
                };
                fulfillments.push(fulfillment);
              }
              else if (isQuantityCorrection) {
                var fulfillment = {
                  purchaseOrderId: poExternalItem.poId,
                  purchaseOrderNo: poExternalItem.poNo,
                  purchaseRequestId: poExternalItem.prId,
                  purchaseRequestNo: poExternalItem.prNo,
                  purchaseRequestRefNo: poExternalItem.prRefNo,
                  productId: poExternalItem.productId,
                  product: poExternalItem.product,
                  purchaseOrderQuantity: poExternalItem.dealQuantity,
                  purchaseOrderUom: poExternalItem.dealUom,
                  currency: poInternalItem.currency,
                  pricePerDealUnit: poInternalItem.pricePerDealUnit,
                  remainsQuantity: poExternalItem.dealQuantity + correctionQty[correctionQty.length - 1],
                  deliveredQuantity: (doFulfillments[fulfillments.length] || {}).deliveredQuantity ? doFulfillments[fulfillments.length].deliveredQuantity : (poInternalItem.dealQuantity - poInternalItem.realizationQuantity) + correctionQty.reduce((prev, curr) => prev + curr),
                  quantityConversion: (doFulfillments[fulfillments.length] || {}).quantityConversion ? doFulfillments[fulfillments.length].quantityConversion : (poExternalItem.quantityConversion - (poInternalItem.realizationQuantity * poExternalItem.conversion || 1)) + (correctionQty.reduce((prev, curr) => prev + curr) * poExternalItem.conversion || 1),
                  uomConversion: poExternalItem.uomConversion || poExternalItem.dealUom,
                  conversion: poExternalItem.conversion,
                  remark: (doFulfillments[fulfillments.length] || {}).remark ? doFulfillments[fulfillments.length].remark : ''
                };
                fulfillments.push(fulfillment);
              }
            }
          }
          this.data.fulfillments = doFulfillments.length > 0 ? doFulfillments : fulfillments;
          this.error = {};
          this.isShowing = true;
        })
        .catch(e => {
          this.data.fulfillments = [];
          this.error = {};
          this.isShowing = false;
          this.selectedPurchaseOrderExternal = {};
        })
    }
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  purchaseOrderExternalView = (purchaseOrderExternal) => {
    return purchaseOrderExternal.no
  }

  removeItems = function () {
    this.bind();
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}