import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

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

            this.data.packing.items.map((item) => {
                var _item = {};
                _item.product = `${this.data.packing.productionOrderNo}/${this.data.packing.colorName}/${this.data.packing.construction}/${item.lot}/${item.grade}/${item.length}`;
                _item.quantity = item.quantity;
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
        }
    }

} 