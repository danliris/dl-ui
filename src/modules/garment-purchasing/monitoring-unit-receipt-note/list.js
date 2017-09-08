import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../loader/unit-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');

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
  
  searching() {
        var info = {
            no : this.no ? this.no : "",
            supplier : this.supplier ? this.supplier.code : "",
            unit : this.unit ? this.unit.code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info.no,info.unit,info.supplier,info.dateFrom,info.dateTo)
            .then(result => {
               
                this.data = [];
                for (var pr of result) {
                    for (var item of pr.items) { 
                         var _data = {};   
                        _data._createdDate = moment(new Date(pr.date));
                        _data.no = pr.no;
                        _data.unit = pr.unit.name;
                        _data.supplier = pr.supplier.name;
                        _data.deliveryOrderNo = pr.deliveryOrderNo;
                        _data.code= item.product.code;
                        _data.name= item.product.name;
                        _data.deliveredQuantity = item.deliveredQuantity;
                        _data.unitcode=item.deliveredUom.unit;
                        _data.remark = item.remark;
                        this.data.push(_data); 
                    }
                }
            });
    }
    
     ExportToExcel() {
        var info = {
            no : this.no ? this.no : "",
            supplier : this.supplier ? this.supplier.code : "",
            unit : this.unit ? this.unit.code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateXls(info.no,info.unit,info.supplier,info.dateFrom,info.dateTo)
    }
  

    reset() {
       
        this.no = '';
        this.unit = '';
        this.dateFrom = null;
        this.dateTo = null;
        this.supplier = {};
       
    }
}