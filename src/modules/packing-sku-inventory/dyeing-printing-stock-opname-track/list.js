import {
  inject, bindable
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
// import { any } from 'bluebird';
var ProductionOrderLoader = require('../../../loader/production-order-azure-loader');
var TrackLoader = require("../../../loader/track-loader")

@inject(Router, Service)
export class List {
  

  columns = [
    { field: "productionOrderNo", title: "No SPP" },
    { field: "productPackingCode", title: "Barcode" },
    { field: "grade", title: "Grade" },
    { field: "packagingUnit", title: "Satuan Pack" },
    { field: "track", title: "Jalur/Rak" },
    { field: "packagingQty", title: "Qty Packing", sortable: false,formatter:(value,data)=>{
      return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    } },
    { field: "packagingLength", title: "Qty Satuan", sortable: false,formatter:(value,data)=>{
      return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    } },
    { field: "balance", title: "Total Quantity", sortable: false,formatter:(value,data)=>{
      return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    } },
    
    
  ];

  

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  sPPFormatter = (spp) => {
    return `${spp.OrderNo}`
}

get productionOrderLoader() {
    return ProductionOrderLoader;
}

get trackLoader(){
  return TrackLoader;
}
@bindable selectedProductionOrder;
selectedProductionOrderChanged(n, o) {
  console.log(n);
  if (n) {
      this.productionOrder = n;
  } else {
      this.productionOrder = null;
  }
}
@bindable track;
trackChanged(n,o)
    {
        console.log(n);
        if(n){
            this.track = n;
        }else{
            this.productionOrder = null;
        }
    }


trackView = (track) => {
  console.log(track);
  if(track.Type === undefined){

    if(track.box === null){
      return `${track.type} - ${track.name}` ; 
    } else{
      return `${track.type} - ${track.name} - ${track.box}` ; 
    }
    
  }else{
    if(track.Box === null){
      return `${track.Type} - ${track.Name}`;
    }else{
      return `${track.Type} - ${track.Name} - ${track.Box}`;
    }
    
  } 
}


  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
  };

  loader = (info) => {
    let params = {
      productionOrderId: this.productionOrder ? this.productionOrder.Id : null,
      barcode: this.barcode ? this.barcode : "",
      trackId: this.track?this.track.Id: null,
    };

    return this.flag
      ? this.service.search(params).then((result) => {

        return {
          data: result.data
        };
      })
      : { data: [] };
  }

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  // async search() {
  
  //       this.listDataFlag = true;
  //       this.error = {};
  //       var arg = {
  //         productionOrderId: this.productionOrder ? this.productionOrder.Id : null,
  //         barcode: this.barcode ? this.barcode : "",
  //         trackId: this.track?this.track.Id: null,
  //     }

  //     this.data = await this.service.search(arg)
  //         .then((result) => {
  //             var data = [];
  //             console.log(result)
  //             if (result.data.length == 0) this.isEmpty = true;
  //             else this.isEmpty = false;

  //             this.sumPackagingQty = 0;
  //             this.sumPackagingLength = 0;
  //             this.sumBalance = 0;

  //             for (var item of result.data) {
  //               this.sumPackagingQty += item.packagingQty;
  //               this.sumPackagingLength += item.packagingLength;
  //               this.sumBalance += item.balance;
  //               var newData = {
  //                 ProductionOrderNo: item.productionOrderNo,
  //                 Barcode: item.barcode,
  //                 Grade : item.grade,
  //                 PackagingUnit: item.packagingUnit,
  //                 Track: item.trackName,
  //                 PackagingQty: item.packagingQty ?numeral(item.packagingQty).format("0.00") : 0,
  //                 PackagingLength : item.packagingLength  ?numeral(item.packagingLength).format("0.00") : 0,
  //                 Balance : item.balance?numeral(item.balance).format("0.00") : 0,
  //               };

  //               data.push(newData);
  //             }

  //             this.sumPackagingQtyFormat =  this.sumPackagingQty ? numeral(this.sumPackagingQty ).format("0.00") : 0;
  //             this.sumBalanceFormat = this.sumBalance ? numeral(this.sumBalance ).format("0.00") : 0;

  //             return data;
  //         });
    
    
  // }
  context = ["Update Jalur/Rak"];
  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;

    switch (arg.name) {
      case "Update Jalur/Rak":
        //if (data.balance > 0) {
          this.router.navigateToRoute('edit', { id: data.id });
        // }
        // else {
        //   alert("Maaf, Quantity 0 hanya bisa melihat Kartu Stelling");
        // }
        break;
      
    }
  }

 


  ExportToExcel() {
    let args = {
      productionOrderId: this.productionOrder ? this.productionOrder.Id : null,
      barcode: this.barcode ? this.barcode : "",
      trackId: this.track?this.track.Id: null,
    };

    this.service.generateExcel(args);
  }

  reset() {
    this.selectedProductionOrder = null;
    this.barcode = null;
    this.track = null;
    
  }
  

}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
