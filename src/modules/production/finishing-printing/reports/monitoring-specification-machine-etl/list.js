import { inject,bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';


import moment from 'moment';
 var MachineLoader = require("../../../../../loader/machines-loader");

@inject(Router, Service)
export class List {
    @bindable Machine;

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

    areaOptionsHard = [
        { text: "DIGITAL PRINT", value: 1 },
        { text: "DYEING", value: 2 },
        { text: "FINISHING", value: 3 },
        { text: "PRETREATMENT", value: 4 },
        { text: "PRINTING", value: 5 },
            ];

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.infoAreaHard="";
        this.infoShift="";
      
    }

    rowFormatter(data, index) {
        return {};
    }
    
    MachineChanged(newValue){
        this.flag = false;
        if(this.infoAreaHard.text=='PRETREATMENT'){
            this.TableCBR.refresh();
            this.TableBruck.refresh();
            this.TableCMR.refresh();
            this.TableOsthoff.refresh();
            this.TableWD2.refresh();
        }
        else if(this.infoAreaHard.text=='DYEING'){
            this.TableMon.refresh();
            this.TablePS4.refresh();
        }
        else if(this.infoAreaHard.text=='DIGITAL PRINT'){
            this.TableDP.refresh();
        }
        else if(this.infoAreaHard.text=='PRINTING'){
            this.TableArioli.refresh();
            this.TableBrugman.refresh();
            this.TableHaspel.refresh();
            this.TableHF2.refresh();
            this.TableHF4.refresh();
            this.TableIchinose.refresh();
            this.TableZimmer.refresh();
        }
        else if(this.infoAreaHard.text=='FINISHING'){
            this.TableCRF.refresh();
            this.TableCL.refresh();
            this.TableSF.refresh();
            this.TableBaking.refresh();
        }
    }
    search() {
        this.error = {};
        if (!this.Machine )
            this.error.Machine = "Mesin harus diisi";
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            if(this.infoAreaHard.text=='PRETREATMENT'){
                this.TableCBR.refresh();
                this.TableBruck.refresh();
            }
            else if(this.infoAreaHard.text=='DYEING'){
                this.TableMon.refresh();
            }
        }
    }

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
    
        var args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            area: this.infoAreaHard.text,
            
            startdate : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            finishdate : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,

            idmesin:this.Machine ? this.Machine.Id : 0,
            noorder: this.orderNo ? this.orderNo : null,
        };
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
        this.error = {};
        if (!this.Machine )
            this.error.Machine = "Mesin harus diisi";
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            var args = {
                area: this.infoAreaHard.text,
                startdate : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
                finishdate : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null,
                idmesin:this.Machine ? this.Machine.Id : 0,
                noorder: this.orderNo ? this.orderNo : null,
            };
            this.service.generateExcel(args);
        }
    }

    get machineLoader() {
        return MachineLoader;
    }

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
            { field: "area", title: "AreapreCBR", valign: "top" },
            { field: "mesin", title: "Mesin", valign: "top" },
            { field: "tgl", title: "Tanggal",  valign: "top", 
                    formatter: function (value, data, index) {
                        return moment(value).format("DD MMM YYYY"); 
                    } 
            },
            { field: "noorder", title: "No.Order", valign: "top" },
            { field: "nokereta", title: "No.kereta", valign: "top" },
            { field: "speed", title: "Speed L-Box 1", valign: "top" },
            { field: "tempwasher1", title: "Temp. washer 1", valign: "top" },
            { field: "tempwasher2", title: "Temp. washer 2", valign: "top" },
            { field: "tempwasher3", title: "Temp. washer 3", valign: "top" },
            { field: "tempwasher4", title: "Temp. washer 4", valign: "top" },
            { field: "pressfm1", title: "Tek. Press FM 1", valign: "top" },
            { field: "presssat1", title: "Tek. Press Sat. 1", valign: "top" },
            { field: "tempair1", title: "Temp. Chamber Air 1", valign: "top" },
            { field: "chamber1uap", title: "Temp. Chamber Uap 1", valign: "top" },
            { field: "timmingchamber1", title: "Timing Chamber 1", valign: "top" },
            { field: "tempwasher5", title: "Temp. washer 5", valign: "top" },
            { field: "temppolystream1", title: "Temp. Polystream 1", valign: "top" },
            { field: "temppolystream2", title: "Temp. Polystream 2", valign: "top" },
            { field: "noorder", title: "Pompa chemical", valign: "top" },
            { field: "noorder", title: "Pompa Sirkulasi", valign: "top" },
            { field: "naoh1", title: "Titrasi NaOH L BOX 1", valign: "top" },
            { field: "naoh2", title: "Titrasi NaOH L BOX 2", valign: "top" },
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

    columnsPretreatmentCMR = [
            { field: "area", title: "AreapreCMR", valign: "top" },
            { field: "mesin", title: "Mesin", valign: "top" },
            { field: "tgl", title: "Tanggal",  valign: "top", 
                    formatter: function (value, data, index) {
                        return moment(value).format("DD MMM YYYY"); 
                    } 
            },
            { field: "noorder", title: "No.Order", valign: "top" },
            { field: "nokereta", title: "No.kereta", valign: "top" },
            { field: "speed", title: "Speed", valign: "top" },
            { field: "pressatair", title: "Tek. Sat. Air", valign: "top" },
            { field: "pressat1naoh", title: "Tek. Sat.1 NaOH", valign: "top" },
            { field: "pressat2naoh", title: "Tek. Sat.2 NaOH", valign: "top" },
            { field: "naoh", title: "NaOH Saturator", valign: "top" },
            { field: "tempsat1naoh", title: "Temp. NaOH Sat. 1", valign: "top" },
            { field: "tempsat2naoh", title: "Temp. NaOH Sat. 2", valign: "top" },
            { field: "shower1", title: "Clip Shower 1", valign: "top" },
            { field: "shower2", title: "Clip Shower 2", valign: "top" },
            { field: "shower3", title: "Clip Shower 3", valign: "top" },
            { field: "shower4", title: "Clip Shower 4", valign: "top" },
            { field: "lebarstenter", title: "Lebar Tenter", valign: "top" },
            { field: "temppolystream1", title: "Temp. Polystream 1", valign: "top" },
            { field: "temppolystream2", title: "Temp. Polystream 2", valign: "top" },
            { field: "temppolystream3", title: "Temp. Polystream 3", valign: "top" },
            { field: "temppolystream4", title: "Temp. Polystream 4", valign: "top" },
            { field: "fillerkiri", title: "Feeler Kiri", valign: "top" },
            { field: "fillerkanan", title: "Feeler Kanan", valign: "top" },
            { field: "keeperstick", title: "Keeper Stick", valign: "top" },
            
        ];

    columnsPretreatmentOsthoff = [
            { field: "area", title: "Area", valign: "top" },
            { field: "mesin", title: "Mesin", valign: "top" },
            { field: "tgl", title: "Tanggal",  valign: "top", 
                    formatter: function (value, data, index) {
                        return moment(value).format("DD MMM YYYY"); 
                    } 
            },
            { field: "noorder", title: "No.Order", valign: "top" },
            { field: "nokereta", title: "No.kereta", valign: "top" },
            { field: "speed", title: "Speed", valign: "top" },
            { field: "pressburner", title: "Pressure Burner", valign: "top" },
            { field: "titikapi", title: "Titik Api", valign: "top" },
            { field: "pressaturator", title: "Pressure Saturator", valign: "top" },
            { field: "temperatur", title: "Temp. saturator", valign: "top" },
            
            
        ];

    columnsPretreatmentWD2 = [
            { field: "area", title: "Area", valign: "top" },
            { field: "mesin", title: "Mesin", valign: "top" },
            { field: "tgl", title: "Tanggal",  valign: "top", 
                    formatter: function (value, data, index) {
                        return moment(value).format("DD MMM YYYY"); 
                    } 
            },
            { field: "noorder", title: "No.Order", valign: "top" },
            { field: "nokereta", title: "No.kereta", valign: "top" },
            { field: "speed", title: "Speed", valign: "top" },
            { field: "pressatair", title: "Temperatur washer 1", valign: "top" },
            { field: "pressat1naoh", title: "Temperatur washer 2", valign: "top" },
            { field: "pressat2naoh", title: "Temperatur washer 3", valign: "top" },
            { field: "naoh", title: "Temperatur washer 4", valign: "top" },
            { field: "naoh", title: "pH larutan asam", valign: "top" },
        ];

        columnsDyeingMonfort = [
            { field: "area", title: "Area", valign: "top" },
            { field: "mesin", title: "Mesin", valign: "top" },
            { field: "tgl", title: "Tanggal",  valign: "top", 
                    formatter: function (value, data, index) {
                        return moment(value).format("DD MMM YYYY"); 
                    } 
            },
            { field: "noorder", title: "No.Order", valign: "top" },
            { field: "nokereta", title: "No.kereta", valign: "top" },
            { field: "speed", title: "Speed", valign: "top" },
            { field: "pressatair", title: "Tek. Mangle L", valign: "top" },
            { field: "pressat1naoh", title: "Tek. Mangle C", valign: "top" },
            { field: "pressat2naoh", title: "Tek. Mangle R", valign: "top" },
            { field: "naoh", title: "Temp. Chamber 1", valign: "top" },
            { field: "naoh", title: "Temp. Chamber 2", valign: "top" },
            { field: "naoh", title: "Temp. Thermosol 1", valign: "top" },
            { field: "naoh", title: "Temp. Thermosol 2", valign: "top" },
            { field: "naoh", title: "Exhaust fan dryer", valign: "top" },
            { field: "naoh", title: "Exhaust fan Thermosol", valign: "top" },
            { field: "naoh", title: "Sirkulasi Chamber", valign: "top" },
            { field: "naoh", title: "Sirkulasi Thermosol", valign: "top" },
        ];

    columnsDyeingPS4 = [
            { field: "area", title: "Area", valign: "top" },
            { field: "mesin", title: "Mesin", valign: "top" },
            { field: "tgl", title: "Tanggal",  valign: "top", 
                    formatter: function (value, data, index) {
                        return moment(value).format("DD MMM YYYY"); 
                    } 
            },
            { field: "noorder", title: "No.Order", valign: "top" },
            { field: "nokereta", title: "No.kereta", valign: "top" },
            { field: "speed", title: "Speed", valign: "top" },
            { field: "pressatair", title: "Tek. Mangle L", valign: "top" },
            { field: "pressat1naoh", title: "Tek. Mangle R", valign: "top" },
            { field: "pressat2naoh", title: "Temp. Chamber", valign: "top" },
            { field: "naoh", title: "Temp. Washer 1", valign: "top" },
            { field: "naoh", title: "Temp. Washer 2", valign: "top" },
            { field: "naoh", title: "Temp. Washer 3", valign: "top" },
            { field: "naoh", title: "Temp. Polystream 1", valign: "top" },
            { field: "naoh", title: "Temp. Polystream 2", valign: "top" },
            { field: "naoh", title: "Temp. Polystream 3", valign: "top" },
            { field: "naoh", title: "Temp. Washer", valign: "top" },
            { field: "naoh", title: "Tek. Dryer 1", valign: "top" },
            { field: "naoh", title: "Tek. Dryer 2", valign: "top" },
        ];

    columnsDPrint = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Tekanan Angin", valign: "top" },
    ];

    columnsPrintArioli = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Tekanan Uap", valign: "top" },
        { field: "pressatair", title: "Kecepatan", valign: "top" },
        { field: "pressatair", title: "Loop Length", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 1", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 2", valign: "top" },
        { field: "pressatair", title: "Tekanan Angin", valign: "top" },
        { field: "pressatair", title: "Supply Steam", valign: "top" },
        { field: "pressatair", title: "Exhaust", valign: "top" },
        { field: "pressatair", title: "Waktu Fiksasi", valign: "top" },
        { field: "pressatair", title: "Humidity(Kelembaban)", valign: "top" },
    ];

    columnsPrintBrugman = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Tekanan Uap", valign: "top" },
        { field: "pressatair", title: "Kecepatan", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 1", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 2", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 3", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 4&5", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 6", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 7&8", valign: "top" },
        { field: "pressatair", title: "Tekanan Angin", valign: "top" },
        { field: "pressatair", title: "Tekanan Roll Hidrolik", valign: "top" },
    ];
    
    columnsPrintHaspel = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Tekanan Uap", valign: "top" },
        { field: "pressatair", title: "Kecepatan", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 1", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 2", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 3", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 4&5", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 6", valign: "top" },
        { field: "pressatair", title: "Temp. Chamber - 7&8", valign: "top" },
        { field: "pressatair", title: "Tekanan Angin", valign: "top" },
        { field: "pressatair", title: "Tekanan Roll Hidrolik", valign: "top" },
    ];

    columnsPrintHF2 = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "speed", title: "Tekanan Mangle L", valign: "top" },
        { field: "speed", title: "Tekanan Mangle C", valign: "top" },
        { field: "speed", title: "Tekanan Mangle R", valign: "top" },
        { field: "speed", title: "Temp. Chamber - 1", valign: "top" },
        { field: "speed", title: "Temp. Chamber - 2", valign: "top" },
        { field: "speed", title: "Sirkulasi Fan", valign: "top" },
        { field: "speed", title: "Exhaust Fan", valign: "top" },
        { field: "speed", title: "WPU", valign: "top" },
        { field: "speed", title: "Draw Roller", valign: "top" },
        { field: "speed", title: "Colling Cylinder", valign: "top" },
    ];

    columnsPrintHF4 = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "speed", title: "Tek. Mangle L", valign: "top" },
        { field: "speed", title: "Tek. Mangle C", valign: "top" },
        { field: "speed", title: "Tek. Mangle R", valign: "top" },
        { field: "speed", title: "Temp. Chamber - 1", valign: "top" },
        { field: "speed", title: "Temp. Chamber - 2", valign: "top" },
        { field: "speed", title: "Turq. Motor 1", valign: "top" },
        { field: "speed", title: "Turq. Motor 2", valign: "top" },
        { field: "speed", title: "Cooling Cylinder", valign: "top" },
        { field: "speed", title: "Draw Roll", valign: "top" },
    ];

    columnsPrintIchinose = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Tekanan Uap", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "speed", title: "Tekanan Angin", valign: "top" },
        { field: "speed", title: "Temp. Chamber - 1", valign: "top" },
        { field: "speed", title: "Temp. Chamber - 2", valign: "top" },
    ];

    columnsPrintZimmer = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Tekanan Angin", valign: "top" },
        { field: "speed", title: "Tekanan Uap Steam", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "speed", title: "Printing Unit 1", valign: "top" },
        { field: "speed", title: "Printing Unit 2", valign: "top" },
        { field: "speed", title: "Printing Unit 3", valign: "top" },
        { field: "speed", title: "Printing Unit 4", valign: "top" },
        { field: "speed", title: "Printing Unit 5", valign: "top" },
        { field: "speed", title: "Printing Unit 6", valign: "top" },
        { field: "speed", title: "Printing Unit 7", valign: "top" },
        { field: "speed", title: "Printing Unit 8", valign: "top" },
        { field: "speed", title: "Printing Unit 9", valign: "top" },
        { field: "speed", title: "Printing Unit 10", valign: "top" },
        { field: "speed", title: "Printing Unit 11", valign: "top" },
        { field: "speed", title: "Printing Unit 12", valign: "top" },
        { field: "speed", title: "Printing Unit 13", valign: "top" },
        { field: "speed", title: "Printing Unit 14", valign: "top" },
    ];

    columnsFinishCRF = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "speed", title: "Tek. Mangle L", valign: "top" },
        { field: "speed", title: "Tek. Mangle R", valign: "top" },
        { field: "speed", title: "Temp. Pre Dryer", valign: "top" },
        { field: "tempstenter1", title: "Temp.Stenter 1", valign: "top" },
        { field: "tempstenter2", title: "Temp.Stenter 2", valign: "top" },
        { field: "tempstenter3", title: "Temp.Stenter 3", valign: "top" },
        { field: "tempstenter3", title: "Temp.Stenter 4", valign: "top" },
        { field: "tempstenter3", title: "Temp.Stenter 5", valign: "top" },
        { field: "speed", title: "Overfeed (cek 100cm)", valign: "top" },
    ];

    columnsFinishCL = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "speed", title: "Beban", valign: "top" },
        { field: "speed", title: "Press", valign: "top" },
    ];

    columnsFinishSF = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Speed", valign: "top" },
        { field: "speed", title: "Press Rubber", valign: "top" },
        { field: "speed", title: "Tek. Rubber Steam", valign: "top" },
        { field: "speed", title: "Tek. Blanket Steam", valign: "top" },
        { field: "speed", title: "Overfeed (cek 100cm)", valign: "top" },
    ];

    columnsFinishBaking = [
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "speed", title: "Speed", valign: "top" },
    ];
}