import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
var StorageLoader = require('../../../loader/storage-loader');
var PackingUnacceptedLoader = require('../../../loader/packing-unaccepted-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable packingReadOnly = false;
    @bindable data;
    @bindable error;
    @bindable packing;
    @bindable title;

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }

    itemsColumns = [
        { header: "Nama Barang", value: "product" },
        { header: "Kuantiti Diterima", value: "quantity" },
        { header: "Kuantiti Saat Ini", value: "availableQuantity" },
        { header: "Berat", value: "weight" },
        { header: "Berat Total", value: "weightTotal" },
        { header: "Panjang", value: "length" },
        { header: "Panjang Total", value: "lengthTotal" },
        { header: "Remark", value: "remark" },
        { header: "Catatan", value: "notes" }
    ]

    get packingUnacceptedLoader() {
        return PackingUnacceptedLoader;
    }

    get isSolid() {
        if (this.data.packing && this.data.packing.orderType)
            return (this.data.packing.orderType || "").toString().toLowerCase() === "solid";
    }

    packingChanged(newValue) {
        this.data.packing = newValue;
        if (this.data.packing) {
            var _items = [];
            this.data.packingId = this.data.packing._id;

            // this.data.storageName = this.data.packing.orderType.toString().toLowerCase() === "printing" ? "Gudang Jadi Printing" : "Gudang Jadi Finishing";

            this.data.packing.items.map((item) => {
                var _item = {};
                _item.product = item.remark !== "" && item.remark !== null ? `${this.data.packing.productionOrderNo}/${this.data.packing.colorName}/${this.data.packing.construction}/${item.lot}/${item.grade}/${item.length}/${item.remark}` : `${this.data.packing.productionOrderNo}/${this.data.packing.colorName}/${this.data.packing.construction}/${item.lot}/${item.grade}/${item.length}`;
                _item.quantity = item.quantity;
                _item.availableQuantity = item.availableQuantity ? item.availableQuantity : item.quantity;
                _item.length = item.length;
                _item.weight = item.weight;
                _item.remark = item.remark;
                _item.notes = item.notes;
                _items.push(_item);
            })

            this.data.items = _items;
        }
        else {
            this.data.packing = {};
            this.data.packingId = {};
            this.data.items = [];
            this.data.storageName = "";
        }
    }

    storageView = (storage) => {
        return `${storage.unit.name} - ${storage.name}`
    }

    get storageLoader() {
        return StorageLoader;
    }
} 