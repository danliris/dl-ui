import { inject, bindable, computedFrom } from 'aurelia-framework'

export class ProductionOrderItem {
  @bindable product;

  packingItems = [];
  packUnit = ["ROLL", "PIECE", "POTONGAN"];
  remarks = ["Acc Buyer", "Keputusan Prod", "Perbaikan", "Colet"];
  activate(context) {
    this.context = context;
    this.data = context.data;
    console.log('fad',this.data);
    
    this.error = context.error;
    //this.items = this.context.context.items;
    // console.log(this.error);
    this.options = context.options;
    
    this.isTransit = this.destinationArea == "TRANSIT";
    if (this.data.deliveryOrderSalesId && this.data.deliveryOrderSalesNo) {
      this.selectedDeliveryOrderSales = {};

      this.selectedDeliveryOrderSales.Id = this.data.deliveryOrderSalesId;
      this.selectedDeliveryOrderSales.DOSalesNo = this.data.deliveryOrderSalesNo;
      this.selectedDeliveryOrderSales.DestinationBuyerName = this.data.destinationBuyerName;
      
    }
    if (this.data.id == null){
      this.data.isremovable = true;
    }
    if (this.data.packagingQty) {
      this.qtyPacking = this.data.packagingQty;
    }

    // if (this.data.qty) {
    //   this.qty = this.data.qty;
    // }

    if (this.data.quantity) {
      this.qty = this.data.quantity;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };

  doSalesQuery = { DOSalesCategory: "DYEINGPRINTING" };

  @bindable selectedDeliveryOrderSales;
  selectedDeliveryOrderSalesChanged(newValue, oldValue) {
    if (this.selectedDeliveryOrderSales && this.selectedDeliveryOrderSales.Id) {
      this.data.deliveryOrderSalesId = this.selectedDeliveryOrderSales.Id;
      this.data.deliveryOrderSalesNo = this.selectedDeliveryOrderSales.DOSalesNo;
      this.data.destinationBuyerName = this.selectedDeliveryOrderSales.DestinationBuyerName;
      console.log(this.selectedDeliveryOrderSales);
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
      this.data.balance = this.data.packagingQty * this.data.quantity;
    }
  }

  @bindable qty;
  qtyChanged(n, o) {
    if (this.qty) {
      this.data.qty = this.qty;
      this.data.quantity = this.qty;
      this.data.balance = this.data.packagingQty * this.data.quantity;
    }
  }

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }
}