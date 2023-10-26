import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

const UnitLoader = require('../../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        
        const moment = require('moment');
        moment.locale('id');

        this.monthList = moment.months();

        this.currentYear = moment().year();
        this.currentMonth = moment().month();

        this.filterYear = this.currentYear;
        this.filterMonth = this.monthList[this.currentMonth];

        this.yearOptions = {
            min: this.currentYear - 50,
            max: this.currentYear + 50
        }
    }    

    unit = null;
    dateFrom = null;
    dateTo = null;
    invoices = [];
    
    get unitLoader() {
        return UnitLoader;
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`
    }

    get unitQuery(){
        var result = { "Description" : "GARMENT" }
        return result;   
    }

   searching() {    
   {
    var info = {
            unit : this.unit ? this.unit.Code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        
            this.service.search(info)
                .then(result => {
                    this.data = result;   
                    console.log(result);                
                    var dataByInvoice = {};
                    var subTotalInv1 = {};
                    var subTotalInv2 = {};
                    
                    for (var data of result) {
                        var Invoice = data.unitCode;
                         if (!dataByInvoice[Invoice]) dataByInvoice[Invoice] = [];                 
                             dataByInvoice[Invoice].push({   

                             unitCode : data.unitCode,                      
                             localSalesNoteNo : data.localSalesNoteNo,
                             localSalesNoteDate : moment(data.localSalesNoteDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(data.localSalesNoteDate).format("DD MMM YYYY"),                  
                             localSalesContractNo : data.localSalesContractNo,
                             paymentTerm : data.paymentTerm,
                             buyerName : data.buyerName,
                             buyerBrandName : data.buyerBrandName,
                             comodityName : data.comodityName,
                             roNo : data.roNo,
                             article : data.article,
                             packingOutNo : data.packingOutNo,
                             quantity : data.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                             uomUnit : data.uomUnit,
                             currencyCode : data.currencyCode,
                             amount : data.amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        
                         });
                                 
                            if (!subTotalInv1[Invoice]) {
                               subTotalInv1[Invoice] = 0;
                            } 
                               subTotalInv1[Invoice] += data.quantity;
                             
                            if (!subTotalInv2[Invoice]) {
                               subTotalInv2[Invoice] = 0;
                            } 
                               subTotalInv2[Invoice] += data.amount;                        
                        }
      
                var invoices = [];
                this.QtyTotal = 0;               
                this.AmountTtl = 0;
                                    
                for (var data in dataByInvoice) {
                    invoices.push({
                    data: dataByInvoice[data],
                    invoice: dataByInvoice[data][0].unitCode,
                    subTotal: (subTotalInv1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    subTotal1: (subTotalInv2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                   
                  });
                    this.QtyTotal += subTotalInv1[data];   
                    this.AmountTtl += subTotalInv2[data];                                       
                }
                this.QtyTotal = this.QtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.AmountTtl = this.AmountTtl.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.invoices = invoices;
                 });
            }               
    }

    ExportToExcel() {
        {
            var info = {
                unit : this.unit ? this.unit.Code : "",
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }

        this.service.xls(info)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
        this.QtyTotal = null;     
        this.QtyTotal1 = null;     
        this.AmountTtlUSD = null;
        this.AmountTtlIDR = null;
        this.invoices = [];
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}