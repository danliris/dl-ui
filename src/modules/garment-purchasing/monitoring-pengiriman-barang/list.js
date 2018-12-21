import { inject,BindingEngine } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var PRLoader = require('../../../loader/garment-purchase-request-loader');
var UnitLoader = require('../../../loader/unit-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader');

@inject(Router, BindingEngine, Service)
export class List {
  
    purchaseRequest = {};
    filter = {isPosted: true};
    
    constructor(router, bindingEngine, service) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.router = router;
        this.today = new Date();
        
    }
    attached() {
    }

    async bind(){
        var filter = {
            "_IsDeleted": false
        }
        filter[`CodeRequirement == "BB"`]=false;
        filter[`CodeRequirement == "BP"`]=false;
        var info = { filter: JSON.stringify(filter), size: Number.MAX_SAFE_INTEGER };
        var categoryProduct = await this.service.searchGarmentCategory(info);    
        var productCode = [];
        var garmentCategory = [];
        for(var data of categoryProduct){
            productCode.push(data.code);
        }
        this.productCode = JSON.stringify(productCode);
    }

    activate(params) {
        if ( params.dateTo != null || params.category != null) {
            this.dateFrom = params.dateFrom;
            this.dateTo = params.dateTo;
            var info = {
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
                productCode : params.productCode ? params.productCode: ""
            }
            this.tjumcount = 0;
            this.tperOkCount = 0;
            this.tperOk = 0;
            this.service.search(info)
                .then(result => {
                    this.data = [];
                    for (var _data of result) {
                    _data.supplier =_data.supplier ? _data.supplier : "-";
                    this.data.push(_data);
                    if(_data.ok_notOk="OK"){
                        this.tperOkCount += 1 ;
                    }
                    this.tjumcount +=_data.jumlah;
                    }
                    this.tperOk = Math.floor(this.tperOkCount/this.tjumcount *100);
            });
        } else {
        this.dateFrom='';
        this.dateTo='';
        }
    }

   
    search() {
        var info = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
            productCode : this.productCode ? this.productCode: ""
        }
        this.tjumcount = 0;
        this.tperOkCount = 0;
        this.tperOk = 0;
        this.service.search(info)
            .then(result => {
                this.data = [];
                for (var _data of result) {
                _data.supplier =_data.supplier ? _data.supplier : "-";
                this.data.push(_data);
                if(_data.ok_notOk="OK"){
                    this.tperOkCount += 1 ;
                }
                this.tjumcount +=_data.jumlah;
                }
                this.tperOk = Math.floor(this.tperOkCount/this.tjumcount *100);
        });
    }
    reset() {
  
        this.dateFrom = "";
        this.dateTo = "";
        this.data=[];
 
    }

  view(data, dateFrom, dateTo) {
    var info = {
        supplierCode : data.supplier.Code ? data.supplier.Code: "",
        dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
        dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
        productCode : this.productCode ? this.productCode: ""
    }
       this.router.navigateToRoute('view', { id: data.supplier.Code,supplierCode: data.supplier.Code,info: info});
    }

    ExportToExcel() {
     var info = {
        dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
        dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
        productCode : this.productCode ? this.productCode: ""
    }
    this.service.generateExcel(info)
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }

}