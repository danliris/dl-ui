import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

import moment from 'moment';
var OrderTypeLoader = require('../../../../../loader/order-type-loader');

@inject(Router, Service)
export class List {

    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
        this.flag = false;

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

    columns = [
            { field: "index", title: "No",align: 'center' },
            { field: "SPPNo", title: "Nomor SPP",align: 'center' },
            { field: "OrderLength", title: "Panjang Order",align: 'right' },
            { field: "DeliveryDate", title: "Tanggal Delivery",align: 'center' }
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
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,
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
                        data.OrderLength= data.orderLength + "  "+ data.UomUnit;
                        data.DeliveryDate=moment(data.DeliveryDate).format("DD MMM YYYY")
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
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,
            orderType:this.OrderType ? this.OrderType.Id : null,
          };
        this.service.xls(args);
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