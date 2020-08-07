import { inject, bindable, computedFrom } from 'aurelia-framework'
let DOSalesLoader = require("../../../../loader/do-sales-loader");

export class ProductionOrderItem {
  @bindable product;

  // isAval = false;
  // remarks = [];
  packingItems = [];
  packUnit = ["ROLL", "PIECE", "POTONGAN"];
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.contextOptions = context.context.options;
    this.isEdit = this.contextOptions.isEdit;
    if (this.data.deliveryOrderSalesId && this.data.deliveryOrderSalesNo) {
      this.selectedDeliveryOrderSales = {};

      this.selectedDeliveryOrderSales.Id = this.data.deliveryOrderSalesId;
      this.selectedDeliveryOrderSales.DOSalesNo = this.data.deliveryOrderSalesNo;
    }

    if (this.data.packagingQty) {
      this.qtyPacking = this.data.packagingQty;
    }

    if (this.data.qty) {
      this.qty = this.data.qty;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };

  get doSalesLoader() {
    return DOSalesLoader;
  }

  doSalesQuery = { DOSalesCategory: "DYEINGPRINTING" };

  @bindable selectedDeliveryOrderSales;
  selectedDeliveryOrderSalesChanged(newValue, oldValue) {
    if (this.selectedDeliveryOrderSales && this.selectedDeliveryOrderSales.Id) {
      this.data.deliveryOrderSalesId = this.selectedDeliveryOrderSales.Id;
      this.data.deliveryOrderSalesNo = this.selectedDeliveryOrderSales.DOSalesNo;
    }
  }
  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce(
      (acc, curr) => acc && curr.data.IsSave,
      true
    );
  }

  @bindable qtyPacking;
  qtyPackingChanged(n, o) {
    if (this.qtyPacking) {
      this.data.packagingQty = this.qtyPacking;
      this.data.balance = this.data.packagingQty * this.data.qty;
    }
  }

  @bindable qty;
  qtyChanged(n, o) {
    if (this.qty) {
      this.data.qty = this.qty;
      this.data.balance = this.data.packagingQty * this.data.qty;
    }
  }
}