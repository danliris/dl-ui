import {bindable} from 'aurelia-framework'
var ExternalTransferOrderLoader = require('../../../../loader/external-transfer-order-loader');

export class DeliveryOrderItem {
  @bindable selectedExternalTransferOrder;

  itemsColumns = [
    { header: "Nomor TR", value: "items.TRNo" },
    { header: "Nama Barang", value: "items.details.ProductId" },
    { header: "Jumlah Diminta", value: "items.details.DealQuantity" },
    { header: "Jumlah Datang", value: "items.details.RemainingQuantity" },
    { header: "Satuan", value: "items.details.DealUomUnit" },
    { header: "Grade", value: "items.details.Grade" },
    { header: "Keterangan", value: "items.details.Remark" },
    { header: "Catatan", value: "items.details.Note" }
  ]

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.filter = this.context.context.options.SupplierId ? { "SupplierId": this.context.context.options.SupplierId } : {};
    this.isEdit = this.context.context.options.isEdit || false;
    this.isShowing = false;
    if (this.data) {
      this.selectedExternalTransferOrder = this.data.ExternalTransferOrderNo;
      if (this.data.details) {
        this.isShowing = true;
      }
    }
  }

  get externalTransferOrderLoader() {
    return ExternalTransferOrderLoader;
  }

  selectedExternalTransferOrder(newValue) {
    if (newValue === null) {
      this.data.items.details = [];
      this.error = {};
      this.isShowing = false;
    } else if (newValue.ExternalTransferOrderNo) {
      this.data.ExternalTransferOrderNo = newValue.ExternalTransferOrderNo;
      
      var doDetails = this.data.items.details || [];
      var toExternal = this.data.ExternalTransferOrderNo || {};
      var toCollection = toExternal.items || [];
      var details = [];
      for (var purchaseDeliveryOrder of toCollection) {
        for (var toItem of purchaseDeliveryOrder.items) {
          var details = {
            TransferRequestNo: this.data.TransferRequestNo,
            ProductId: toItem.ProductId,
            ProductCode: toItem.ProductCode,
            ProductName: toItem.ProductName,
            RequestedQuantity: toItem.dealQuantity,
            RemainingQuantity: toItem.RemainingQuantity,
            UomId: toItem.DealUomId,
            UomUnit: toItem.DealUomName,
            Grade: toItem.Grade,
            Remark: toItem.Remark,
          };
          details.push(details);        
        }
      }
      
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

  ExternalTransferOrderView = (externalTransferOrder) => {
    return externalTransferOrder.ExternalTransferOrderNo
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}