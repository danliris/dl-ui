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

    // bind(context) {
    //     this.context = context;
    //     console.log(this.context)
    // }
    async bind(){
        if(this.category==""){
            this.catBb="BB";
            this.catBp="BP";
            var filter = {
                "_IsDeleted": false
            }
            filter[`CodeRequirement == "${this.catBb}" || CodeRequirement == "${this.catBp}"`]=true;
            var info = { filter: JSON.stringify(filter), size: Number.MAX_SAFE_INTEGER };
            console.log(info)
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


    activate(params) {
        // this.context = context;
        // this.data = context.data;
        // this.options = context.options;
        console.log(params);
        if (this.dateFrom != null || params.dateTo != null || params.category != null) {
            this.dateFrom = params.dateFrom;
            this.dateTo = params.dateTo;
            this.category = params.category;
            var uri = "";
     
            uri = this.service.search(this.dateFrom, this.dateTo, this.category);
                
            uri.then(result => {
                this.data = [];
                console.log(result);
                
                for (var _data of result) {
                _data.supplier =_data.supplier ? _data.supplier : "-";
                this.data.push(_data);
                this.tjumcount+=_data.jumlah;
                this.tperOk+=_data.percentOk_notOk;
                }
            })
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
            var info = { filter: JSON.stringify(filter), size: Number.MAX_SAFE_INTEGER };
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
            var info = { filter: JSON.stringify(filter), size: Number.MAX_SAFE_INTEGER };
            var categoryProduct = await this.service.searchGarmentCategory(info);
        }
        var productCode = [];
        var garmentCategory = [];
        for(var data of categoryProduct){
            garmentCategory.push(data);
            productCode.push(data.code);
        }
        this.garmentCategory = JSON.stringify(garmentCategory)
        this.garmentCategory = JSON.stringify(productCode);
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
        this.tperOk = 0;
        this.service.search(info)
            .then(result => {
                this.data = [];
                console.log(result);
                
                for (var _data of result) {
                _data.supplier =_data.supplier ? _data.supplier : "-";
                this.data.push(_data);
                this.tjumcount +=_data.jumlah;
                this.tperOk += _data.percentOk_notOk;
                }
        })
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
        console.log(info)
        this.service.generateExcel(info)
      //  this.service.generateExcel(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.buyer ? this.buyer._id : "", this.purchaseRequest ? this.purchaseRequest.no : "", this.dateFrom, this.dateTo, this.prState.value);
    }

    // dateFromChanged(e) {
    //     var _startDate = new Date(e.srcElement.value);
    //     var _endDate = new Date(this.dateTo);


    //     if (_startDate > _endDate)
    //         this.dateTo = e.srcElement.value;

    // }

}