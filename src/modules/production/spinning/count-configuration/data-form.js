import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';

//var lotConfigurationLoader = require('../../../../loader/lot-configuration-loader');
var ProductLoader = require('../../../../loader/product-azure-loader');
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
    @bindable yarn;
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
        this.data.Input = this.data.Input || [];
        this.Lot = {}
        this.isItem = false;
        this.processType = false;

        if (this.data.Lot) {
            this.Lot = this.data.Lot;
            this.isItem = true;
        }

        if (this.data.Yarn && this.data.Yarn.Id) {
            this.yarn = this.data.Yarn;
        }
    }

    inputInfo = {
        columns: [
            { header: "Nama Kapas", value: "product" },
            { header: "Komposisi(%)", value: "composition" },
        ],
    };

    selectedLotConfigurationChanged(newValue) {
        if (newValue.Id) {
            this.data.lot.Id = newValue.lotId;
            this.data.lot.no = newValue.lotNo;
            this.data.yarnType = newValue.yarnType
        }
    }

    processTypeChanged(e) {
        var selectedProcess = e.srcElement.value;
        if(selectedProcess){
            this.data.processType = selectedProcess;
            if(this.data.processType=="Finish-Drawing")
            {
                this.processType = true;
            }
        }
    }

    yarnChanged(newValue, oldValue){
        if (this.yarn && this.yarn.Id) {
            this.data.YarnId = this.yarn.Id;
        }
    }
    
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