import {bindable} from 'aurelia-framework'
var ExternalTransferOrderLoader = require('../../../../loader/external-transfer-order-loader');

export class DeliveryOrderItem {
  @bindable ETONo;

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
    // console.log(context);
    this.data = context.data;
    // console.log(this.context);
    this.error = context.error;
    this.options = context.options;
    
    this.filter = this.context.context.options.DivisionName ? { "OrderDivisionName": this.context.context.options.DivisionName } : {};
    this.isEdit = this.context.context.options.isEdit || false;
    // this.IsPosted = false;
    this.isShowing = false;
    if (this.data) {
       this.data.ETONo;
      // console.log(this.selectedExternalTransferOrder);
      if (this.data.ETONo=="") {
        this.isShowing = false;
      }
    }
  }

  get externalTransferOrderLoader() {
    return ExternalTransferOrderLoader;
  }

  ETONoChanged(newValue,externalTransferOrder) {
    // console.log(newValue);
    if (newValue === null) {
      this.data.ExternalTransferOrderItems = [];
      this.error = {};
      this.isShowing = false;
    } else if (newValue.ETONo) {
      this.externalTransferOrderItems = newValue;
      this.data.ETONo=this.externalTransferOrderItems.ETONo;
      this.data.ETOId=this.externalTransferOrderItems.Id;
      var i = 0;
      var ExternalTransferOrderItems = this.externalTransferOrderItems.ExternalTransferOrderItems[i]; 
    //  console.log(ExternalTransferOrderItems);
     this.data.ITOId=ExternalTransferOrderItems.ITOId;
     this.data.ITONo=ExternalTransferOrderItems.ITONo;
     this.data.TRId=ExternalTransferOrderItems.TRId;
     this.data.TRNo=ExternalTransferOrderItems.TRNo;
     this.data.UnitId=ExternalTransferOrderItems.Unit.Id;
     this.data.UnitCode=ExternalTransferOrderItems.Unit.code;
     this.data.UnitName=ExternalTransferOrderItems.Unit.name;
      // var toDetails = ExternalTransferOrderItems.ExternalTransferOrderDetails;
      var toExternal = this.data.ETONo || {};
      
      this.data.details = [];
      for (var toDetail of ExternalTransferOrderItems.ExternalTransferOrderDetails) {
        console.log(toDetail.DealQuantity)  ;
        var detail = {
            UnitId : ExternalTransferOrderItems.Unit.Id,
            UnitCode : ExternalTransferOrderItems.Unit.code,
            UnitName : ExternalTransferOrderItems.Unit.name,
            TRNo : ExternalTransferOrderItems.TRNo,
            ETODetailId : toDetail.Id,
            ITODetailId : toDetail.ITODetailId,
            TRDetailId : toDetail.TRDetailId,
            ProductId: toDetail.Product.Id,
            ProductCode : toDetail.Product.code,
            ProductName : toDetail.Product.name,
            Product : toDetail.Product.code +' - '+ toDetail.Product.name,
            Grade : toDetail.Grade,
            ProductRemark : toDetail.ProductRemark,
            RequestedQuantity : toDetail.DealQuantity,
            UomId : toDetail.DealUom.Id,
            UomUnit : toDetail.DealUom.unit,
            DOQuantity : toDetail.RemainingQuantity, 
            RemainingQuantity : toDetail.RemainingQuantity          
          };
          
          this.data.details.push(detail);     
          // console.log(this.data.details)      ;
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

  TransferDeliveryOrderView = (transferDeliveryOrder) => {
    return transferDeliveryOrder.ETONo
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}