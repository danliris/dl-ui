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
    // get areaDyeing() {
    //     return  this.infoAreaHard.text == "DYEING" ;
    // }
    // get areaDyeingMonfort() {
    //     return this.Machine && this.Machine.Id == 8;
    // }
    // get areaDyeingPS4() {
    //     return this.Machine && this.Machine.Id == 10;



    // }
    rowFormatter(data, index) {
        return {};
    }

    infoAreaHardChanged(){
      console.log("infoAreaHardChanged");
      this.Machine.Id = null;
      this.Machine = { text: 'Pilih mesin nya'};
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
            this.TableCRF1.refresh();
            this.TableCRF2.refresh();
            this.TableST.refresh();
            this.TableCL1.refresh();
            this.TableCL2.refresh();
            this.TableSF1.refresh();
            this.TableSF2.refresh();
            this.TableBaking.refresh();
        }
    }
    search() {
        this.error = {};
        if (!this.Machine )
            this.error.Machine = "Mesin harus diisi";
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            //Mesin PRETREATMENT
            if(this.infoAreaHard.text=='PRETREATMENT' && this.Machine.Id ==37){
                this.TableBruck.refresh();
            }
            else if(this.infoAreaHard.text=='PRETREATMENT' && this.Machine.Id ==33){
                this.TableCBR.refresh();
            }
            else if(this.infoAreaHard.text=='PRETREATMENT' && this.Machine.Id ==40){
                this.TableCMR.refresh();
            }
            else if(this.infoAreaHard.text=='PRETREATMENT' && this.Machine.Id ==41){
                this.TableOsthoff.refresh();
            }
            else if(this.infoAreaHard.text=='PRETREATMENT' && this.Machine.Id ==7){
                this.TableWD2.refresh();
            }
            

            //Mesin DYEING
            else if(this.infoAreaHard.text=='DYEING' && this.Machine.Id ==8){
                this.TableMon.refresh();
            }
            else if(this.infoAreaHard.text=='DYEING' && this.Machine.Id ==10){
                this.TablePS4.refresh();
            }

            //Mesin DIGITAL PRINT
            else if(this.infoAreaHard.text=='DIGITAL PRINT' && this.Machine.Id ==39){
                this.TableDP.refresh();
            }

            //Mesin PRINTING
            else if(this.infoAreaHard.text=='PRINTING' && this.Machine.Id ==28){
                this.TableArioli.refresh();
            }
            else if(this.infoAreaHard.text=='PRINTING' && this.Machine.Id ==27){
                this.TableBrugman.refresh();
            }
            else if(this.infoAreaHard.text=='PRINTING' && this.Machine.Id ==31){
                this.TableHaspel.refresh();
            }
            else if(this.infoAreaHard.text=='PRINTING' && this.Machine.Id ==25){
                this.TableHF2.refresh();
            }
            else if(this.infoAreaHard.text=='PRINTING' && this.Machine.Id ==9){
                this.TableHF4.refresh();
            }
            else if(this.infoAreaHard.text=='PRINTING' && this.Machine.Id ==22){
                this.TableIchinose.refresh();
            }
            else if(this.infoAreaHard.text=='PRINTING' && this.Machine.Id ==24){
                this.TableZimmer.refresh();
            }

            //mesin Finishing
            else if(this.infoAreaHard.text=='FINISHING' && this.Machine.Id ==13){
                this.TableCRF1.refresh();
            }
            else if(this.infoAreaHard.text=='FINISHING' && this.Machine.Id ==14){
                this.TableCRF2.refresh();
            }
            else if(this.infoAreaHard.text=='FINISHING' && this.Machine.Id ==17){
                this.TableST.refresh();
            }
            else if(this.infoAreaHard.text=='FINISHING' && this.Machine.Id ==18){
                this.TableCL1.refresh();
            }
            else if(this.infoAreaHard.text=='FINISHING' && this.Machine.Id ==19){
                this.TableCL2.refresh();
            }
            else if(this.infoAreaHard.text=='FINISHING' && this.Machine.Id ==15){
                this.TableSF1.refresh();
            }
            else if(this.infoAreaHard.text=='FINISHING' && this.Machine.Id ==16){
                this.TableSF2.refresh();
            }
            else if(this.infoAreaHard.text=='FINISHING' && this.Machine.Id ==12){
                this.TableBaking.refresh();
            }
        }
    }

    reset() {
       
        this.Machine.Id =null;
        this.Machine = { text: 'Pilih mesin nya'};
        this.dateFrom = null;
        this.dateTo = null;
        this.orderNo=null;
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
        { field: "index", title: "No", valign: "top" },
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
            { field: "index", title: "No", valign: "top" },
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
            { field: "sirculasipump1", title: "Pompa chemical", valign: "top" },
            { field: "sirculasipump2", title: "Pompa Sirkulasi", valign: "top" },
            { field: "naoh1", title: "Titrasi NaOH L BOX 1", valign: "top" },
            { field: "naoh2", title: "Titrasi NaOH L BOX 2", valign: "top" },
            { field: "speedlbox2", title: "Speed L-Box 2", valign: "top" },
            { field: "pressfm2", title: "Tek. Press FM 2", valign: "top" },
            { field: "presssat2", title: "Tek. Press Sat. 2", valign: "top" },
            { field: "tempair2", title: "Temp. Chamber Air 2", valign: "top" },
            { field: "chamber2uap", title: "Temp. Chamber Uap 2", valign: "top" },
            { field: "timmingchamber2", title: "Timing Chamber 2", valign: "top" },
            { field: "tempwasher6", title: "Temp. washer 6", valign: "top" },
            { field: "temppolystream3", title: "Temp. Polystream 3", valign: "top" },
            { field: "temppolystream4", title: "Temp. Polystream 4", valign: "top" },
            { field: "h202", title: "Titrasi H2O2", valign: "top" },
        ];

    columnsPretreatmentCMR = [
            { field: "index", title: "No", valign: "top" },
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
            { field: "index", title: "No", valign: "top" },
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
        { field: "index", title: "No", valign: "top" },
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
        { field: "tempwasher1", title: "Temperatur washer 1", valign: "top" },
        { field: "tempwasher2", title: "Temperatur washer 2", valign: "top" },
        { field: "tempwasher3", title: "Temperatur washer 3", valign: "top" },
        { field: "tempwasher4", title: "Temperatur washer 4", valign: "top" },
        { field: "phlarutasam", title: "pH larutan asam", valign: "top" },
        ];

        columnsDyeingMonfort = [
            { field: "index", title: "No", valign: "top" },
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
            { field: "tknmanggleL", title: "Tek. Mangle L", valign: "top" },
            { field: "tknmanggleC", title: "Tek. Mangle C", valign: "top" },
            { field: "tknmanggleR", title: "Tek. Mangle R", valign: "top" },
            { field: "tempcamber1set1", title: "Temp. Chamber 1", valign: "top" },
            { field: "tempcamber1set2", title: "Temp. Chamber 2", valign: "top" },
            { field: "exfanchamber1set2", title: "Temp. Thermosol 1", valign: "top" },
            { field: "tempbakingset1", title: "Temp. Thermosol 2", valign: "top" },
            { field: "sirkufanset2", title: "Exhaust fan dryer", valign: "top" },
            { field: "exhaustbakingset2", title: "Exhaust fan Thermosol", valign: "top" },
            { field: "sirkufanset1", title: "Sirkulasi Chamber", valign: "top" },
            { field: "tempbakingset2", title: "Sirkulasi Thermosol", valign: "top" },
        ];

    columnsDyeingPS4 = [
            { field: "index", title: "No", valign: "top" },
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
            { field: "tknmanggleL", title: "Tek. Mangle L", valign: "top" },
            { field: "tknmanggleC", title: "Tek. Mangle R", valign: "top" },
            { field: "tknmanggleR", title: "Temp. Chamber", valign: "top" },
            { field: "tempwasher1", title: "Temp. Washer 1", valign: "top" },
            { field: "tempwasher2", title: "Temp. Washer 2", valign: "top" },
            { field: "tempwasher3", title: "Temp. Washer 3", valign: "top" },
            { field: "temppolys1", title: "Temp. Polystream 1", valign: "top" },
            { field: "temppolys2", title: "Temp. Polystream 2", valign: "top" },
            { field: "temppolys3", title: "Temp. Polystream 3", valign: "top" },
            { field: "tempwasher", title: "Temp. Washer", valign: "top" },
            { field: "tekdry1", title: "Tek. Dryer 1", valign: "top" },
            { field: "tekdry2", title: "Tek. Dryer 2", valign: "top" },
        ];

    columnsDPrint = [
        { field: "index", title: "No", valign: "top" },
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "tekananangin", title: "Tekanan Angin", valign: "top" },
    ];

    columnsPrintArioli = [
        { field: "index", title: "No", valign: "top" },
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "tekuap", title: "Tekanan Uap", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "loop", title: "Loop Length", valign: "top" },
        { field: "temp1", title: "Temp. Chamber - 1", valign: "top" },
        { field: "temp2", title: "Temp. Chamber - 2", valign: "top" },
        { field: "tekangin", title: "Tekanan Angin", valign: "top" },
        { field: "supplysteam", title: "Supply Steam", valign: "top" },
        { field: "exhaust", title: "Exhaust", valign: "top" },
        { field: "time", title: "Waktu Fiksasi", valign: "top" },
        { field: "RH", title: "Humidity(Kelembaban)", valign: "top" },
    ];

    columnsPrintBrugman = [
        { field: "index", title: "No", valign: "top" },
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "tekuap", title: "Tekanan Uap", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "tempwashing1", title: "Temp. Chamber - 1", valign: "top" },
        { field: "tempwashing2", title: "Temp. Chamber - 2", valign: "top" },
        { field: "tempwasing3", title: "Temp. Chamber - 3", valign: "top" },
        { field: "tempwasing45", title: "Temp. Chamber - 4&5", valign: "top" },
        { field: "tempwasing6", title: "Temp. Chamber - 6", valign: "top" },
        { field: "tempwashing78", title: "Temp. Chamber - 7&8", valign: "top" },
        { field: "tekangin", title: "Tekanan Angin", valign: "top" },
        { field: "tekhidro", title: "Tekanan Roll Hidrolik", valign: "top" },
    ];
    
    columnsPrintHaspel = [
        { field: "index", title: "No", valign: "top" },
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "tekuap", title: "Tekanan Uap", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "tempwashing1", title: "Temp. Chamber - 1", valign: "top" },
        { field: "tempwashing2", title: "Temp. Chamber - 2", valign: "top" },
        { field: "tempwasing3", title: "Temp. Chamber - 3", valign: "top" },
        { field: "tempwasing45", title: "Temp. Chamber - 4&5", valign: "top" },
        { field: "tempwasing6", title: "Temp. Chamber - 6", valign: "top" },
        { field: "tempwashing78", title: "Temp. Chamber - 7&8", valign: "top" },
        { field: "tekangin", title: "Tekanan Angin", valign: "top" },
        { field: "tekhidro", title: "Tekanan Roll Hidrolik", valign: "top" },
    ];

    columnsPrintHF2 = [
        { field: "index", title: "No", valign: "top" },
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
        { field: "tekmangleL", title: "Tekanan Mangle L", valign: "top" },
        { field: "tekmangleC", title: "Tekanan Mangle C", valign: "top" },
        { field: "tekmangleR", title: "Tekanan Mangle R", valign: "top" },
        { field: "temp1", title: "Temp. Chamber - 1", valign: "top" },
        { field: "temp2", title: "Temp. Chamber - 2", valign: "top" },
        { field: "sirkulasi", title: "Sirkulasi Fan", valign: "top" },
        { field: "exhaust", title: "Exhaust Fan", valign: "top" },
        { field: "wpu", title: "WPU", valign: "top" },
        { field: "drawroll", title: "Draw Roller", valign: "top" },
        { field: "coolingcylinde", title: "Colling Cylinder", valign: "top" },
    ];

    columnsPrintHF4 = [
        { field: "index", title: "No", valign: "top" },
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
        { field: "tekmangleL", title: "Tek. Mangle L", valign: "top" },
        { field: "tekmangleC", title: "Tek. Mangle C", valign: "top" },
        { field: "tekmangleR", title: "Tek. Mangle R", valign: "top" },
        { field: "temp1", title: "Temp. Chamber - 1", valign: "top" },
        { field: "temp2", title: "Temp. Chamber - 2", valign: "top" },
        { field: "turqmotor1", title: "Turq. Motor 1", valign: "top" },
        { field: "turqmotor2", title: "Turq. Motor 2", valign: "top" },
        { field: "coolingcylinde", title: "Cooling Cylinder", valign: "top" },
        { field: "drawroll", title: "Draw Roll", valign: "top" },
    ];

    columnsPrintIchinose = [
        { field: "index", title: "No", valign: "top" },
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "tekuap", title: "Tekanan Uap", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "tekangin", title: "Tekanan Angin", valign: "top" },
        { field: "temp1", title: "Temp. Chamber - 1", valign: "top" },
        { field: "temp2", title: "Temp. Chamber - 2", valign: "top" },
    ];

    columnsPrintZimmer = [
        { field: "index", title: "No", valign: "top" },
        { field: "area", title: "Area", valign: "top" },
        { field: "mesin", title: "Mesin", valign: "top" },
        { field: "tgl", title: "Tanggal",  valign: "top", 
                formatter: function (value, data, index) {
                    return moment(value).format("DD MMM YYYY"); 
                } 
        },
        { field: "noorder", title: "No.Order", valign: "top" },
        { field: "nokereta", title: "No.kereta", valign: "top" },
        { field: "tekangin", title: "Tekanan Angin", valign: "top" },
        { field: "tekuap", title: "Tekanan Uap Steam", valign: "top" },
        { field: "speed", title: "Kecepatan", valign: "top" },
        { field: "ukuranrakel1", title: "Printing Unit 1", valign: "top" },
        { field: "ukuranrakel2", title: "Printing Unit 2", valign: "top" },
        { field: "ukuranrakel3", title: "Printing Unit 3", valign: "top" },
        { field: "ukuranrakel4", title: "Printing Unit 4", valign: "top" },
        { field: "ukuranrakel5", title: "Printing Unit 5", valign: "top" },
        { field: "ukuranrakel6", title: "Printing Unit 6", valign: "top" },
        { field: "ukuranrakel7", title: "Printing Unit 7", valign: "top" },
        { field: "ukuranrakel8", title: "Printing Unit 8", valign: "top" },
        { field: "ukuranrakel9", title: "Printing Unit 9", valign: "top" },
        { field: "ukuranrakel10", title: "Printing Unit 10", valign: "top" },
        { field: "ukuranrakel11", title: "Printing Unit 11", valign: "top" },
        { field: "ukuranrakel12", title: "Printing Unit 12", valign: "top" },
        { field: "ukuranrakel13", title: "Printing Unit 13", valign: "top" },
        { field: "ukuranrakel14", title: "Printing Unit 14", valign: "top" },
    ];

    columnsFinishCRF1 = [
        { field: "index", title: "No", valign: "top" },
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
        { field: "tknmangleL", title: "Tek. Mangle L", valign: "top" },
        { field: "tknmangleR", title: "Tek. Mangle R", valign: "top" },
        { field: "tempdryer", title: "Temp. Pre Dryer", valign: "top" },
        { field: "tempstenter1", title: "Temp.Stenter 1", valign: "top" },
        { field: "tempstenter2", title: "Temp.Stenter 2", valign: "top" },
        { field: "tempstenter3", title: "Temp.Stenter 3", valign: "top" },
        { field: "tempstenter4", title: "Temp.Stenter 4", valign: "top" },
        { field: "tempstenter5", title: "Temp.Stenter 5", valign: "top" },
        { field: "check100cm", title: "Overfeed (cek 100cm)", valign: "top" },
    ];
    columnsFinishCRF2 = [
        { field: "index", title: "No", valign: "top" },
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
        { field: "tknmangleL", title: "Tek. Mangle L", valign: "top" },
        { field: "tknmangleR", title: "Tek. Mangle R", valign: "top" },
        { field: "tempdryer", title: "Temp. Pre Dryer", valign: "top" },
        { field: "tempstenter1", title: "Temp.Stenter 1", valign: "top" },
        { field: "tempstenter2", title: "Temp.Stenter 2", valign: "top" },
        { field: "tempstenter3", title: "Temp.Stenter 3", valign: "top" },
        { field: "tempstenter4", title: "Temp.Stenter 4", valign: "top" },
        { field: "tempstenter5", title: "Temp.Stenter 5", valign: "top" },
        { field: "check100cm", title: "Overfeed (cek 100cm)", valign: "top" },
    ];
    columnsFinishST = [
        { field: "index", title: "No", valign: "top" },
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
        { field: "tknmangleL", title: "Tek. Mangle L", valign: "top" },
        { field: "tknmangleR", title: "Tek. Mangle R", valign: "top" },
        { field: "tempdryer", title: "Temp. Pre Dryer", valign: "top" },
        { field: "tempstenter1", title: "Temp.Stenter 1", valign: "top" },
        { field: "tempstenter2", title: "Temp.Stenter 2", valign: "top" },
        { field: "tempstenter3", title: "Temp.Stenter 3", valign: "top" },
        { field: "tempstenter4", title: "Temp.Stenter 4", valign: "top" },
        { field: "tempstenter5", title: "Temp.Stenter 5", valign: "top" },
        { field: "check100cm", title: "Overfeed (cek 100cm)", valign: "top" },
    ];
    columnsFinishCL1 = [
        { field: "index", title: "No", valign: "top" },
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
        { field: "beban", title: "Beban", valign: "top" },
        { field: "tknpress", title: "Press", valign: "top" },
    ];
    columnsFinishCL2 = [
        { field: "index", title: "No", valign: "top" },
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
        { field: "beban", title: "Beban", valign: "top" },
        { field: "tknpress", title: "Press", valign: "top" },
    ];

    columnsFinishSF1 = [
        { field: "index", title: "No", valign: "top" },
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
        { field: "pressrubber", title: "Press Rubber", valign: "top" },
        { field: "rubbesteam", title: "Tek. Rubber Steam", valign: "top" },
        { field: "blangketsteam", title: "Tek. Blanket Steam", valign: "top" },
        { field: "check100cm", title: "Overfeed (cek 100cm)", valign: "top" },
    ];

    columnsFinishSF2 = [
        { field: "index", title: "No", valign: "top" },
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
        { field: "pressrubber", title: "Press Rubber", valign: "top" },
        { field: "rubbesteam", title: "Tek. Rubber Steam", valign: "top" },
        { field: "blangketsteam", title: "Tek. Blanket Steam", valign: "top" },
        { field: "check100cm", title: "Overfeed (cek 100cm)", valign: "top" },
    ];

    columnsFinishBaking = [
        { field: "index", title: "No", valign: "top" },
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