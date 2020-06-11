import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const SalesInvoiceLoader = require('./../../../../loader/sales-invoice-loader');
const BuyerLoader = require('./../../../../loader/buyers-loader');
const UnitLoader = require('./../../../../loader/unit-loader');
const StorageLoader = require('./../../../../loader/storage-loader');
const DOSalesLoader = require("./../../../../loader/do-sales-loader");

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable unit;
    @bindable selectedUnitLength;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }

    }

    itemOptions = {};

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    NumberBonOut = ["", "GRPG", "JLPG", "JLPA", "JLOG", "JLOA", "JLCC", "KLB",];

    UnitLength = ["", "YDS", "MTR",];

    UnitPacking = ["", "PCS", "BALE",];

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        this.hasPosting = this.context.hasPosting;
        // if (this.data.UnitLength) {
        //     this.selectedUnitLength = this.data.UnitLength;
        // }
    }

    // selectedUnitLengthChanged(newValue, oldValue) {
    //     if (this.selectedUnitLength) {
    //         this.data.UnitLength = this.selectedUnitLength;
    //         this.itemOptions.UnitLength = this.data.UnitLength;
    //     }
    // }

    columns = [
        { header: "No. SOP", value: "ItemNoSOP" },
        { header: "Nama Barang", value: "ItemMaterialName" },
        { header: "Grade", value: "ItemDesign" },
        { header: "Jenis", value: "ItemType" },
        { header: "Kode", value: "ItemCode" },
        { header: "Bale", value: "InputBale" },
        { header: "Piece", value: "InputPiece" },
        { header: "Meter", value: "InputMeter" },
        { header: "Kg", value: "InputKg" }
    ];

    get addItems() {
        return (event) => {
            this.data.ItemsMaterialDeliveryNoteWeaving.push({})
        };
    }

    enterDelegate(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            return false;
        } else return true;
    }


    get salesInvoiceLoader() {
        return SalesInvoiceLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    get doSalesLoader() {
        return DOSalesLoader;
    }

    doTextFormatter = (deliveryOrder) => {
        return `${deliveryOrder.DOSalesNo}`;
    };

    buyerView = (buyer) => {
        return `${buyer.Code} / ${buyer.Name}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    storageView = (storage) => {

        return `${storage.unit.name} - ${storage.name}`

    }

    get storageLoader() {

        return StorageLoader;

    }
}
