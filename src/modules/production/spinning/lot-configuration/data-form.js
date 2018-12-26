import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';

var YarnLoader = require('../../../../loader/spinning-yarn-loader');
var MachineLoader = require('../../../../loader/machine-loader');
var UnitLoader = require('../../../../loader/unit-azure-loader');
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

    spinningFilter = {"DivisionName.toUpper()":"SPINNING"};
    shift = ["Shift I: 06.00 – 14.00", "Shift II: 14.00 – 22.00", "Shift III: 22:00 – 06.00"]

    constructor(service) {
        this.service = service;
    }


    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.data.Input = this.data.Input || [];
        this.Lot = {}

        if (this.data.Unit && this.data.Unit._id) {
            this.unit = this.data.Unit;
        }
        if (this.data.Yarn && this.data.Yarn.Id) {
            this.yarn = this.data.Yarn;
        }
        if (this.data.Machine && this.data.Machine._id) {
            this.machine = this.data.Machine;
        }

        if (this.data.Counter && this.data.Hank) {
            var inputData = {
                Counter: this.data.Counter,
                Hank: this.data.Hank
            };
            this.data.Input.push(inputData)
        }

        if (this.data.Lot) {
            this.Lot = this.data.Lot;
        }

    }

    inputInfo = {
        columns: [
            { header: "Nama Kapas", value: "ProductName" },
            { header: "Komposisi", value: "Composition" },
        ],
        onAdd: function () {
            this.data.Details.push({ ProductName: {}, Hank: 0 });
        }.bind(this),
        onRemove: function () {
        }.bind(this)
    };

    unitChanged(newValue, oldValue) {
        if (this.unit && this.unit._id) {
            this.data.Unit = this.unit
            if (oldValue) {
                this.machine = null;
                this.yarn = null;
            }
        }
        else {
            this.unit = null;
            this.machine = null;
            this.yarn = null;
        }
    }



    get unitLoader() {
        return UnitLoader;
    }

    get yarnLoader() {
        return ProductLoader;
    }
} 