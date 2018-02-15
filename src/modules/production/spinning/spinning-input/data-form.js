import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

var YarnLoader = require('../../../../loader/spinning-yarn-loader');
var MachineLoader = require('../../../../loader/machine-loader');
var UnitLoader = require('../../../../loader/unit-loader');

var moment = require('moment');

export class DataForm {
    @bindable readOnly = false;
    @bindable data={};
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
        var selectedUnit = newValue;
        if (selectedUnit) {
            this.unit = selectedUnit;
            this.data.UnitId = selectedUnit._id;
            this.data.UnitName = selectedUnit.name;
        }
        else {
            this.unit = null;
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