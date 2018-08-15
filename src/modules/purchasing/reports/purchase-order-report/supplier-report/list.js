import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

var UnitLoader = require('../../../../../loader/unit-loader');
var CategoryLoader = require('../../../../../loader/category-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    unit=null;
    category=null;
    dateFrom = null;
    dateTo = null;

    listDataFlag = false;
    get unitLoader() {
        return UnitLoader;
    }
    get categoryLoader() {
        return CategoryLoader;
    }

    activate() {
    }
    searching() {
        var pricetotals = 0;
        var percentage = [];
        var percentagetotal = 0;
        var persen = 0;
        var data = [];
        var amounts = [];
        var uri = ""; 
       
        console.log(this.filter.category);
        uri = this.service.getDataSpl(this.filter.unit, this.filter.category, this.dateFrom, this.dateTo);
     
        uri.then(data => {
        
            this.data = data;
            for(var item of data)
            {
                item.amount=item.amount.toFixed(2);
                pricetotals= item.total;
                item.percentage=(item.amount/item.total).toFixed(2);  
            }
            this.pricetotals = pricetotals.toFixed(2);
             this.percentagetotal = 100;
            // for (var price of data) {
            //     pricetotals += price.pricetotal;
            // }
            // this.pricetotals = pricetotals;

            // for (var item of data) {
            //    // if (item.pricetotal != 0 && this.pricetotals != 0) {
            //         //this.persen = ((item.pricetotal * 100) / this.pricetotals).toFixed(2);
            //         this.persen = ((item.amount * 100) / item.total).toFixed(2);
            //     //}
            //    // else {
            //      //   this.persen = 0;
            //     //}
            //    percentage.push(this.persen);
            // //     var x = item.pricetotal.toFixed(2).toString().split('.');
            // //     var x1 = x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // //     var amount = x1 + '.' + x[1];
            // //     amounts.push(amount);
            //  }
            // for (var p of percentage) {
            //     percentagetotal += parseFloat(p);
            // }
            // this.percentage = percentage;
            // this.percentagetotal = Math.round(percentagetotal).toFixed(2);
            // this.amounts = amounts;
            // // var y = this.pricetotals.toFixed(2).toString().split('.');
            // // var y1 = y[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // this.pricetotals = y1 + '.' + y[1];
        })
    }

    reset() {
        this.filter.dateFrom = null;
        this.filter.dateTo = null;
        this.filter.unit = null;
        this.filter.category = null; 
    }

    ExportToExcel() {
        this.service.generateExcel(this.filter.unit, this.filter.category, this.dateFrom, this.dateTo);
    }
    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}