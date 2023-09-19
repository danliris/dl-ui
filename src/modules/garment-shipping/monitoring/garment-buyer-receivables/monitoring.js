import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const GarmentBuyerLoader = require('../../../../loader/garment-buyers-loader');
const GarmentShippingInvoiceLoader = require('../../../../loader/garment-shipping-invoice-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    
    buyerAgent = null;
    invoiceNo = null;   
    dateFrom = null;
    dateTo = null;
   
    get garmentbuyerLoader() {
        return GarmentBuyerLoader;
    }

    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }

    get shippinginvoiceLoader() {
        return GarmentShippingInvoiceLoader;
    }

    shippinginvoiceNoView = (invoiceNo) => {
        return `${invoiceNo.invoiceNo}`
    }
   


    activate() {
       
    }

    searching() {
        {
        var info = {
            buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",          
            invoiceNo : this.invoiceNo ? this.invoiceNo.invoiceNo : "",                    
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }

         this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var datas = [];
                  for (var item of this.data){
                      item.invoiceDate=moment(item.invoiceDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.invoiceDate).format("DD MMM YYYY");
                      item.sailingDate=moment(item.sailingDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.sailingDate).format("DD MMM YYYY");
                      item.dueDate=moment(item.dueDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.pebDate).format("DD MMM YYYY");                    
                      item.paymentDate=moment(item.paymentDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.paymentDate).format("DD MMM YYYY");
                    
                      item.toBePaid=item.toBePaid.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.dhlCharges=item.dhlCharges.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
             
                      item.paymentAmount=item.paymentAmount.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.bankCharges=item.bankCharges.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.bankComission=item.bankComission.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.creditInterest=item.creditInterest.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.otherCharges=item.otherCharges.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});                     
                      item.discrepancyFee=item.discrepancyFee.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});                     
                      item.receiptAmount=item.receiptAmount.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.outStandingAmount=item.outStandingAmount.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});

                      datas.push(item);
                  }
                  this.data = datas;
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
                buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",   
                invoiceNo : this.invoiceNo ? this.invoiceNo.invoiceNo : "",            
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }

        this.service.generateExcel(info)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.buyerAgent = null;
        this.invoiceNo = null; 
        this.data = []; 
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}