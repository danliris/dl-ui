import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

var YarnLoader = require('../../../../loader/spinning-yarn-loader');
var MachineLoader = require('../../../../loader/machine-loader');
var UnitLoader = require('../../../../loader/unit-loader');

var moment = require('moment');

export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable error;
    @bindable title;
    @bindable unit;
    @bindable machine;
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
            length: 4
        },
        control: {
            length: 5
        }
    }

    spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };
    shift = ["Shift I: 06.00 – 14.00", "Shift II: 14.00 – 22.00", "Shift III: 22:00 – 06.00"]

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.data.Input = this.data.Input || [];

        if (this.data.Unit && this.data.Unit._id) {
            this.unit = this.data.Unit;
        }
        if (this.data.Yarn && this.data.Yarn.Id) {
            this.yarn = this.data.Yarn;
        }
        if (this.data.Machine && this.data.Machine._id) {
            this.machine = this.data.Machine;
        }

        if(this.data.Counter && this.data.Hank){
            var inputData={
                Counter:this.data.Counter,
                Hank:this.data.Hank
            };
            this.data.Input.push(inputData)
        }

    }

    inputInfo = {
        columns: [
            { header: "Counter", value: "Counter" },
            { header: "Hank", value: "Hank" },
        ],
        onAdd: function () {
            this.data.Input.push({ Counter: 0, Hank: 0 });
        }.bind(this),
        onRemove: function () {
        }.bind(this)
    };

    unitChanged(newValue, oldValue) {

        if (this.unit && this.unit._id) {
            // this.data.UnitId = this.unit._id;
            // this.data.UnitName = this.unit.name;
            this.data.Unit = this.unit
        }
        else {
            this.unit = null;
            this.data.unitName = "";
            this.data.UnitId = "";
        }
    }

    machineChanged(newValue, oldValue) {
        var selectedUnit = newValue;
        if (selectedUnit) {
            this.machine = selectedUnit;
            this.data.MachineId = selectedUnit._id;
            this.data.MachineName = selectedUnit.name;
        }
        else {
            this.data.MachineId = "";
        }
    }

    yarnChanged(newValue, oldValue) {
        var selectedUnit = newValue;
        if (selectedUnit) {
            this.yarn = selectedUnit;
            this.data.YarnId = selectedUnit.Id;
            this.data.YarnName = selectedUnit.Name;
        }
        else {
            this.data.YarnId = "";
        }
    }

    @computedFrom("unit")
    get filter() {
        var filterMachine = {};
        if (this.unit) {
            filterMachine = {
                "unit.code": this.unit.code
            }
        }
        return filterMachine;
    }

    get lot() {
        if (this.unit && this.machine && this.yarn) {
            var lotData = `${this.unit.name}/${this.machine.name}/${this.yarn.Name}`
            this.data.Lot = lotData;
            return lotData;
        } else {
            return ""
        }
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