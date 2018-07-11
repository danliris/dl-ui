import {bindable} from 'aurelia-framework'
var UnitReceiptNoteLoader = require('../../../../loader/unit-receipt-note-loader');

export class UnitPaymentOrderItem {
  @bindable selectedUnitReceiptNote;

  itemsColumns = [
    { header: "Barang" },
    { header: "Jumlah" },
    { header: "Satuan" },
    { header: "Harga Satuan" },
    { header: "Total Harga" }
  ]

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    // this.filter = this.context.context.options ? this.context.context.options : {};
    this.filter = {};
    this.isShowing = false;
    if (this.data) {
      this.selectedUnitReceiptNote = this.data.unitReceiptNote;
      if (this.data.unitReceiptNote.items) {
        this.isShowing = true;
      }
    }
  }

  get unitReceiptNoteLoader() {
    return UnitReceiptNoteLoader;
  }

  selectedUnitReceiptNoteChanged(newValue) {
    if (newValue === null) {
      this.data.unitReceiptNote = {};
      this.error = {};
      this.isShowing = false;
    } else if (newValue._id) {
      var items = [];
      for (var item of newValue.items) {
        // if (item.purchaseOrder.categoryId.toString() === this.filter.categoryId.toString()) {
        //   items.push(item);
        // }
        item.URNItemId = item._id;
        item.deliveredUom = {
         _id: item.uomId,
         unit: item.uom 
        };
        item.priceTotal = item.pricePerDealUnit * item.deliveredQuantity;

        items.push(item);
      }
      newValue.items = items;

      this.data.unitReceiptNote = newValue;
      this.data.unitReceiptNote.deliveryOrder = {
        _id: newValue.doId || 0,
        no: newValue.doNo || null,
      };

      this.error = {};
      this.isShowing = true;
    }
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  unitReceiptNoteView = (unitReceiptNote) => {
    return unitReceiptNote.deliveryOrder ?
      `${unitReceiptNote.no} - ${unitReceiptNote.deliveryOrder.no}` :
      unitReceiptNote.doNo ?
      `${unitReceiptNote.no} - ${unitReceiptNote.doNo}` :
      "";
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}