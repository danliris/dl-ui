import { inject, bindable } from 'aurelia-framework'
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
    
    dateFrom = null;
    dateTo = null;

    activate() {
       
    }
   
    searching() {
        {
        var info = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }

         this.service.search(info)
            .then(result => {
                  this.data = result.data;
                  console.log(result.data);
                  var datas = [];
                  for (var item of this.data){
                      item.dnDate=moment(item.dnDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.dnDate).format("DD MMM YYYY");
                      item.rate=item.rate.toLocaleString('en-EN',{minimumFractionDigits: 0, maximumFractionDigits: 0});
                      item.amount=item.amount.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.amountIDR=item.amountIDR.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      
                      datas.push(item);

                    }
                  this.data = datas;   
                }); 
        }   
    }

    ExportToExcel() {
        {
            var info = {
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }

        this.service.generateExcel(info)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.data = [];          
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}