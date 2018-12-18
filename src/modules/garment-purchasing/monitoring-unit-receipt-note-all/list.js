import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../loader/garment-units-loader');
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
    unitView = (unit) => {
      
        return `${unit.Code} - ${unit.Name}`
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
            poRefPR : this.poRefPR ? this.poRefPR : "",
            roNo : this.roNo ? this.roNo : "",
            doNo : this.doNo ? this.doNo : "",
            supplier : this.supplier ? this.supplier.code : "",
            unit : this.unit ? this.unit.Code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
       
        this.service.search(info.no,  info.poRefPR,  info.roNo,  info.doNo,  info.unit,  info.supplier, info.dateFrom, info.dateTo)
            .then(result => {
               this.data=result;
            });
    }
    
     ExportToExcel() {
        var info = {
            no : this.no ? this.no : "",
            poRefPR : this.poRefPR ? this.poRefPR : "",
            roNo : this.roNo ? this.roNo : "",
            doNo : this.doNo ? this.doNo : "",
            supplier : this.supplier ? this.supplier.code : "",
            unit : this.unit ? this.unit.Code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateXls(info.no,  info.poRefPR,  info.roNo,  info.doNo,  info.unit,  info.supplier, info.dateFrom, info.dateTo)
    }
  

    reset() {
       
        this.no = "";
        this.poRefPR="";
        this.roNo="";
        this.doNo="";
        this.unit = "";
        this.dateFrom = "";
        this.dateTo = "";
        this.supplier = "";
       
    }
}