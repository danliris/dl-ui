import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
@inject(Router, Service)
export class List {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    activate() {
    }
  dateFrom = null;
    dateTo = null;
    searching() {
        var pricetotals = 0;
        var percentage = [];
        var percentagetotal = 0;
        var persen = 0;
        var data = [];
        var amounts = [];
        var uri="";
        this.dateFrom=this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.dateTo=this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        
        uri = this.service.getByData(this.dateFrom,  this.dateTo);
      
        uri.then(data => {
      
            this.data = data;
            for(var item of data)
            {
                pricetotals= item.total;
                item.percentage=(item.amount*100/item.total).toFixed(2);  
                item.amount=item.amount.toLocaleString()+".00";
            }
            this.pricetotals = pricetotals.toLocaleString() +".00";
            this.percentagetotal = 100;
        })
        // if(this.dateFrom==undefined && this.dateTo==undefined)
        //     uri= this.service.getallData();
        // else
        //     uri=this.service.getByDate(this.dateFrom, this.dateTo);

        //     uri.then(data => {
        //         this.data = data;
        //         for (var price of data) {
        //             pricetotals += price.pricetotal;
        //         }
        //         this.pricetotals = pricetotals;
        //         for (var item of data) {
        //             if (item.pricetotal != 0 && this.pricetotals != 0) {
        //                 this.persen = ((item.pricetotal * 100) / this.pricetotals).toFixed(2);
        //             }
        //             else {
        //                 this.persen = 0;
        //             }
        //             percentage.push(this.persen);
        //             var x = item.pricetotal.toFixed(2).toString().split('.');
        //             var x1 = x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //             var amount = x1 + '.' + x[1];
        //             amounts.push(amount);
        //         }
        //         for (var p of percentage) {
        //             percentagetotal += parseFloat(p);
        //         }
        //         this.percentage = percentage;
        //         this.percentagetotal = Math.round(percentagetotal).toFixed(2);
        //         this.amounts = amounts;
        //         var y = this.pricetotals.toFixed(2).toString().split('.');
        //         var y1 = y[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //         this.pricetotals = y1 + '.' + y[1];
        //     })
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
    }

    ExportToExcel() {
        // if(this.dateFrom==undefined && this.dateTo==undefined)
        //     this.service.generateExcelnoDate();
        // else
            this.service.generateExcel(this.dateFrom, this.dateTo);
    }
    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}