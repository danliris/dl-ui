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
   
    unitName=null;    
    supplierType = false;
    supplierName= " ";
    dateFrom = null;
    dateTo = null;
    @bindable JenisSpl;
    @bindable NamaSpl;
         
    SupplierType = ['LOCAL', 'IMPORT'];
    SupplierName = ['','DAN LIRIS', 'SELAIN DAN LIRIS'];
      
    get unitLoader() {
        return UnitLoader;
    }

    activate() {
       
    }

    JenisSplChanged(newvalue) {
        if (newvalue) {
            this.supplierType = newvalue === "LOCAL" ? false : true;          
        }
    }

      searching() {
        {
            var info = {
            unitName : this.unitName ? this.unitName.Id : "",
            supplierType : this.supplierType ? this.supplierType : "",
            supplierName : this.NamaSpl,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var dataBySupplier = {};
                  var subTotalSupplier1 = {};
                  var subTotalSupplier2 = {};
                  var subTotalSupplier3 = {};
                  var subTotalSupplier4 = {};

                  for (var data of result) {
                       var Supplier = data.SupplierName;
                       let Amount1 = 0,Amount2 = 0,Amount3 = 0,Amount4 = 0;
                       switch ( data.CodeRequirement) {
                       case 'BE' :
                            Amount1 = data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount2 = 0;
                            Amount3 = 0;
                            Amount4 = 0;
                            break;
                        case 'BP' :
                            Amount1 = 0;
                            Amount2 = data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount3 = 0;
                            Amount4 = 0;
                            break;
                            
                        case 'BB' :
                            Amount1 = 0;
                            Amount2 = 0;
                            Amount3 = data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount4 = 0;
                            break;
                        default:
                            Amount1 = 0;
                            Amount2 = 0;
                            Amount3 = 0;
                            Amount4 = data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            break;     
                        }      
                     
                        if (!dataBySupplier[Supplier]) dataBySupplier[Supplier] = [];                 
                            dataBySupplier[Supplier].push({                            
                            SplName : data.SupplierName,
                            Konveksi : data.UnitName,
                            BPBesar : data.BillNo,
                            BPKecil : data.PaymentBill,
                            NoSJ : data.DONo,
                            NotaInt : data.InternNo,
                            NmBrg : data.ProductName,
                            JnsBrg : data.CodeRequirement,
                            Jumlah : data.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                            
                            Satuan : data.UOMUnit,
                            AmountBE : Amount1,
                            AmountBP : Amount2,
                            AmountBB : Amount3,
                            AmountBX : Amount4,
                        });
                    
                        if (!subTotalSupplier1[Supplier]) {
                           subTotalSupplier1[Supplier] = 0;
                          } 

                        if (!subTotalSupplier2[Supplier]) {
                           subTotalSupplier2[Supplier] = 0;
                          } 
   
                        if (!subTotalSupplier3[Supplier]) {
                           subTotalSupplier3[Supplier] = 0;
                          } 

                        if (!subTotalSupplier4[Supplier]) {
                           subTotalSupplier4[Supplier] = 0;
                          } 

                       switch (data.CodeRequirement) {
                       case 'BE' :
                            subTotalSupplier1[Supplier] += data.Amount;
                            break;
                        case 'BP' :
                            subTotalSupplier2[Supplier] += data.Amount;
                            break;                            
                        case 'BB' :
                            subTotalSupplier3[Supplier] += data.Amount;
                            break;
                        default:
                            subTotalSupplier4[Supplier] += data.Amount;
                            break;
                        }      

                        }
     
               var suppliers = [];
               this.AmountTotal1 = 0;
               this.AmountTotal2 = 0;
               this.AmountTotal3 = 0;
               this.AmountTotal4 = 0;
                
               for (var data in dataBySupplier) {
                   suppliers.push({
                   data: dataBySupplier[data],
                   supplier: dataBySupplier[data][0].SplName,
                   subTotal1: (subTotalSupplier1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalSupplier2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal3: (subTotalSupplier3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal4: (subTotalSupplier4[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),               
             });
                   this.AmountTotal1 += subTotalSupplier1[data];
                   this.AmountTotal2 += subTotalSupplier2[data];
                   this.AmountTotal3 += subTotalSupplier3[data];
                   this.AmountTotal4 += subTotalSupplier4[data];
                   
               }
               this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal2 = this.AmountTotal2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal3 = this.AmountTotal3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal4 = this.AmountTotal4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.suppliers = suppliers;
             });
        }
    }

    ExportToExcel() {
        {
            var filter = {
            unitName : this.unitName ? this.unitName.Id : "",
            supplierType : this.supplierType ? this.supplierType : "",
            supplierName : this.NamaSpl,
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
        this.unitName = null;
        this.supplierType = false; 
        this.supplierName = null;         
        this.suppliers = [];
        this.AmountTotal1 = null;
        this.AmountTotal2 = null;
        this.AmountTotal3 = null;
        this.AmountTotal4 = null;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}