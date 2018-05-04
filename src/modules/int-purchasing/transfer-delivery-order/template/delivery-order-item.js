// import {bindable} from 'aurelia-framework'
// import { Service } from '../service';
// var ExternalTransferOrderLoader = require('../../../../loader/external-transfer-order-loader');

// export class DeliveryOrderItem {
//   @bindable ETONo;

//   itemsColumns = [
//     { header: "Unit Pemesanan", value: "details.UnitName"},
//     { header: "Nomor TR", value: "details.TRNo" },
//     { header: "Nama Barang", value: "details.TRNo" },
//     { header: "Jumlah Diminta (TO Eks)", value: "details.RequestedQuantity" },
//     { header: "Jumlah DO", value: "details.RemainingQuantity" },
//     { header: "Satuan", value: "details.UomUnit" },
//     { header: "Grade", value: "details.Grade" },
//     { header: "Keterangan", value: "details.Remark"}
//   ]

//   activate(context) {
//     this.context = context.context.items;
//     // console.log(context);
//     this.data = context.data;
//     console.log(this.data);
//     this.error = context.error;
//     // this.options = context.options;
    
//     // this.filter = this.context.context.options.DivisionName ? { "OrderDivisionName": this.context.context.options.DivisionName } : {};
//     // this.isEdit = this.context.context.options.isEdit || false;
//     // this.IsPosted = false;
//     this.isShowing = false;
//     if (this.data) {
//        this.data.ETONo;
//       // console.log(this.selectedExternalTransferOrder);
//       if (this.data.ETONo=="") {
//         this.isShowing = false;
//       }
//     }
//   }

//   get externalTransferOrderLoader() {
//     return ExternalTransferOrderLoader;
//   }

//   ETONoChanged(newValue,externalTransferOrder) {
//     // console.log(newValue);
//     if (newValue === null) {
//       this.data.ExternalTransferOrderItems = [];
//       this.error = {};
//       this.isShowing = false;
//     } else if (newValue.ETONo) {
//       this.externalTransferOrderItems = newValue;
//       this.data.ETONo=this.externalTransferOrderItems.ETONo;
//       this.data.ETOId=this.externalTransferOrderItems.Id;
//       var i = 0;
//       var ExternalTransferOrderItems = this.externalTransferOrderItems.ExternalTransferOrderItems[i]; 
//     //  console.log(ExternalTransferOrderItems);
//      this.data.ITOId=ExternalTransferOrderItems.ITOId;
//      this.data.ITONo=ExternalTransferOrderItems.ITONo;
//      this.data.TRId=ExternalTransferOrderItems.TRId;
//      this.data.TRNo=ExternalTransferOrderItems.TRNo;
//      this.data.UnitId=ExternalTransferOrderItems.Unit.Id;
//      this.data.UnitCode=ExternalTransferOrderItems.Unit.code;
//      this.data.UnitName=ExternalTransferOrderItems.Unit.name;
//       // var toDetails = ExternalTransferOrderItems.ExternalTransferOrderDetails;
//       var toExternal = this.data.ETONo || {};
      
//       this.data.details = [];
//       for (var toDetail of ExternalTransferOrderItems.ExternalTransferOrderDetails) {
//         console.log(toDetail.DealQuantity)  ;
//         var detail = {
//             UnitId : ExternalTransferOrderItems.Unit.Id,
//             UnitCode : ExternalTransferOrderItems.Unit.code,
//             UnitName : ExternalTransferOrderItems.Unit.name,
//             TRNo : ExternalTransferOrderItems.TRNo,
//             ETODetailId : toDetail.Id,
//             ITODetailId : toDetail.ITODetailId,
//             TRDetailId : toDetail.TRDetailId,
//             ProductId: toDetail.Product.Id,
//             ProductCode : toDetail.Product.code,
//             ProductName : toDetail.Product.name,
//             Product : toDetail.Product.code +' - '+ toDetail.Product.name,
//             Grade : toDetail.Grade,
//             ProductRemark : toDetail.ProductRemark,
//             RequestedQuantity : toDetail.DealQuantity,
//             UomId : toDetail.DealUom.Id,
//             UomUnit : toDetail.DealUom.unit,
//             DOQuantity : toDetail.RemainingQuantity, 
//             RemainingQuantity : toDetail.RemainingQuantity          
//           };
          
//           this.data.details.push(detail);     
//           // console.log(this.data.details)      ;
//       }
//       // console.log(details);
//       // console.log(this.data.ExternalTransferOrderItems)
//       this.error = {};
//       this.isShowing = true;
//     }
//   }

//   toggle() {
//     if (!this.isShowing)
//       this.isShowing = true;
//     else
//       this.isShowing = !this.isShowing;
//   }

//   TransferDeliveryOrderView = (transferDeliveryOrder) => {
//     return transferDeliveryOrder.ETONo
//   }

//   // controlOptions = {
//   //   control: {
//   //     length: 12
//   //   }
//   // };
// }

import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
var ExternalTransferOrderLoader = require('../../../../loader/external-transfer-order-loader');
var moment = require('moment');

@inject(Service)
export class DeliveryOrderItem {
    @bindable ETONo;
    @bindable selectedExternalTransferOrderFilter = {};

    columns = ["details.UnitName", "details.TRNo", "details.TRNo", "details.RequestedQuantity", "details.RemainingQuantity", "details.UomUnit", "details.Grade", "details.Remark"];

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.items = context.context.items;
        this.data = context.data;
        
        this.error = context.error;
        this.options = context.context.options;
        console.log(this.error);
        console.log(this.options);
        this.readOnly = context.options.readOnly;
        if (this.data.ETONo) {
          this.ETONo=this.data.ETONo;
          // this.items.data.ETONo=this.ETONo;
          // console.log(this.data);
          var i = 0;
          for (var Detail of this.data.details) {
              Detail.UnitName = this.data.UnitName;
              Detail.TRNo = this.data.TRNo ;
          }
         // this.data.details.push(detail);
         // console.log(this.selectedExternalTransferOrder);
        //  if (this.data.ETONo=="") {
        //    this.isShowing = false;
        //  }
         this.isShowing = this.error && this.error.details && this.error.details.length > 0;
       }

        this.selectedExternalTransferOrderFilter = this.options.filter;
        this.selectedExternalTransferOrderFilter.currentUsed =  this.items.map(item => item.data.ETONo);
        console.log(this.selectedExternalTransferOrderFilter);
    }

    get externalTransferOrderLoader() {
      return ExternalTransferOrderLoader;
    }
    TransferDeliveryOrderView = (transferDeliveryOrder) => {
      return transferDeliveryOrder.ETONo
    } 
    
    ETONoChanged(newValue,externalTransferOrder) {
            this.externalTransferOrderItems = newValue;
            this.data.ETONo=this.externalTransferOrderItems.ETONo;
            this.data.ETOId=this.externalTransferOrderItems.Id;
            var i = 0;
            var ExternalTransferOrderItems = this.externalTransferOrderItems.ExternalTransferOrderItems[i]; 
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
              // console.log(toDetail.DealQuantity)  ;
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
            }
            // console.log(details);
            // console.log(this.data.ExternalTransferOrderItems)
            this.error = {};
            this.isShowing = true;
          
        }
        
    toggle() {
        this.isShowing = !this.isShowing;
    }

}