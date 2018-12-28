import { inject,BindingEngine } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var PRLoader = require('../../../loader/garment-purchase-request-loader');
var UnitLoader = require('../../../loader/unit-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader');

@inject(Router, BindingEngine, Service)
export class List {
  reprosesOption = ['','Bahan Baku', 'Bahan Pendukung'];

  
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
        if(this.category==""){
            this.catBb="BB";
            this.catBp="BP";
            var filter = {
                "_IsDeleted": false
            }
            filter[`CodeRequirement == "${this.catBb}" || CodeRequirement == "${this.catBp}"`]=true;
            var info = { filter: JSON.stringify(filter), size: 2147483647 };
            var categoryProduct = await this.service.searchGarmentCategory(info);    
        }
        var productCode = [];
        var garmentCategory = [];
        for(var data of categoryProduct){
            garmentCategory.push(data);
            productCode.push(data.code);
        }
        this.garmentCategory = JSON.stringify(garmentCategory);
        this.productCode = JSON.stringify(productCode);
    }


    activate(params) {
        if ( params.dateTo != null || params.category != null) {
            this.dateFrom = params.dateFrom;
            this.dateTo = params.dateTo;
            this.category = params.category;
            var info = {
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
                category : this.category ? this.category: "",
                garmentCategory : params.garmentCategory ? params.garmentCategory: "",
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
        this.category='';
            }
    }

    get prLoader(){
        return PRLoader;
    }

    get unitLoader(){
        return UnitLoader;
    }
    get categoryLoader(){
        return CategoryLoader;
    }
    get buyerLoader(){
        return BuyerLoader;
    }

    async categoryChanged(e){
        this.category = e.srcElement.value;
        if(this.category==""){
            this.catBb="BB";
            this.catBp="BP";
            var filter = {
                "_IsDeleted": false
            }
            filter[`CodeRequirement == "${this.catBb}" || CodeRequirement == "${this.catBp}"`]=true;
            var info = { filter: JSON.stringify(filter), size: 2147483647 };
            var categoryProduct = await this.service.searchGarmentCategory(info);    
        } else {
            if(this.category=="Bahan Baku"){
                this.cat = "BB";
            } else if(this.category=="Bahan Pendukung"){
                this.cat = "BP";
            }
            var filter = {
                "CodeRequirement": this.cat,
                "_IsDeleted": false
            }
            var info = { filter: JSON.stringify(filter), size: 2147483647 };
            var categoryProduct = await this.service.searchGarmentCategory(info);
        }
        var productCode = [];
        var garmentCategory = [];
        for(var data of categoryProduct){
            garmentCategory.push(data);
            productCode.push(data.code);
        }
        this.garmentCategory = JSON.stringify(garmentCategory)
        this.productCode = JSON.stringify(productCode);
    }

    search() {
        var info = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
            category : this.category ? this.category: "",
            garmentCategory : this.garmentCategory ? this.garmentCategory: "",
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
        this.category = "";
        this.data=[];
 
    }

    view(data, dateFrom, dateTo, category) {
        var info = {
            supplierCode : data.supplier.Code ? data.supplier.Code: "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
            category : this.category ? this.category: "",
            garmentCategory : this.garmentCategory ? this.garmentCategory: "",
            productCode : this.productCode ? this.productCode: ""
        }
        this.router.navigateToRoute('view', { id: data.supplier.Code,supplierCode: data.supplier.Code,info: info});
     }

    ExportToExcel() {
        var info = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
            category : this.category ? this.category: "",
            garmentCategory : this.garmentCategory ? this.garmentCategory: "",
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