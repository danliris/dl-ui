import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var CategoryLoader=require('../../../../loader/category-loader');
var UnitLoader=require('../../../../loader/unit-loader');
var UnitReceiptNoteLoader=require('../../../../loader/unit-receipt-note-basic-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    controlOptions = {
        label: {
          length: 4
        },
        control: {
          length: 5
        }
      }
    bind() {
        this.reset();
    }
    get unitReceiptNoteLoader(){
        return UnitReceiptNoteLoader;
    }
    unitReceiptNoteView = (unitReceiptNote) => {
        return `${unitReceiptNote.no} `
    }
    get categoryLoader(){
        return CategoryLoader;
    }
    categoryView = (category) => {
        return `${category.code} - ${category.name}`
    }
    get unitLoader(){
        return UnitLoader;
    }   
    unitView = (unit) => {
        return `${unit.code} - ${unit.name}`
    } 
    
    

searching() {
    if (false){
        alert("");
    } else {
            var info = {
            no : this.no ? this.no : "",
            category : this.category ? this.category.code : "",
            unit : this.unit ? this.unit.code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
               this.data=result;
               this.data = [];
               var dataByCategory = {};
               var subTotalDPPCategory = {};
               var subTotalPPNCategory = {};
               var subTotalCategory = {};
               for (var data of result) {
                 for (var item of data.items) {
                   var Category = item.purchaseOrder.category.name;
                   var checkIncomeTax = 0;
                   if (item.purchaseOrder.useIncomeTax == true) checkIncomeTax=1;
                   if (!dataByCategory[Category]) dataByCategory[Category] = [];
                   dataByCategory[Category].push({
                     Date: moment(data.date).format("DD MMM YYYY"),
                     No: data.no,
                     Product: item.product.name,
                     SPB: data.incomeTaxNo || "-",
                     Category: item.purchaseOrder.category.name,
                     Unit: data.unit.name,
                     DPP: Math.round(item.pricePerDealUnit * item.deliveredQuantity).toLocaleString('id-ID'),
                     PPN: Math.round(((item.pricePerDealUnit * item.deliveredQuantity)*10/100) * checkIncomeTax).toLocaleString('id-ID'),
                     Total: Math.round((item.pricePerDealUnit * item.deliveredQuantity) + (((item.pricePerDealUnit * item.deliveredQuantity)*10/100) * checkIncomeTax)).toLocaleString('id-ID'),
                   });
                   if (!subTotalCategory[Category]){
                    subTotalDPPCategory[Category] = 0;
                    subTotalPPNCategory[Category] = 0;
                    subTotalCategory[Category] = 0;
                   } 
                   subTotalDPPCategory[Category] += Math.round(item.pricePerDealUnit * item.deliveredQuantity);
                   subTotalPPNCategory[Category] += Math.round(((item.pricePerDealUnit * item.deliveredQuantity)*10/100) * checkIncomeTax);
                   subTotalCategory[Category] += Math.round((item.pricePerDealUnit * item.deliveredQuantity) + (((item.pricePerDealUnit * item.deliveredQuantity)*10/100) * checkIncomeTax));
                 }
               }
     
               var categories = [];
               this.total = 0;
               this.totalDPP = 0;
               this.totalPPN = 0;
               
               for (var data in dataByCategory) {
                 categories.push({
                   data: dataByCategory[data],
                   category: dataByCategory[data][0].Category,
                   subTotalDPP: (subTotalDPPCategory[data]).toLocaleString('id-ID'),
                   subTotalPPN: (subTotalPPNCategory[data]).toLocaleString('id-ID'),
                   subTotal: (subTotalCategory[data]).toLocaleString('id-ID'),
                 });
                 this.totalDPP += subTotalDPPCategory[data];
                 this.totalPPN += subTotalPPNCategory[data];
                 this.total += subTotalCategory[data];
               }
               this.totalDPP = this.totalDPP.toLocaleString('id-ID');
               if(this.totalPPN==0){
                this.totalPPN = "-";
               } else {
                this.totalPPN = this.totalPPN.toLocaleString('id-ID');
               }
               this.total = this.total.toLocaleString('id-ID');
               this.categories = categories;
               
               for (var data of this.categories){
                   if(data.subTotalPPN==0)data.subTotalPPN="-";
                   for(var item of data.data){
               
                       if(item.PPN==0)item.PPN="-";
                   }
               }
               
            //    if(this.categories.data.PPN == 0) this.categories.data.PPN="-";
             });
        }
    }
    
    ExportToExcel() {
        if (false){
            alert("");
        } else {
            var filter = {
                no : this.no ? this.no : "",
                category : this.category ? this.category.code : "",
                unit : this.unit ? this.unit.code : "",
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
        this.no = "";
        this.category="";
        this.unit="";
        this.dateFrom = new Date();
        this.dateTo = new Date();
        
    }

}