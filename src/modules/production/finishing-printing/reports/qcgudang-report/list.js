import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

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
    machine = null;
    kanban = null;
    filterKanban = null;
    kanbanId = null;
    
    activate() {
    }

    searching() {
        var baris=0;
        var ulanganSolidbaris=0;
        var whitebaris=0;
        var dyeingbaris=0;
        var ulanganPrintingbaris=0;
        var printingbaris=0;
        var jumlahbaris=0;

        var ulanganSolidtotals=0;
        var nulanganSolidtgl=0;
        var ntotulanganSolidtgl=0;

        var whitetotals=0;
        var nwhitetgl=0;
        var ntotwhitetgl=0;

        var dyeingtotals=0;
        var ndyeingtgl=0;
        var ntotdyeingtgl=0;

        var ulanganPrintingtotals=0;
         var nulanganPrintingtgl=0;
        var ntotulanganPrintingtgl=0;

        var printingtotals=0;
         var nprintingtgl=0;
        var ntotprintingtgl=0;

        var jumlahtotals=0;
         var njumlahtgl=0;
        var ntotjumlahtgl=0;

            this.service.getReport(this.dateFrom, this.dateTo)
                .then(result => {
                    //this.data = result;
                 var dataTemp = [];
                   for (var a of result) {
                var temp = {
                    "_id": a._id,
                    "ulanganSolid": a.ulanganSolid.toFixed(2),
                    "white": a.white.toFixed(2),
                    "dyeing": a.dyeing.toFixed(2),
                    "ulanganPrinting": a.ulanganPrinting.toFixed(2),
                    "printing": a.printing.toFixed(2),
                    "jumlah": a.jumlah.toFixed(2),
                    }
                     dataTemp.push(temp);
                   }
            this.data = dataTemp;
                     for (var scount of result) {
                        ulanganSolidtotals += scount.ulanganSolid;
                        if (scount.ulanganSolid !==0 ){
                            nulanganSolidtgl=1;
                        }else{
                            nulanganSolidtgl=0;
                        }
                         ntotulanganSolidtgl += nulanganSolidtgl;

                        whitetotals += scount.white;
                        if (scount.white !==0 ){
                            nwhitetgl=1;
                        }else{
                            nwhitetgl=0;
                        }
                         ntotwhitetgl += nwhitetgl;

                        dyeingtotals += scount.dyeing;
                        if (scount.dyeing !==0 ){
                            ndyeingtgl=1;
                        }else{
                            ndyeingtgl=0;
                        }
                         ntotdyeingtgl += ndyeingtgl;

                        ulanganPrintingtotals += scount.ulanganPrinting;
                        if (scount.ulanganPrinting !==0 ){
                            nulanganPrintingtgl=1;
                        }else{
                            nulanganPrintingtgl=0;
                        }
                         ntotulanganPrintingtgl += nulanganPrintingtgl;


                        printingtotals += scount.printing;
                        if (scount.printing !==0 ){
                            nprintingtgl=1;
                        }else{
                            nprintingtgl=0;
                        }
                         ntotprintingtgl += nprintingtgl;

                        jumlahtotals += scount.jumlah;
                        if (scount.jumlah !==0 ){
                            njumlahtgl=1;
                        }else{
                            njumlahtgl=0;
                        }
                         ntotjumlahtgl += njumlahtgl;

                          baris += 1;
            }
             this.ulanganSolidtotals = ulanganSolidtotals.toFixed(2);
             this.whitetotals = whitetotals.toFixed(2);
             this.dyeingtotals = dyeingtotals.toFixed(2);
             this.ulanganPrintingtotals = ulanganPrintingtotals.toFixed(2);
             this.printingtotals = printingtotals.toFixed(2);
             this.jumlahtotals = jumlahtotals.toFixed(2);

             this.ntotulanganSolidtgl = (ulanganSolidtotals/ntotulanganSolidtgl).toFixed(2);
             this.ntotwhitetgl = (whitetotals/ntotwhitetgl).toFixed(2);
             this.ntotdyeingtgl = (dyeingtotals/ntotdyeingtgl).toFixed(2);
             this.ntotulanganPrintingtgl = (ulanganPrintingtotals/ntotulanganPrintingtgl).toFixed(2);
             this.ntotprintingtgl = (printingtotals/ntotprintingtgl).toFixed(2);
              this.ntotjumlahtgl = (jumlahtotals/ntotjumlahtgl).toFixed(2);
              this.baris = baris;  

               this.ulanganSolidbaris = (ulanganSolidtotals/baris).toFixed(2);
             this.whitebaris = (whitetotals/baris).toFixed(2);
             this.dyeingbaris = (dyeingtotals/baris).toFixed(2);
             this.ulanganPrintingbaris = (ulanganPrintingtotals/baris).toFixed(2);
             this.printingbaris = (printingtotals/baris).toFixed(2);
              this.jumlahbaris = (jumlahtotals/baris).toFixed(2);
                })
    }
    


    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.data = [];
        this.error = '';

               this.ulanganSolidtotals =0;
             this.whitetotals = 0;
             this.dyeingtotals = 0;
             this.ulanganPrintingtotals = 0;
             this.printingtotals = 0;
             this.jumlahtotals = 0;

             this.ntotulanganSolidtgl = 0;
             this.ntotwhitetgl = 0;
             this.ntotdyeingtgl = 0;
             this.ntotulanganPrintingtgl = 0;
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