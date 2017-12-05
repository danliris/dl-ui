import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../loader/unit-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var UnitReceiptLoader = require('../../../loader/garment-unit-receipt-note-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    get unitLoader(){
        return UnitLoader;
    }
    get supplierLoader(){
        return SupplierLoader;
    }
     get unitReceiptLoader(){
        return UnitReceiptLoader;
     
    }
  
  searching() {
        var info = {
            
            no : this.no ? this.no : "",
            pr : this.pr ? this.pr : "",
            purchaseRequestRefNo : this.purchaseRequestRefNo ? this.purchaseRequestRefNo : "",
            supplier : this.supplier ? this.supplier.code : "",
            unit : this.unit ? this.unit.code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info.no,info.pr,info.unit,info.supplier,info.purchaseRequestRefNo,info.dateFrom,info.dateTo)
            .then(result => {
               this.data=result;
            });
    }
    
     ExportToExcel() {
        var info = {
            no : this.no ? this.no : "",
            pr : this.pr ? this.pr : "",
            purchaseRequestRefNo : this.purchaseRequestRefNo ? this.purchaseRequestRefNo : "",
            supplier : this.supplier ? this.supplier.code : "",
            unit : this.unit ? this.unit.code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateXls(info.no,info.pr,info.unit,info.supplier,info.purchaseRequestRefNo,info.dateFrom,info.dateTo)
    }
  

    reset() {
       
        this.no = "";
        this.pr="";
        this.purchaseRequestRefNo="";
        this.unit = "";
        this.dateFrom = "";
        this.dateTo = "";
        this.supplier = "";
       
    }
}