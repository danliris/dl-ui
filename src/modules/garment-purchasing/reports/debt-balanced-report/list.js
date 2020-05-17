import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
   
    //jnsSpl = false;
    payMtd = " ";    
    category= " ";
    dateFrom = null;
    dateTo = null;
    @bindable JenisSpl;
    @bindable KtgrItem;
         
    SupplierType = ['LOCAL', 'IMPORT'];
    KategoriItem = ['','BAHAN BAKU', 'BAHAN PENDUKUNG', 'BAHAN EMBALASE'];
   
    termPaymentLocal = ['', 'DAN LIRIS', 'CMT', 'FREE FROM BUYER', 'SAMPLE']; 
    termPaymentImport = ['','T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];

    activate() {
       
    }

    JenisSplChanged(newvalue) {
      console.log(newvalue);  
       if (newvalue) {
          this.jnsSpl = newvalue === "LOCAL" ? false : true;      
       }                     
    }

    KtgrItemChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "BB";
            }
            else if (newvalue === "BAHAN PENDUKUNG") { 
                this.category = "BP"; 
            } 
            else if (newvalue === "BAHAN EMBALASE") { 
                this.category = "BE"; 
            }           
            else {
                this.category = " "; 
            }
        }
        
    }

    searching() {
        {
            var info = {
            jnsSpl : this.jnsSpl,
            payMtd : this.payMtd ? this.payMtd : "",            
            category : this.category ? this.category : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""   
        }
        this.service.search(info)
            .then(result => {
                  console.log(result);
                  var dataBySupplier = {};
                  var subTotalSupplier = {};
                  for (var data of result) {
                       var Supplier = data.SupplierName;
                        if (!dataBySupplier[Supplier]) dataBySupplier[Supplier] = [];                 
                            dataBySupplier[Supplier].push({                            
                            supplierCode : data.SupplierCode,                               
                            supplierName : data.SupplierName,
                            currencyCode : data.CurrencyCode,
                            codeRequirment : data.CodeRequirement,
                            paymentMethod : data.PaymentMethod,
                            billNo : data.BillNo,
                            billDate : moment(data.ArrivalDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.ArrivalDate).format("DD MMM YYYY"),                          
                            doNo : data.DONo,
                            amtDebt : data.DebtAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            payNo : data.PaymentNo,
                            payDate : moment(data.PaymentDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.PaymentDate).format("DD MMM YYYY"),                                                      
                            amtPay : data.PaymentAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            debtBalance : data.DebtBalance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                       
                  });
                        
                   if (!subTotalSupplier[Supplier]){
                       subTotalSupplier[Supplier] = 0;
                   } 
                       subTotalSupplier[Supplier] += data.DebtBalance;
                }
     
               var suppliers = [];
               this.AmtTotal = 0;
                
               for (var data in dataBySupplier) {
                   suppliers.push({
                   data: dataBySupplier[data],
                   supplier: dataBySupplier[data][0].supplierName,
                   subTotal: (subTotalSupplier[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                 });
                   this.AmtTotal += subTotalSupplier[data];
               }
               this.AmtTotal = this.AmtTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.suppliers = suppliers;
             });
        }
    }

    ExportToExcel() {
        {
            var filter = {
            jnsSpl : this.jnsSpl,
            payMtd : this.payMtd ? this.payMtd : "",            
            category : this.category ? this.category : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
           }

        this.service.generateExcel(filter)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.category = null; 
        this.suppliers = [];
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}