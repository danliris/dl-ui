import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';

var MaterialDistributionLoader = require('../../../../loader/material-distribution-notes');
var materialDistributionDetailsLoader = require('../../../../loader/material-distribution-notes-details');

@inject(Service)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable error;
    @bindable title;
    @bindable Supplier;
    @bindable NoBon;

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

    filter = {}
    products = [];
    options = {};

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.Bon && this.data.Bon.Id) {
            this.NoBon = this.data.Bon;
        }

        if (this.data.Supplier && this.data.Supplier._id) {
            this.Supplier = this.data.Supplier;
        }

    }

    DetailInfo = {
        columns: [
            { header: "Nama Barang", value: "BonProduct" },
            { header: "Jumlah (Piece)", value: "Quantity" },
            { header: "Panjang (Meter)", value: "Length" },
            { header: "Keterangan", value: "remark" },
        ],
        onAdd: function () {
            this.data.Details.push({});
        }.bind(this),
        onRemove: function () {
        }.bind(this)
    };

    get materialDistributionLoader() {
        return MaterialDistributionLoader;
    }

    get materialDistributionDetailsLoader() {
        return materialDistributionDetailsLoader;
    }

    SupplierChanged(newValue, oldValue) {
        this.products = [];
        if (newValue.details != undefined) {
            for (let detail of newValue.details) {
                this.products.push({
                    Id: detail.Product._id,
                    Code: detail.Product.code,
                    Name: detail.Product.name,
                    Length: detail.ReceivedLength,
                    Quantity: detail.Quantity,
                })
            }
            this.options.productLoader = this.products;
        }

        if (this.Supplier && this.Supplier.name) {
            this.data.Supplier = this.Supplier
        }
        else {
            this.Supplier = null;
        }
    }

    async NoBonChanged(newValue, oldValue) {
        if (this.NoBon && this.NoBon.Id) {
            this.filter = { "Id": newValue.Id };
            var BonData = await this.service.getBonById(newValue.Id);
            this.data.Bon = this.NoBon;
            this.data.Bon.UnitName = BonData.Unit.name;
            if (oldValue) {
                this.Supplier = null;
            }
        }
        else {
            this.NoBon = null;
            this.Supplier = null;
        }
    }

} 