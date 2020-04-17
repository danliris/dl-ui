import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
var ProductionOrderLoader = require('../../../loader/production-order-azure-loader');
var BonLoader = require('../../../loader/dyeing-printing-bon-loader')

import UnitLoader from "../../../loader/unit-loader";
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };
    constructor(service) {
        this.service = service;
    }

    get NoBonLoader() {
        return BonLoader;
    }
    
    bonBind(){
        console.log(this.context);
        
        this.data = this.context.selectedNoBon;
    //     this.data.saldo = this.saldoValue;
    //     this.data.grade = this.selectedBon.grade;
        console.log(this.data);
    }
    setBalance(context){
        console.log(context);
        this.data.saldo = context.saldo;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "PACK";

        this.error = this.context.error;
        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }
}


