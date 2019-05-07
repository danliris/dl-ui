import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var UnitLoader = require('../../../../loader/unit-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
   
    unit=null;    
    jnsSpl = false;
    payMtd = "DAN LIRIS";    
    category= "FABRIC";
    dateFrom = null;
    dateTo = null;
    @bindable JenisSpl;
    @bindable KtgrItem;
         
    SupplierType = ['LOCAL', 'IMPORT'];
    KategoriItem = ['BAHAN BAKU', 'INTERLINING', 'BAHAN PENDUKUNG'];
   
    termPaymentLocal = ['DAN LIRIS', 'CMT', 'FREE FROM BUYER', 'SAMPLE']; 
    termPaymentImport = ['T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];

    get unitLoader() {
        return UnitLoader;
    }
    
    activate() {
       
    }

    JenisSplChanged(newvalue) {
        if (newvalue) {
            this.jnsSpl = newvalue === "LOCAL" ? false : true;          
        }
    }

    KtgrItemChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "FABRIC";
            }
            else if (newvalue === "INTERLINING") { 
                this.category = "INTERLINING"; 
            }
            else {
                this.category = "BAHAN PENDUKUNG"; 
            }
        }
    }

    searching() {
        var QtyTotals = 0;
        var PriceTotals = 0;
        var PriceIDRTotals = 0;
        var percentage = [];
        var percentagetotal = 0;
        var data = [];
        var Quantity = [];
        var Amounts = [];
        var uri = ""; 
    
        this.dateFrom=this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.dateTo=this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        uri = this.service.getDataSpl(this.unit, this.jnsSpl, this.payMtd, this.category, this.dateFrom, this.dateTo);
      
        uri.then(data => {
        
            this.data = data;
            for(var item of data)
            {
                QtyTotals += item.Quantity;
                PriceTotals += item.Amount;
                PriceIDRTotals += item.AmountIDR;
                
                item.Quantity=item.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                item.Amount=item.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                item.AmountIDR=item.AmountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2 });        
          }
            this.QtyTotals = QtyTotals.toLocaleString('en-EN', { minimumFractionDigits: 2 });            
            this.PriceTotals = PriceTotals.toLocaleString('en-EN', { minimumFractionDigits: 2 });
            this.PriceIDRTotals = PriceIDRTotals.toLocaleString('en-EN', { minimumFractionDigits: 2 });            
        })
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
        this.category = null; 
        this.data = [];
    }

    ExportToExcel() {
        this.error = {};
        if (!this.unit || this.unit == "")            
            this.error.unit = "Unit Konfeksi Harus Diisi";

        this.dateFrom=this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.dateTo=this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
              
        this.service.generateExcel(this.unit, this.jnsSpl, this.payMtd, this.category, this.dateFrom, this.dateTo);
    }
    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}