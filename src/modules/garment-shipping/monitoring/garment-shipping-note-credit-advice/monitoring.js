import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const GarmentBuyerLoader = require('../../../../loader/garment-buyers-loader');

var ShippingNoteCALoader = require('../../../../loader/garment-shipping-note-credit-advice-loader');


@inject(Router, Service)
export class List {

    PaymentTermOptions = ["", "TT PAYMENT", "LC PAYMENT"];

    NoteTypeOptions = ["", "NOTA DEBIT", "NOTA KREDIT"];
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    
    @bindable selectedShippingNoteCA;

    buyerAgent = null;
    noteNo = null;
    noteType = null;
    paymentTerm = null;
    dateFrom = null;
    dateTo = null;

    get garmentbuyerLoader() {
        return GarmentBuyerLoader;
    }

    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }


    get shippingNoteCALoader() {
        return ShippingNoteCALoader;
    }

   get filter() {
        var filter = {};
        if(this.noteType == 'NOTA DEBIT')
            {
              filter = {
               "NoteType == \"NOTA DEBIT\"": true
                };
            }
            else 
            {
              filter = {
               "NoteType == \"NOTA KREDIT\"": true
                };
            }
        return filter;
    }


    activate() {
       
    }
   
    searching() {
        {
        var info = {
            buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",
            noteType : this.noteType ? this.noteType : "",
            noteNo : this.noteNo ? this.noteNo.NoteNo : "",
            paymentTerm : this.paymentTerm ? this.paymentTerm : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }

         this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var dataByBuyer = {};
                  var subTotalBuyer1 = {};
                  var subTotalBuyer2 = {};
                  var subTotalBuyer3 = {};
                  var subTotalBuyer4 = {};
                  var subTotalBuyer5 = {};
                  var subTotalBuyer6 = {};                  
                                    
                  for (var data of result) {
                       var Buyer = data.noteNo;
                        if (!dataByBuyer[Buyer]) dataByBuyer[Buyer] = [];                 
                            dataByBuyer[Buyer].push({                            
                               
                                noteNo : data.noteNo,
                                date : moment(data.date).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.date).format("DD MMM YYYY"),
                                paymentDate : moment(data.paymentDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.paymentDate).format("DD MMM YYYY"),                      
                                paymentTerm : data.paymentTerm,    
                            
                                buyerName : data.buyerName,
                                bankName : data.bankName,
                                amount : data.amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),        
                                paidAmount : data.paidAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                balanceAmount : data.balanceAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                         
                                nettNego : data.nettNego.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
                                bankComission : data.bankComission.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
                                creditInterest : data.creditInterest.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),               
                                bankCharge : data.bankCharge.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
                                insuranceCharge : data.insuranceCharge.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
        
                        });
                        
                        if (!subTotalBuyer1[Buyer]) {
                           subTotalBuyer1[Buyer] = 0;
                           } 
                           subTotalBuyer1[Buyer] += data.paidAmount;
                           
                        if (!subTotalBuyer2[Buyer]) {
                            subTotalBuyer2[Buyer] = 0;
                            } 
                            subTotalBuyer2[Buyer] += data.nettNego;  
                            
                        if (!subTotalBuyer3[Buyer]) {
                                subTotalBuyer3[Buyer] = 0;
                            } 
                            subTotalBuyer3[Buyer] += data.bankComission;        

                        if (!subTotalBuyer4[Buyer]) {
                                subTotalBuyer4[Buyer] = 0;
                            } 
                            subTotalBuyer4[Buyer] += data.creditInterest;   

                        if (!subTotalBuyer5[Buyer]) {
                                subTotalBuyer5[Buyer] = 0;
                            } 
                            subTotalBuyer5[Buyer] += data.bankCharge;  

                        if (!subTotalBuyer6[Buyer]) {
                                subTotalBuyer6[Buyer] = 0;
                            } 
                            subTotalBuyer6[Buyer] += data.insuranceCharge;                                         
                }
     
               var buyers = [];
               this.Total1 = 0;
               this.Total2 = 0;
               this.Total3 = 0;
               this.Total4 = 0;
               this.Total5 = 0;
               this.Total6 = 0;       
                  
               for (var data in dataByBuyer) {
                   buyers.push({
                   data: dataByBuyer[data],
                   buyer: dataByBuyer[data][0]. noteeNo,
                   subTotal1: (subTotalBuyer1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalBuyer2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal3: (subTotalBuyer3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal4: (subTotalBuyer4[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal5: (subTotalBuyer5[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal6: (subTotalBuyer6[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
             });   
                
                 this.Total1 += subTotalBuyer1[data]; 
                 this.Total2 += subTotalBuyer2[data]; 
                 this.Total3 += subTotalBuyer3[data]; 
                 this.Total4 += subTotalBuyer4[data]; 
                 this.Total5 += subTotalBuyer5[data]; 
                 this.Total6 += subTotalBuyer6[data]; 

               }
                this.Total1 = this.Total1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.Total2 = this.Total2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.Total3 = this.Total3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.Total4 = this.Total4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.Total5 = this.Total5.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.Total6 = this.Total6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.buyers = buyers; 
             });  
        }   
    }

    ExportToExcel() {
        {
            var info = {
                buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",
                noteType : this.noteType ? this.noteType : "",
                noteNo : this.noteNo ? this.noteNo.NoteNo : "",
                paymentTerm : this.paymentTerm ? this.paymentTerm : "",
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
        this.noteNo = null; 
        this.noteType = null;         
        this.paymentTerm = null;
        this.buyers = [];      
        this.Total1 = null;
        this.Total2 = null;
        this.Total3 = null;
        this.Total4 = null;
        this.Total5 = null;
        this.Total6 = null; 
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}