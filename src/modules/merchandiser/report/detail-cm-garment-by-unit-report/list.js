import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
var UnitLoader = require('../../../../loader/unit-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
   
    unitName=null;    
    dateFrom = null;
    dateTo = null;
      
    get unitLoader() {
        return UnitLoader;
    }

    activate() {
       
    }

    searching() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.unitName) {
           info.unitName = this.unitName.Name
        }
        this.service.search(JSON.stringify(info))
            .then(result => {
                this.data = result;
                console.log(result);

                this.CMIDR = 0;
                this.CMIDR = 0;
                this.CMP = 0;
                this.FOBPrice = 0;


                var datas = [];
                for (var item of this.data){
                    this.CMIDR = (item.FOB_Price * item.CurrencyRate) - (item.Commission) - (item.BudgetAmount / item.Quantity);
                    this.CMUSD = this.CMIDR / item.CurrencyRate;

                    this.CMP = (item.CMPrice / item.CurrencyRate) * 1.05;
                     
                    this.FOBPrice=(item.FOB_Price + this.CMP) - (item.Insurance + item.Freight);
                    
                    this.CMIDR=this.CMIDR.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    this.CMUSD=this.CMUSD.toLocaleString('en-EN',{minimumFractionDigits: 4, maximumFractionDigits: 4});                     
                    this.FOBPrice=this.FOBPrice.toLocaleString('en-EN',{minimumFractionDigits: 4, maximumFractionDigits: 4});
                    
                    item.DeliveryDate=moment(item.DeliveryDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.DeliveryDate).format("DD MMM YYYY");                    
                    item.Quantity=item.Quantity.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    
                    item.OTL1=item.OTL1.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    item.OTL2=item.OTL2.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    
                    item.SMV_Cutting=item.SMV_Cutting.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    item.SMV_Sewing=item.SMV_Sewing.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    item.SMV_Finishing=item.SMV_Finishing.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    item.SMV_Total=item.SMV_Total.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
    
                    datas.push(item);
                }
                this.data = datas;

                });        
    }
          
    ExportToExcel() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.unitName) {
           info.unitName = this.unitName.Name
        }
        this.service.generateExcel(JSON.stringify(info));
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unitName = null;
        this.data = [];
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}