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
    // machine = null;
    // kanban = null;
    // filterKanban = null;
    // kanbanId = null;
    
    activate() {
    }

    searching() {
            this.service.getReport(this.dateFrom, this.dateTo, this.machine, this.kanban)
                .then(result => {
                    this.data = result;

                    for (var daily of this.data)
                     {
                         var a= daily.items.pricePerUnit.toFixed(4).toString().split('.');
                         var a1=a[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                         var harga= a1 + '.' + a[1];

                         var b= daily.items.priceTotal.toFixed(2).toString().split('.');
                         var b1=b[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                         var total= b1 + '.' + b[1];
                         
                         var c= daily.items.quantity.toFixed(2).toString().split('.');
                         var c1=b[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                         var quantity= c1 + '.' + c[1];

                         daily.items.pricePerUnit=harga;
                         daily.items.priceTotal=total;
                         daily.items.quantity=quantity;
                        // daily.timeOutput = daily.timeOutput ? moment(daily.timeOutput).format('HH:mm') : '-';
                     }
                })
    }
    
    // kanbanChanged(e){
    //     var selectedKanban = e.detail;
    //     if(selectedKanban){
    //         this.kanbanId = selectedKanban._id;
    //         if(selectedKanban.instruction){
    //             var steps = [];
    //             for(var step of selectedKanban.instruction.steps){
    //                 steps.push(step.process);
    //             }
    //             this.filterMachine = {
    //                 "step.process" : { "$in" : steps }
    //             };
    //         }
    //     }
    // }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        // this.machine = null;
        // this.kanban = null;
        // this.filterKanban = null;
        // this.kanbanId = null;
        this.data = [];
        this.error = '';
    }

    ExportToExcel() {
        // var htmltable= document.getElementById('myTable');
        // var html = htmltable.outerHTML;
        // //  window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        // window.open('data:application/vnd.ms-excel,'+ encodeURIComponent(html)); 
        this.service.generateExcel(this.dateFrom, this.dateTo);
    }
}