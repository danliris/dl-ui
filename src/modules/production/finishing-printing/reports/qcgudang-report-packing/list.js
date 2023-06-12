import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class List {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    dateFrom = null;
    dateTo = null;
    
   
    data = [];

    activate() {
    }

    searching() {
        var baris = 0;
  

        var inputQuantityDyeingtotals = 0;
        var inputQuantityPrintingtotals = 0;
        var inputQuantitySolidtotals = 0;

     
        var ninputQuantityDyeing = 0;
        var ninputQuantityPrinting = 0;
        var ninputQuantitySolid = 0;
        var ntotinputQuantityPrintingtgl = 0;
        var ntotinputQuantityDyeingtgl = 0;
        var ntotinputQuantitySolidtgl = 0;

        

        this.service.getReport(this.dateFrom, this.dateTo)
            .then(result => {

                var dataTemp = [];
                for (var a of result) {
                    var temp = {
                        "createdUtc": a.createdUtc,
                        "inputQuantityDyeing": a.inputQuantityDyeing,
                        "inputQuantityPrinting": a.inputQuantityPrinting,
                        "inputQuantitySolid": a.inputQuantitySolid,

                    }
                    dataTemp.push(temp);
                }
                this.data = dataTemp;
                for (var scount of result) {
                    inputQuantityDyeingtotals += scount.inputQuantityDyeing;
                    if (scount.inputQuantityDyeing !== 0) {
                        ninputQuantityDyeing = 1;
                    } else {
                        ninputQuantityDyeing = 0;
                    }
                    ntotinputQuantityDyeingtgl += ninputQuantityDyeing;
                    //--
                    inputQuantityPrintingtotals += scount.inputQuantityPrinting;
                    if (scount.inputQuantityPrinting !== 0) {
                        ninputQuantityPrinting = 1;
                    } else {
                        ninputQuantityPrinting = 0;
                    }
                    ntotinputQuantityPrintingtgl += ninputQuantityPrinting;
                    
                    //--
                    inputQuantitySolidtotals += scount.inputQuantitySolid;
                    if (scount.inputQuantitySolid!== 0) {
                        ninputQuantitySolid = 1;
                    } else {
                        ninputQuantitySolid = 0;
                    }
                    ntotinputQuantitySolidtgl += ninputQuantitySolid;
                   
       
                    baris += 1;
                }
               
                console.log('ini inputQuantityDyeingtotals : '+inputQuantityDyeingtotals);
                this.inputQuantityDyeingtotals=inputQuantityDyeingtotals.toFixed(2);
                this.inputQuantityPrintingtotals=inputQuantityPrintingtotals.toFixed(2);
                this.inputQuantitySolidtotals=inputQuantitySolidtotals.toFixed(2);

                

                this.ntotinputQuantityPrintingtgl = (inputQuantityPrintingtotals / ntotinputQuantityPrintingtgl).toFixed(2);
                this.ntotinputQuantityDyeingtgl = (inputQuantityDyeingtotals / ntotinputQuantityDyeingtgl).toFixed(2);
                this.ntotinputQuantitySolidtgl = (inputQuantitySolidtotals / ntotinputQuantitySolidtgl).toFixed(2);

            })
    }



    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.data = [];
        this.error = '';

        this.inputQuantityDyeingtotals = 0;
        this.inputQuantityPrintingtotals = 0;
        this.inputQuantitySolidtotals = 0;

        this.whitetotals = 0;
        this.dyeingtotals = 0;
        this.ulanganPrintingtotals = 0;
        this.printingtotals = 0;
        this.jumlahtotals = 0;

        this.ntotulanganSolidtgl = 0;
        this.ntotwhitetgl = 0;
        this.ntotdyeingtgl = 0;

        this.ninputQuantityDyeing = 0;
        this.ninputQuantityPrinting = 0;
        this.ninputQuantitySolid = 0;
        this.ntotulanganPrintingtgl = 0;
        this.ntotinputQuantityDyeingtgl = 0;
        this.ntotinputQuantitySolidtgl = 0;
        
        this.ntotprintingtgl = 0;
        this.ntotjumlahtgl = 0;

        this.ulanganSolidbaris = 0;
        this.whitebaris = 0;
        this.dyeingbaris = 0;
        this.ulanganPrintingbaris = 0;
        this.printingbaris = 0;
        this.jumlahbaris = 0;
    }

    ExportToExcel() {
        this.service.generateExcel(this.dateFrom, this.dateTo);
    }
}