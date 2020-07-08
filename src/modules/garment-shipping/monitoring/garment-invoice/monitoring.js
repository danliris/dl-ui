import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const GarmentBuyerLoader = require('../../../../loader/garment-buyers-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    
    buyerAgent = null;
    invoiceType = "";
    dateFrom = null;
    dateTo = null;
   
    @bindable JnsInv;
   
    InvoiceType = ['','DL', 'SM'];

    get garmentbuyerLoader() {
        return GarmentBuyerLoader;
    }

    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }

    activate() {
       
    }

    JnsInvChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "DL") {
                this.invoiceType = "DL";
            }
            else {
                this.invoiceType = "SM"; 
            }
        }
    }

    searching() {
        {
        var info = {
            buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",
            invoiceType : this.invoiceType ? this.invoiceType : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }

         this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var dataByBuyer = {};
                  var subTotalBuyer = {};
                  var subTotalBuyer1 = {};
                  
                  for (var data of result) {
                       var Buyer = data.buyerAgentName;
                        if (!dataByBuyer[Buyer]) dataByBuyer[Buyer] = [];                 
                            dataByBuyer[Buyer].push({                            
                         
                            buyerAgentCode : data.buyerAgentCode,
                            buyerAgentName : data.buyerAgentName,
                            invoiceNo : data.invoiceNo,
                            invoiceDate : moment(data.invoiceDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.ConfirmDate).format("DD MMM YYYY"),
                 
                            origin : data.origin,
                            destination : data.destination,
                            consigneeName : data.consigneeName,
                            sailingDate : moment(data.sailingDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.ConfirmDate).format("DD MMM YYYY"),
                            pebNo : data.pebNo,
                            pebDate : moment(data.pebDate).format("DD MMM YYYY")=="01 Jan 0001"? "-" : moment(data.ConfirmDate).format("DD MMM YYYY"),
                            orderNo : data.orderNo,
                            shippingStaffName : data.shippingStaffName,                            
                            amount : data.amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            toBePaid : data.toBePaid.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                        });
                        
                        if (!subTotalBuyer[Buyer]){
                           subTotalBuyer[Buyer] = 0;
                           } 
                           subTotalBuyer[Buyer] += data.amount;

                        if (!subTotalBuyer1[Buyer]) {
                           subTotalBuyer1[Buyer] = 0;
                           } 
                           subTotalBuyer1[Buyer] += data.toBePaid;
                    
                }
     
               var buyers = [];
               this.TotAmount = 0;
               this.TotToBePaid = 0;
                
               for (var data in dataByBuyer) {
                   buyers.push({
                   data: dataByBuyer[data],
                   buyer: dataByBuyer[data][0].buyerAgentName,
                   subTotal: (subTotalBuyer[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal1: (subTotalBuyer1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                 });
                   this.TotAmount += subTotalBuyer[data];
                   this.TotToBePaid += subTotalBuyer1[data];   
               }
               this.TotAmount = this.TotAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotToBePaid = this.TotToBePaid.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.buyers = buyers;
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
                buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",
                invoiceType : this.invoiceType ? this.invoiceType : "",
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
        this.invoiceType = null; 
        this.buyers = [];
        this.TotAmount = null;            
        this.TotToBePaid = null; 
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}