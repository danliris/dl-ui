import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Dialog } from '../../../components/dialog/dialog';
import { PackingListForm } from './packing-list-form';
var ProductionOrderLoader = require('../../../loader/production-order-azure-loader');
var TrackLoader = require("../../../loader/track-loader");


@inject(Dialog, Router, Service)
export class List {
    @bindable dateFrom;
    @bindable dateTo;
    @bindable error = {};
    @bindable dateReport;
    @bindable barcode;
    @bindable selectedProductionOrder;
    listDataFlag = false;

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false,
        sortable: false
    }

    



    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    productionOrder = null;
    
    selectedProductionOrderChanged(n, o) {
        if (n) {
            this.productionOrder = n;
        } else {
            this.productionOrder = null;
        }
    }

    // loader = (info) => {
    //     // var order = {};
    //     // if (info.sort)
    //     //     order[info.sort] = info.order;
    //     var arg = {
    //         // dateFrom: moment(this.dateFrom).format("YYYY-MM-DD"),
    //         // dateTo: moment(this.dateTo).format("YYYY-MM-DD"),
    //         dateReport: moment(this.dateReport).format("YYYY-MM-DD"),
    //         zona: this.zona,
    //         unit: this.unit,       
    //         packingType: this.packingType,
    //         construction: this.construction ? this.construction.Code : null,
    //         buyer: this.buyer ? this.buyer.Name : null,
    //         productionOrderId: this.productionOrder ? this.productionOrder.Id : null,
    //         inventoryType : this.inventoryType,
    //     }

    //     return this.listDataFlag ? this.service.search(arg)
    //         .then((result) => {
    //             var data = {};
    //             data.data = result;
    //             data.total = result.length;

    //             return data;
    //         }) : { data: [] };;
    // }

    constructor(dialog, router, service) {
        this.dialog = dialog;
        this.service = service;
        this.router = router;
        this.sumStockOpname = 0;
        this.sumStorageBalance = 0;
        this.sumDifference = 0;
        this.isEmpty = true;
        this.data = [];
    }



    export() {
        // if (this.dateFrom && this.dateTo) {
        if (this.dateFrom && this.dateTo && (this.dateFrom <= this.dateTo)) {
            this.error = {};
            var arg = {
                productionOrderId: this.productionOrder ? this.productionOrder.Id : null,
                barcode: this.barcode,     
                track: this.track?this.track.Id: null,     
                dateFrom: moment(this.dateFrom).format("YYYY-MM-DD"),
                dateTo: moment(this.dateTo).format("YYYY-MM-DD"),
            }
            this.service.generateExcel(arg);
        }else if(this.dateFrom > this.dateTo){
            this.error.dateFrom = "Tanggal Awal Harus Lebih Kecil dari Tanggal Akhir";
        }else{
            this.error.dateTo = "Tanggal Harus Diisi";
            this.error.dateFrom = "Tanggal Harus Diisi";
        }

    }

    async search() {
         if (this.dateFrom && this.dateTo && (this.dateFrom <= this.dateTo)) {
            this.listDataFlag = true;
            this.error = {};
            var arg = {
                productionOrderId: this.productionOrder ? this.productionOrder.Id : null,
                barcode: this.barcode,     
                track: this.track?this.track.Id: null,     
                dateFrom: moment(this.dateFrom).format("YYYY-MM-DD"),
                dateTo: moment(this.dateTo).format("YYYY-MM-DD"),
          }
  
          this.data = await this.service.search(arg)
              .then((result) => {
                  var data = [];
                  if (result.length == 0) this.isEmpty = true;
                  else this.isEmpty = false;

                  this.sumSaldoBegin = 0;
                  this.sumInQty = 0;
                  this.sumOutQty = 0;
                  this.sumAdjOutQty = 0;
                  this.sumTotal = 0;
                  

                  for (var item of result) {
                    this.sumSaldoBegin += item.saldoBegin;
                    this.sumInQty += item.inQty;
                    this.sumOutQty += item.outQty;
                    this.sumAdjOutQty += item.adjOutQty;
                    this.sumTotal += item.total;
                    var newData = {
                      ProductionOrderNo: item.productionOrderNo,
                      BuyerName : item.buyerName,
                      Material : item.construction,
                      Color : item.color,
                      Motif:item.motif,
                      
                      Grade: item.grade,
                      PackagingUnit: item.packagingUnit,
                      Barcode: item.productPackingCode,
                      //Jalur : item.trackName,
                      Awal: item.saldoBegin ? numeral(item.saldoBegin).format("0.00") : 0,
                      Masuk: item.inQty ? numeral(item.inQty).format("0.00") : 0,
                      Keluar: item.outQty ? numeral(item.outQty).format("0.00") : 0,
                      AdjKeluar: item.adjOutQty ? numeral(item.adjOutQty).format("0.00") : 0,
                      Total : item.total ? numeral(item.total).format("0.00") : 0
                    //   StockOpname: item.stockOpname ? numeral(item.stockOpname).format("0.00") : 0,
                    //   StorageBalance: item.storageBalance ? numeral(item.storageBalance).format("0.00") : 0,
                    //   Difference: item.difference ? numeral(item.difference).format("0.00") : 0
                    };

                    data.push(newData);
                  }

                  return data;
              });
        }else if(this.dateFrom > this.dateTo){
            this.error.dateFrom = "Tanggal Awal Harus Lebih Kecil dari Tanggal Akhir";

        } 
        
        else {
            this.error.dateTo = "Tanggal Harus Diisi";
            this.error.dateFrom = "Tanggal Harus Diisi";
        }
        // if (this.zona == "GUDANG AVAL") {
        //     if (this.dateReport) {
        //         this.listDataFlag = true;
        //         this.error = {};
        //         this.table.refresh();
        //     } else {
        //         this.error.dateReport = "Tanggal Harus Diisi";
        //     }
        // } else {
        //     // if (this.dateFrom && this.dateTo) {
        //     if (this.dateReport) {
        //         this.listDataFlag = true;
        //         this.error = {}
        //         this.table.refresh();
        //     } else {
        //         // if (!this.dateFrom) {
        //         //     this.error.dateFrom = "Tanggal Harus Diisi";
        //         // }
        //         // if (!this.dateTo) {
        //         //     this.error.dateTo = "Tanggal Harus Diisi";
        //         // }
        //         this.error.dateReport = "Tanggal Harus Diisi";
        //     }
        // }
    }

    reset() {
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.barcode = null
     
        this.selectedProductionOrder = null;
        this.listDataFlag = false;
        
    
        //this.table.refresh();
        this.error = {};
        this.sumStockOpname = 0;
        this.sumStorageBalance = 0;
        this.sumDifference = 0;
        this.isEmpty = true;
        this.data = [];
    }
    context = ["detail"]
    contextClickCallback(event) {
        var arg = event.detail;
        // var data = arg.data;
        var data = {};
        data.dateReport = this.dateReport;
        data.zona = this.zona;
        data.buyer = this.buyer;
        data.data = arg.data;
        console.log(data);
        switch (arg.name) {
            case "detail":
                this.dialog.show(PackingListForm, data)
                    .then(response => {
                        return response;
                    });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        return this.isPackingType;
        // if(this.isPackingType){
        //     return true;
        // }el
        // switch (name) {
        //     case "print":
        //         return data;
        //     default:
        //         return true;
        // }
    }

    get isAval() {
        return this.zona && this.zona == "GUDANG AVAL";
    }

    get isPackingType() {
        return this.zona && (this.zona == "GUDANG JADI" || this.zona == "SHIPPING");
    }

    get isStockOpname() {
        return this.zona && this.zona == "STOCK OPNAME";
    }

    get trackLoader(){
        return TrackLoader;
      }
    
      trackView = (track) => {
        console.log(track);
        return `${track.Type} - ${track.Name}`
      }
    




}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
