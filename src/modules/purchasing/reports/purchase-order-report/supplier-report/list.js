import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
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
        var data = [];
        var amounts = [];
        var uri = ""; 
       if(this.filter)
       {
       if(this.filter.dateFrom)
       {
           this.filter.dateFrom= moment(this.filter.dateFrom).format("YYYY-MM-DD");
           console.log(this.filter.dateFrom);
       }
       if(this.filter.dateTo)
       {
           this.filter.dateTo= moment(this.filter.dateTo).format("YYYY-MM-DD");
           console.log(this.filter.dateTo);
       }
      }
        uri = this.service.getDataSpl(this.filter.unit, this.filter.category, this.filter.dateFrom,  this.filter.dateTo);
      
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