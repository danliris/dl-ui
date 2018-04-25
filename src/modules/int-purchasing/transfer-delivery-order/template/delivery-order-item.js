import {bindable} from 'aurelia-framework'
var ExternalTransferOrderLoader = require('../../../../loader/external-transfer-order-loader');

export class DeliveryOrderItem {
  @bindable selectedExternalTransferOrder;

  itemsColumns = [
    { header: "Unit Pemesanan", value: "details.UnitName"},
    { header: "Nomor TR", value: "details.TRNo" },
    { header: "Nama Barang", value: "details.Product" },
    { header: "Jumlah Diminta (TO Eks)", value: "details.RequestedQuantity" },
    { header: "Jumlah DO", value: "details.RemainingQuantity" },
    { header: "Satuan", value: "details.UomUnit" },
    { header: "Grade", value: "details.Grade" },
    { header: "Keterangan", value: "details.Remark"}
  ]

  activate(context) {
    this.context = context;
    this.data = context.data;
    console.log(this.context);
    this.error = context.error;
    this.options = context.options;
    
    // this.filter = this.context.context.options.SupplierName ? { "SupplierName": this.context.context.options.SupplierName } : {};
    this.isEdit = this.context.context.options.isEdit || false;
    // this.IsPosted = false;
    this.isShowing = false;
    if (this.data) {
      this.selectedExternalTransferOrder = this.data.ETONo;
      // if (this.selectedExternalTransferOrder) {
      //   this.isShowing = true;
      // }
    }
    // console.log(context);
  }

  get externalTransferOrderLoader() {
    return ExternalTransferOrderLoader;
  }

  selectedExternalTransferOrderChanged(newValue,externalTransferOrder) {
    // console.log(newValue);
    if (newValue === null) {
      this.data.ExternalTransferOrderItems = [];
      this.error = {};
      this.isShowing = false;
    } else if (newValue.ETONo) {
      this.data=newValue;
      var i = 0;
      var ExternalTransferOrderItems = this.data.ExternalTransferOrderItems[i]; 
      var toDetails = ExternalTransferOrderItems.ExternalTransferOrderDetails;
      var toExternal = this.data.ETONo || {};
      
      this.data.details = [];
      for (var toDetail of toDetails) {
          var detail = {
            UnitId : ExternalTransferOrderItems.UnitId,
            UnitCode : ExternalTransferOrderItems.UnitCode,
            UnitName : ExternalTransferOrderItems.UnitName,
            TRNo : ExternalTransferOrderItems.TRNo,
            DOItemId : ExternalTransferOrderItems.Id,
            ETODetailId : toDetail.Id,
            ITODetailId : toDetail.ITODetailId,
            TRDetailId : toDetail.TRDetailId,
            ProductId: toDetail.Product.Id,
            ProductCode : toDetail.Product.code,
            ProductName : toDetail.Product.name,
            Product : toDetail.Product.code +' - '+ toDetail.Product.name,
            Grade : toDetail.Grade,
            Remark : toDetail.ProductRemark,
            RequestedQuantity : toDetail.DealQuantity,
            UomId : toDetail.DealUom.Id,
            UomUnit : toDetail.DealUom.unit,
            RemainingQuantity : toDetail.RemainingQuantity,           
          };
          
          this.data.details.push(detail);           
      }
      // console.log(details);
      // console.log(this.data.ExternalTransferOrderItems)
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
    return externalTransferOrder.ETONo
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}