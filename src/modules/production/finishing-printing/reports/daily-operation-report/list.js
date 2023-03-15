import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';


import moment from 'moment';
 var MachineLoader = require("../../../../../loader/machines-loader");
var KanbanLoader = require("../../../../../loader/kanban-loader");

@inject(Router, Service)
export class List {

    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
        this.flag = false;
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
       // pagination: false
    }

 

   

    areaOptionsHard = [
        { text: "SEMUA AREA", value: 0 },
        { text: "DIGITAL PRINT", value: 1 },
        { text: "DYEING", value: 2 },
        { text: "FINISHING", value: 3 },
        { text: "PRETREATMENT", value: 4 },
        { text: "PRINTING", value: 5 },
            ];
    shiftOptionsHard = [
        { text: "SEMUA SHIFT", value: 0 },
        { text: "PAGI", value: 1 },
        { text: "SIANG", value: 2 },
        { text: "MALAM", value: 3 },
            ];

    columns = [
                    
                    { field: "name", title: "AreaJS", valign: "top" },
                    { field: "namaMesin", title: "Mesin", valign: "top" },
                    { field: "createdAt", title: "Tanggal",  valign: "top" },
                    { field: "shift", title: "Shift",  valign: "top" },
                    { field: "grup", title: "Group", valign: "top" },
                    { field: "panjang_in", title: "Panjang_IN", valign: "top" },
                    { field: "panjang_out_bq", title: "Panjang_OUT_BQ", valign: "top" },
                    { field: "panjang_out_bs", title: "Panjang_OUT_BS", valign: "top" },
               
            ];

    

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.infoAreaHard="";
        this.infoShift="";
      
    }

    // searching() {
    //     this.service.getReport(this.dateFrom, this.dateTo, this.machine, this.kanban)
    //         .then(result => {
    //             this.data = result;
    //             for (var daily of this.data) {
    //                 daily.timeInput = daily.dateInput ? moment(daily.timeInput).format('HH:mm') : '-';
    //                 daily.timeOutput = daily.timeOutput ? moment(daily.timeOutput).format('HH:mm') : '-';
    //             }
    //         })
    // }

    rowFormatter(data, index) {
        // if (index === 12) {
        //     return { classes: "weight" }
        // } else {
        //     return {};
        // }
        return {};
    }

    search() {
       this.error = {};
       console.log("masuk fungsi search");
         if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            console.log("diatas Table.refresh");
            this.Table.refresh();
            console.log("dibawah Table.refresh");
             }
        }

    loader = (info) => {
        console.log("masuk fungsi loader");
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
    
      
        var args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            //idMesin:this.Machine.Id,
          };
        console.log("ini args : "+ args);
        //console.log("idMesin : "+ idMesin);
       // console.log("this.Machine.Id : "+ this.Machine.Id);
        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        console.log("masuk this.service.search ");

                        var index=0;
                        for(var data of result.data){
                            index++;
                            data.index=index;
                           
                        }
                        return {
                            total: result.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
       
        // return this.service.search(arg).then((result) => {
        //   var resultPromise = [];
        //   if (result && result.data && result.data.length > 0) {
        //     resultPromise = result.data;
        //   }
        //   return Promise.all(resultPromise).then((newResult) => {
        //     return {
        //       total: result.info.total,
        //       data: newResult,
        //     };
        //   });
        // });
      }

    // search() {
    //     let args = {
    //         // infoAreaHard:"PRINTING",
    //         // Machine:"5",//mesin ichinose
    //         // dateFrom:"2023-01-01",
    //         // dateTo:"2023-01-31",
    //         // infoShift:"PAGI",
           
    //       }
    //       this.service.search().then(result => {
    //         var resultPromise = [];
    //         if (result && result.data && result.data.length > 0) {
    //           resultPromise = result.data;
    //         }
    //         return Promise.all(resultPromise).then((newResult) => {
    //           return {
    //             total: result.info.total,
    //             data: newResult,
    //           };
    //         });
    //     })
    // }

    // searching() {
    //     this.listDataFlag = true;
        
    //     this.dailyTable.refresh();
    // }

    // exportToExcel() {
    //     this.fillValues();
    //     this.service.generateExcel(this.info);
    // }

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

    // reset() {
    //     this.listDataFlag = false;
    //     this.dateFrom = null;
    //     this.dateTo = null;
    //     this.Machine = null;
    //     this.Kanban = null;
    //     this.filterKanban = null;
    //     this.kanbanId = null;
    //     this.error = '';
    // }

    ExportToExcel() {
        //    var htmltable= document.getElementById('myTable');
        //    var html = htmltable.outerHTML;
        //    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        var dateFrom = this.dateFrom?  moment(this.dateFrom).format("DD MMM YYYY HH:mm")  :null
        var dateTo = this.dateTo?  moment(this.dateTo).format("DD MMM YYYY HH:mm")  :null
        
        this.service.generateExcel(dateFrom, dateTo, this.Machine, this.Kanban);
    }

    get machineLoader() {
        return MachineLoader;
    }

    get kanbanLoader() {
        return KanbanLoader;
    }

}