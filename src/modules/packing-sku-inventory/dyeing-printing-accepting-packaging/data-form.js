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
    packUnitData = ["","PACK","PIECE","POTONGAN"];

    // bonBind(){
        
    //     this.data = this.context.selectedNoBon;
    //     this.data.packagingQty = this.packQtyValue;
    //     this.data.packagingUnit = this.packUnitValue;

    //     this.data.area = "PACK";
    //     console.log(this.data);
    // }
    // setPackQty(){
    //     this.data.packagingQty = this.packQtyValue;
    //     console.log(this.data);
    // }

    // setUnitQty(){
    //     this.data.packagingUnit = this.packUnitValue;
    //     console.log(this.data);
    // }

    bind(context) {
        this.context = context;
        // this.data = this.context.data;
        
        if(this.data){
            
            this.selectedNoBon = this.data;
            this.context.selectedBon = this.data;
            this.context.packQtyValue = this.data.packagingQty;
            this.context.packUnitValue = this.data.packagingUnit;
            // console.log(this);
        }

        this.error = this.context.error;
        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }
}


