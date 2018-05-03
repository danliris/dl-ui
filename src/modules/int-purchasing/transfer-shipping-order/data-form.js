import { bindable } from "aurelia-framework";

var SupplierLoader = require('../../../loader/supplier-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable title;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    transferShippingOrderItemsColumns = [
        "Nomor DO",
    ];

    transferShippingOrderItemsOptions = { filter: {} };

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.readOnly) {
            this.transferShippingOrderItemsColumns.push("");
        }

    }

    get supplierLoader() {
        return SupplierLoader;
    }
    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`;
    }

    get addTransferShippingOrderItems() {
        return () => {
            this.data.TransferShippingOrderItems.push({});
        }
    };

}