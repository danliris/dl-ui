import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';

var YarnLoader = require('../../../../loader/spinning-yarn-loader');
var MachineLoader = require('../../../../loader/machine-loader');
var UnitLoader = require('../../../../loader/unit-loader');

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
    // @bindable unit;
    // @bindable machine;
    // @bindable yarn;
    // @bindable Details = [];

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

    // spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };
    // shift = ["Shift I: 06.00 – 14.00", "Shift II: 14.00 – 22.00", "Shift III: 22:00 – 06.00"]

    constructor(service) {
        this.service = service;
    }


    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        // this.data.Input = this.data.Input || [];
        // this.Lot = {}

        // if (this.data.Unit && this.data.Unit._id) {
        //     this.unit = this.data.Unit;
        // }


        // if (this.data.Counter && this.data.Hank) {
        //     var inputData = {
        //         Counter: this.data.Counter,
        //         Hank: this.data.Hank
        //     };
        //     this.data.Input.push(inputData)
        // }


    }

    DetailInfo = {
        columns: [
            { header: "Nama Barang", value: "BonProduct" },
            { header: "Jumlah (Piece)", value: "Quantity" },
            { header: "Panjang (Meter)", value: "Length" },
            { header: "Panjang (Yard)", value: "Yard" },
            { header: "Keterangan", value: "remark" },
        ],
        onAdd: function () {
            // this.data.Details.push({ BonProduct: {}, Quantity: 0, Length: 0, Yard: 0, remark: "" });
            this.data.Details.push({});
        }.bind(this),
        onRemove: function () {
        }.bind(this)
    };

} 