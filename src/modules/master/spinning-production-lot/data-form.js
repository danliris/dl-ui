import {inject, bindable, computedFrom} from 'aurelia-framework';

var UnitLoader = require('../../../loader/unit-loader');
var MachineLoader = require('../../../loader/machine-loader');
var YarnLoader = require('../../../loader/spinning-yarn-loader');


export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable unit;
    @bindable machine;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    @computedFrom("data.unit")
    get filter() {
        var filterMachine={};
        if(this.data.unit){
            filterMachine={
                "unit.code":this.data.unit.code
            }
        }
        return filterMachine;
    }

    unitChanged(newValue, oldValue) {
        var selectedUnit = newValue;

        if (selectedUnit) {
            this.data.unit = selectedUnit;
            this.data.unitId = selectedUnit._id;
        }
        else {
            this.data.unitId = null;
        }
        this.data.machine=null;
    }

    machineChanged(newValue, oldValue) {
        var selectedMachine = newValue;

        if (selectedMachine) {
            this.data.machine = selectedMachine;
            this.data.machineId = selectedMachine._id;
        }
        else {
            this.data.machineId = null;
        }

    }


    bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.unit=this.data.unit;
    this.machine=this.data.machine;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    }

    
    get machineLoader() {
		return MachineLoader;
	}

    get unitLoader() {
		return UnitLoader;
	}

    get yarnLoader() {
		return YarnLoader;
	}

}
