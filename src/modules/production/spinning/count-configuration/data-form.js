import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';

//var lotConfigurationLoader = require('../../../../loader/lot-configuration-loader');

// var moment = require('moment');
@inject(Service)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable error;
    @bindable title;
    @bindable lotConfiguration;
    @bindable Input = [];

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };


    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    }
    controlOptions3 = {
        label: {
            length: 1
        },
        control: {
            length: 5
        }
    }
    controlOptions2 = {
        label: {
            length: 4
        },
        control: {
            length: 7
        }
    }

    // spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };
    // shift = ["Shift I: 06.00 – 14.00", "Shift II: 14.00 – 22.00", "Shift III: 22:00 – 06.00"]
    processTypeList = [
        "",
        "Blowing",
        "Carding",
        "Pre-Drawing",
        "Finish-Drawing",
        "Flying",
        "Ring Spinning",
        "Winding"
    ];
    yarnTypeList = [
        "",
        "PCP",
        "CMP",
        "CD",
        "CVC",
        "PE",
        "TENCEL",
        "CUPRO",
        "PC-P 45"
    ];


    constructor(service) {
        this.service = service;
    }


    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        console.log(this.error)
        this.data.Input = this.data.Input || [];
        this.isItem = false;
        this.isItemPolyster = false;
        this.processType = false;
        this.cottonLot ="";
        this.polyesterLot ="";

        if(this.data.ProcessType){
            this.processType = this.data.ProcessType;
        }
        if (this.data.ProcessType == "Blowing" || 
                this.data.ProcessType == "Carding" || 
                this.data.ProcessType == "Pre-Drawing" || 
                this.data.ProcessType == "Finishing-Drawing")  {
                    this.finishingDrawing = false;
        } else {
            this.finishingDrawing = true;
        }
       
        if (this.data.LotId) {
            this.isItem = true;
        }

        if(!this.yarnType){
            this.yarnType=this.data.CottonYarn;
        }

        if(this.data.PolyesterYarn){
            this.service.getLotByYarnType(this.data.PolyesterYarn, this.finishingDrawing).then(result => {
                if(result){
                    this.error.YarnType = undefined;
                    this.isItemPolyster = true;
                    this.data.itemsPolyster = result.CottonCompositions;
                    this.data.CottonCompositions = result.CottonCompositions
                    this.data.LotId = result.Id;
                    this.data.LotNo = result.LotNo;
                    this.polyesterLot = result.LotNo;
                } else{
                    this.error.YarnType = "Lot tidak ditemukan";
                    this.isItemPolyster = false;
                    this.data.itemsPolyster = null;
                    this.data.CottonCompositions = null;
                    this.data.LotId = null;
                    this.data.LotNo = null;
                    this.polyesterLot = null;
                }
            });
        }
        if(this.data.CottonYarn){
            this.service.getLotByYarnType(this.data.CottonYarn, this.finishingDrawing).then(result => {
                if(result){
                    this.error.YarnType = undefined;
                    this.isItem = true;
                    this.data.items = result.CottonCompositions;
                    this.data.CottonCompositions = result.CottonCompositions
                    this.data.LotId = result.Id;
                    this.data.LotNo = result.LotNo;
                    this.cottonLot = result.LotNo;
                } else{
                    this.error.YarnType = "Lot tidak ditemukan";
                    this.isItem = false;
                    this.data.items = null;
                    this.data.CottonCompositions = null;
                    this.data.LotId = null;
                    this.data.LotNo = null;
                    this.cottonLot = null;
                }
            });
        }

    }

    inputInfo = {
        columns: [
            { header: "Nama Kapas", value: "product" },
            { header: "Komposisi(%)", value: "composition" },
        ],
    };

    // selectedLotConfigurationChanged(newValue) {
    //     if (newValue.Id) {
    //         this.data.lot.Id = newValue.lotId;
    //         this.data.lot.no = newValue.lotNo;
    //         this.data.YarnType = newValue.YarnType
    //     }
    // }

    processTypeChanged(e) {
        var selectedProcess = e.srcElement.value;
        // this.error=this.context.error;
        if (selectedProcess) {
            this.data.ProcessType = selectedProcess;
            if (this.data.ProcessType == "Finish-Drawing") {
                this.ProcessType = true;
            }
            if (this.data.ProcessType == "Blowing" || 
                this.data.ProcessType == "Carding" || 
                this.data.ProcessType == "Pre-Drawing" || 
                this.data.ProcessType == "Finishing-Drawing")  {
                    this.finishingDrawing = false;
            } else {
                this.finishingDrawing = true;
            }
        }
    }

    cottonYarnTypeChanged(e) {
        var selectedProcess = e.srcElement.value;
        // if(!this.error.YarnType){
        //     this.error=this.context.error;
        // }
        if(selectedProcess){
            this.data.CottonYarn = selectedProcess;
            this.service.getLotByYarnType(this.data.CottonYarn, this.finishingDrawing).then(result => {
                if(result){
                    this.error.YarnType= undefined;
                    this.isItem = true;
                    this.data.items = result.CottonCompositions;
                    console.log(this.data)
                    this.data.CottonCompositions = result.CottonCompositions;
                    this.data.LotId = result.Id;
                    this.data.LotNo = result.LotNo;
                    this.cottonLot = result.LotNo;
                } else{
                    console.log(1)
                    this.error.YarnType = "Lot tidak ditemukan";
                    console.log(this.error)
                    this.isItem = false;
                    this.data.items = null;
                    this.data.CottonCompositions = null;
                    this.data.LotId = null;
                    this.data.LotNo = null;
                    this.cottonLot = null;
                }
            });
        }
    }

    polyesterYarnTypeChanged(e) {
        var selectedProcess = e.srcElement.value;
        if(!this.error){
            this.error={};
        }
        if(selectedProcess){
            this.data.PolyesterYarn = selectedProcess;
            this.service.getLotByYarnType(this.data.PolyesterYarn, this.finishingDrawing).then(result => {
                if(result){
                    this.error= {};
                    this.isItemPolyster = true;
                    this.data.itemsPolyster = result.CottonCompositions;
                    this.data.CottonCompositions = result.CottonCompositions
                    this.data.LotId = result.Id;
                    this.data.LotNo = result.LotNo;
                    this.polyesterLot = result.LotNo;
                } else{
                    this.error.YarnType = "Lot tidak ditemukan";
                    this.isItemPolyster = false;
                    this.data.itemsPolyster = null;
                    this.data.CottonCompositions = null;
                    this.data.LotId = null;
                    this.data.LotNo = null;
                    this.polyesterLot = null;
                }
            });
        }
    }
    // yarnChanged(newValue, oldValue) {
    //     console.o
    //     if (this.yarn && this.yarn.Id) {
    //         this.data.YarnId = this.yarn.Id;
    //     }
    // }

    get yarnLoader() {
        return ProductLoader;
    }



    // async yarnChanged(newValue, oldValue) {
    //     if (this.yarn && this.yarn.Id) {
    //         this.data.Yarn = this.yarn
    //         if (this.unit && this.machine && this.yarn) {
    //             var data = {};
    //             var info = {
    //                 spinning: this.unit.name ? this.unit.name : this.data.UnitName,
    //                 machine: this.machine.name ? this.machine.name : this.data.MachineName,
    //                 yarn: this.yarn.Name ? this.yarn.Name : this.data.YarnName,
    //             };
    //             this.Lot = await this.service.getLotYarn(info);
    //         }
    //     }
    //     else {
    //         this.yarn = null;
    //     }
    // }

    // @computedFrom("unit")
    // get filter() {
    //     var filterMachine = {};
    //     if (this.unit) {
    //         filterMachine = {
    //             "unit.name": this.unit.name ? this.unit.name : this.data.UnitName
    //         }
    //     }
    //     return filterMachine;
    // }


    // get lot() {
    //     if (this.Lot && this.machine != null && this.yarn != null && this.unit != null) {
    //         this.data.Lot = this.Lot.Lot;
    //         return this.data.Lot;
    //     } else {
    //         return ""
    //     }

    // }

    // get machineLoader() {
    //     return MachineLoader;
    // }

    // get unitLoader() {
    //     return UnitLoader;
    // }
} 