import {inject,bindable} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }
    
    searching() {
        var info = {
            categoryName : this.category ?this.category:"",
           
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            unit : this.unit ? this.unit.Id : "",
        }
        this.service.search(info)
            .then(result => {
                console.log(result);
                this.data=[];
                for (var _data of result.data) {
                    //_data.QtyOrder = _data.QtyOrder.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.ProductCode = _data.ProductCode;
                    _data.ProductName = _data.ProductName;
                    _data.UomUnit = _data.UomUnit;
                    _data.UnitName = _data.UnitName;
                    _data.QuantityReceipt = _data.QuantityReceipt.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.PriceReceipt=_data.PriceReceipt.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.BeginingBalanceQuantity = _data.BeginingbalanceQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.BeginingBalancePrice = _data.BeginingbalancePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.QuantityUnitExpend = _data.QuantityUnitExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.PriceUnitExpend = _data.PriceUnitExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.QuantitySampleExpend = _data.QuantitySampleExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.PriceSampleExpend = _data.PriceSampleExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.QuantityLocalExpend = _data.QuantityLocalExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.PriceLocalExpend = _data.PriceLocalExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.QuantityOtherExpend = _data.QuantityOtherExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.PriceOtherExpend = _data.PriceOtherExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.EndBalanceQuantity = _data.EndbalanceQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.EndBalancePrice = _data.EndbalancePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    this.data.push(_data);
                    console.log(this.data);
                }
                
            });
    }
    
    ExportToExcel() {
        var info = {
            categoryName : this.category ?this.category:"",
           
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            unit : this.unit ? this.unit.Id : "",
            
        }
        this.service.xls(info);
    }

    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    
    }
    @bindable category;
    
    categoryItems= ['FABRIC','ACCESSORIES','BARANG JADI']
    categoryChanged(newvalue){
        if (newvalue) {
            if (newvalue === "FABRIC") {
                
                this.categoryname = "FABRIC";
            }
            else if (newvalue === "ACCESSORIES") { 
                
                this.categoryname = "ACCESSORIES";
            }
            else if (newvalue === "BARANG JADI") {
                 
                this.categoryname = "BARANG JADI";
            } 
        }else{
            this.unit = "";
            this.unitname = "";
        }
    }
    reset() {
        this.categoryName = null;
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
        this.unitname = "";
    }
}