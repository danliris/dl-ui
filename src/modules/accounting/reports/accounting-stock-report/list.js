import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    @bindable UnitItem;
    @bindable KtgrItem;
    
    KategoriItems= ['','BAHAN BAKU','BAHAN EMBALANCE','BAHAN PENDUKUNG']
    UnitItems = ['','KONFEKSI 2A','KONFEKSI 2B','KONFEKSI 2C','KONFEKSI 1A','KONFEKSI 1B']

    search(){
            this.info.page = 1;
            this.info.total=0;
            this.searching();        
    }
    activate() {
       
    }
    tableData = []
    searching() {
        var info = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unit ? this.unit : "",
            category : this.category ? this.category : "",
            //suppliertype : this.Tipe
        };
        this.service.search(info)
            .then(result=>{
                this.data=[];
                for(var _data of result){
                    console.log(_data)
                    if(info.unitcode == "C2A"){
                        _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2AQty,
                        _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2APrice
                    }else if (info.unitcode == "C2B"){
                        _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2BQty,
                        _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2BPrice
                    }else if (info.unitcode == "C2C"){
                        _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2CQty,
                        _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2CPrice
                    }else if (info.unitcode == "C1A"){
                        _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon1MNSQty,
                        _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon1MNSPrice
                    }else{
                        _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2DQty,
                        _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2DPrice
                    }
                    this.data.push(_data);

                 }
                console.log(this.data)
            })
    }

    reset() {
        this.dateFrom= "",
        this.dateTo="",
        this.KtgrItem="",
        this.UnitItem=""
        
    }

    ExportToExcel() {
        let args = {            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unit ? this.unit : "",
            category : this.category ? this.category : "",
        };
        
        this.service.generateExcel(args);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }
    }

    UnitItemChanged(newvalue){
        console.log(newvalue);
        if (newvalue) {
            if (newvalue === "KONFEKSI 2A") {
                this.unit = "C2A";
            }
            else if (newvalue === "KONFEKSI 2B") { 
                this.unit = "C2B"; 
            }
            else if (newvalue === "KONFEKSI 2C") {
                this.unit = "C2C"; 
            }else if(newvalue === "KONFEKSI 1A"){
                this.unit = "C1A";
            }else if(newvalue === "KONFEKSI 1B"){
                this.unit = "C1B";
            }else{
                this.unit = "";
            }
        }
    }

    KtgrItemChanged(newvalue){
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "BB";
            }
            else if (newvalue === "BAHAN PENDUKUNG") { 
                this.category = "BP"; 
            }
            else if (newvalue === "BAHAN EMBALANCE") {
                this.category = "BE"; 
            }else{
                this.category = "";
            }
        }
    }
    
}
