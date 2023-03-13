import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

var MachineLoader = require('../../../../../loader/machines-loader');

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
        pagination: false
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.infoAreaHard="";
        this.infoShift="";
      
    }

    areaOptionsHard = [
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

         
            
            get areaPretreatment() {
                return  this.infoAreaHard.text == "PRETREATMENT" ;
        
            }

            get areaPretreatmentBruckner() {
                return this.Machine && this.Machine.Id == 37;
              
            }

            get areaPretreatmentCBR() {
                return this.Machine && this.Machine.Id == 33;
                //this.Machine ? this.Machine.Id : 0,
            }
           
           

            columns = [
            { title: "Area", valign: "top" },
            { title: "Mesin", valign: "top" },
            { title: "Tanggal",  valign: "top", 
                    formatter: function (value, data, index) {
                        return moment(value).format("DD MMM YYYY"); 
                    } 
            },
            { title: "Shift",  valign: "top" },
            { title: "Group", valign: "top" },
            { title: "Panjang_IN", valign: "top" },
            { title: "Panjang_OUT_BQ", valign: "top" },
            { title: "Panjang_OUT_BS", valign: "top" },
            ];

            columnsPretreatment = [
                { field: "area", title: "Areaprebruck", valign: "top" },
                { field: "mesin", title: "Mesin", valign: "top" },
                { field: "tgl", title: "Tanggal",  valign: "top", 
                        formatter: function (value, data, index) {
                            return moment(value).format("DD MMM YYYY"); 
                        } 
                },
               
                ];
            columnsPretreatmentBruckner = [
                { field: "area", title: "Areaprebruck", valign: "top" },
                { field: "mesin", title: "Mesin", valign: "top" },
                { field: "tgl", title: "Tanggal",  valign: "top", 
                        formatter: function (value, data, index) {
                            return moment(value).format("DD MMM YYYY"); 
                        } 
                },
                { field: "noorder", title: "No.Order", valign: "top" },
                { field: "nokereta", title: "No.kereta", valign: "top" },
                { field: "speed", title: "Speed", valign: "top" },
                { field: "tkncd", title: "Tek.Mangle", valign: "top" },
                { field: "tempstenter1", title: "Temp.Stenter 1", valign: "top" },
                { field: "tempstenter2", title: "Temp.Stenter 2", valign: "top" },
                { field: "tempstenter3", title: "Temp.Stenter 3", valign: "top" },
                { field: "tempstenter3", title: "Temp.Stenter 4", valign: "top" },
                { field: "tempstenter3", title: "Temp.Stenter 5", valign: "top" },
              
                ];

            columnsPretreatmentCBR = [
                    { field: "area", title: "Areaprebruck", valign: "top" },
                    { field: "mesin", title: "Mesin", valign: "top" },
                    { field: "tgl", title: "Tanggal",  valign: "top", 
                            formatter: function (value, data, index) {
                                return moment(value).format("DD MMM YYYY"); 
                            } 
                    },
                    { field: "noorder", title: "No.Order", valign: "top" },
                    { field: "noorder", title: "No.kereta", valign: "top" },
                    { field: "noorder", title: "Speed L-Box 1", valign: "top" },
                    { field: "noorder", title: "Temp. washer 1", valign: "top" },
                    { field: "noorder", title: "Temp. washer 2", valign: "top" },
                    { field: "noorder", title: "Temp. washer 3", valign: "top" },
                    { field: "noorder", title: "Temp. washer 4", valign: "top" },
                    { field: "noorder", title: "Tek. Press FM 1", valign: "top" },
                    { field: "noorder", title: "Tek. Press Sat. 1", valign: "top" },
                    { field: "noorder", title: "Temp. Chamber Air 1", valign: "top" },
                    { field: "noorder", title: "Temp. Chamber Uap 1", valign: "top" },
                    { field: "noorder", title: "Timing Chamber 1", valign: "top" },
                    { field: "noorder", title: "Temp. washer 5", valign: "top" },
                    { field: "noorder", title: "Temp. Polystream 1", valign: "top" },
                    { field: "noorder", title: "Temp. Polystream 2", valign: "top" },
                    { field: "noorder", title: "Pompa chemical", valign: "top" },
                    { field: "noorder", title: "Pompa Sirkulasi", valign: "top" },
                    { field: "noorder", title: "Titrasi NaOH L BOX 1", valign: "top" },
                    { field: "noorder", title: "Titrasi NaOH L BOX 2", valign: "top" },
                    { field: "noorder", title: "Speed L-Box 2", valign: "top" },
                    { field: "noorder", title: "Tek. Press FM 2", valign: "top" },
                    { field: "noorder", title: "Tek. Press Sat. 2", valign: "top" },
                    { field: "noorder", title: "Temp. Chamber Air 2", valign: "top" },
                    { field: "noorder", title: "Temp. Chamber Uap 2", valign: "top" },
                    { field: "noorder", title: "Timing Chamber 2", valign: "top" },
                    { field: "noorder", title: "Temp. washer 6", valign: "top" },
                    { field: "noorder", title: "Temp. Polystream 3", valign: "top" },
                    { field: "noorder", title: "Temp. Polystream 4", valign: "top" },
                    { field: "noorder", title: "Titrasi H2O2", valign: "top" },
                ];

            

            rowFormatter(data, index) {
                return {};
            }

            search() {
                this.error = {};
                if (Object.getOwnPropertyNames(this.error).length === 0) {
                    this.flag = true;
                    this.Table.refresh();
                }
            }

            loader = (info) => {
                var order = {};
                if (info.sort)
                    order[info.sort] = info.order;
            
                    console.log(this.orderNo);
                   
                var args = {
                    page: parseInt(info.offset / info.limit, 10) + 1,
                    size: info.limit,
                    keyword: info.search,
                    order: order,
                    area: this.infoAreaHard.text,
                    
                    startdate : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
                    finishdate : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,

                    //startdate : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
                   //finishdate : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,
                    //shift: this.infoShift.text,
                    idmesin:this.Machine ? this.Machine.Id : 0,
                    noorder: this.orderNo ? this.orderNo : "0",
                  };
               
                console.log(args);
                return this.flag ?  
                    (
                    this.service.search(args)
                        .then(result => {
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
               
              }

              ExportToExcel() {
                var args = {
                    area: this.infoAreaHard.text,
                    startdate : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
                    finishdate : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,
                    shift: this.infoShift.text,
                    idmesin:this.Machine ? this.Machine.Id : 0,
                  };
                this.service.generateExcel(args);
                }

    get machineLoader() {
        return MachineLoader;
    }



}