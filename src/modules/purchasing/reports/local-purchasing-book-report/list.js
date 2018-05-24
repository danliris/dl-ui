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
            no : this.unitReceiptNote ? this.unitReceiptNote.no : "",
            category : this.category ? this.category.name : "",
            unit : this.unit ? this.unit.name : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
               this.data=result;console.log(result);
               this.data = [];
               var dataByCategory = {};
               var subTotalCategory = {};
               for (var data of result) {
                 for (var item of data.items) {
                   var Category = item.purchaseOrder.category.name;
                   if (!dataByCategory[Category]) dataByCategory[Category] = [];
                   dataByCategory[Category].push({
                     Date: moment(data.date).format("DD MMM YYYY"),
                     No: data.no,
                     Product: item.product.name,
                     SPB: data.incomeTaxNo || "-",
                     Category: item.purchaseOrder.category.name,
                     Unit: data.unit.name,
                     DPP: Math.round(item.pricePerDealUnit * item.deliveredQuantity),
                     PPN: Math.round(item.pricePerDealUnit * item.deliveredQuantity)*10/100,
                     Total: (Math.round(item.pricePerDealUnit * item.deliveredQuantity)) + (Math.round(item.pricePerDealUnit * item.deliveredQuantity)*10/100),
                   });
     
                   if (!subTotalCategory[Category]) subTotalCategory[Category] = 0;
                   subTotalCategory[Category] += Math.round(item.pricePerDealUnit * item.deliveredQuantity);
                 }
               }
     
               var categories = [];
               this.total = 0;
               for (var data in dataByCategory) {
                 categories.push({
                   data: dataByCategory[data],
                   subTotalDPP: subTotalCategory[data],
                   subTotalPPN: subTotalCategory[data]*10/100,
                   subTotal: subTotalCategory[data] + (subTotalCategory[data]*10/100),
                 });
                 this.totalDPP += subTotalCategory[data];
                 this.totalPPN += subTotalCategory[data]*10/100;
                 this.total += subTotalCategory[data] + (subTotalCategory[data]*10/100);
               }
               this.categories = categories;
     
             });
        }
    }
    
    ExportToExcel() {
        if (false){
            alert("");
        } else {
            var filter = {
                no : this.unitReceiptNote ? this.unitReceiptNote.no : "",
                category : this.category ? this.category.name : "",
                unit : this.unit ? this.unit.name : "",
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
        this.unitReceiptNote = "";
        this.category="";
        this.unit="";
        this.dateFrom = new Date();
        this.dateTo = new Date();
        
    }

}