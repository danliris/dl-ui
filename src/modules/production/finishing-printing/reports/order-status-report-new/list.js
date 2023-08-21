import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

import moment from 'moment';
var ProductionOrderLoader = require('../../../../../loader/production-order-loader');
var OrderTypeLoader = require('../../../../../loader/order-type-loader');

@inject(Router, Service)
export class List {

    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
        this.flag = false;

        this.year = moment().format('YYYY');
        for (var i = parseInt(this.year) + 1; i > 2010; i--) {
            this.yearList.push(i.toString());
        }
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };
    yearList = [];
    orderTypeList = ["", "WHITE", "DYEING", "PRINTING", "YARN DYED"];

    columns = [
            { field: "index", title: "No", valign: "top" },
            { field: "productionOrderNo", title: "Nomor SPP", valign: "top" },
            { field: "targetQty", title: "Target Kirim Buyer", valign: "top" },
            { field: "remainingQty", title: "Sisa Belum Turun Kanban", valign: "top" },
            { field: "preProductionQty", title: "Belum Produksi", valign: "top" },
            { field: "inProductionQty", title: "Sedang Produksi", valign: "top" },
            { field: "qcQty", title: "Sedang QC", valign: "top" },
            { field: "producedQty", title: "Sudah Produksi", valign: "top" },
            { field: "sentGJQty", title: "Sudah Kirim Gudang Jadi", valign: "top" },
            { field: "sentBuyerQty", title: "Sudah Kirim Buyer", valign: "top" },
            { field: "remainingSentQty", title: "Sisa Belum Kirim Buyer", valign: "top" },
    ];

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.infoAreaHard="";
        this.infoShift="";
    }

    rowFormatter(data, index) {
        return {};
    }

    search() {
        this.error = {};
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.Table.refresh();
        }
    }

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
    
      
        var args = {
            startdate : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            finishdate : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,
            orderType:this.OrderType ? this.OrderType.Id : null,
          };
        return this.flag ?
            (
            this.service.search(args)
                .then(result => {
                    var index=0;
                    for(var data of result.data){
                        index++;
                        data.index=index;
                    }
                    return {
                        total: result.total,
                        data: result.data
                    };
                })
            ) : { total: 0, data: [] };
       
      }

    ExportToExcel() {
        var args = {
            startdate : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            finishdate : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,
            orderType:this.OrderType ? this.OrderType.Id : null,
          };
        this.service.generateExcel(args);
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }
    get orderTypeLoader() {
        return OrderTypeLoader;
    }
    reset(){
        this.OrderType=null;
        this.dateFrom=null;
        this.dateTo=null;
    }
}