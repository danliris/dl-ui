import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { Service } from './service';
import { BindingSignaler } from 'aurelia-templating-resources';

var moment = require('moment');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    }

    itemsColumns = [
        { header: "Nama Barang", value: "product" },
        { header: "Kuantiti Diterima", value: "quantity" },
        { header: "Remark", value: "remark" },
        { header: "Catatan", value: "note" }
    ]

    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    @bindable items;    


    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        // console.log(context.data);
        this.context = context;
        this.context._this = this;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.packingId) {
            this.selectedPacking = await this.service.getPackingById(this.data.packingId)
        }

        if (this.data.items) {
            this.items = this.data.items;
        }

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    errorChanged() {
        if (this.error && this.error.fabricGradeTests) {
            var index = this.data.fabricGradeTests.indexOf(this.selectedFabricGradeTest);
            this.selectedFabricGradeTestError = this.error.fabricGradeTests[index];
        }
    }

    packingTextFormatter = (packing) => {
        return `${packing.code}`;
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() !== '';
    }

    @computedFrom("selectedPacking.productionOrderNo")
    get orderNo() {
        if (!this.selectedPacking)
            return "-";
        return `${this.selectedPacking.productionOrderNo}`;
    }

    get colorRequest() {
        if (!this.selectedPacking)
            return "-";
        return `${this.selectedPacking.colorName}`;
    }

    get construction() {
        if (!this.selectedPacking)
            return "-";
        return `${this.selectedPacking.construction}`;
    }

    get packingUom() {
        if (!this.selectedPacking)
            return "-";
        return `${this.selectedPacking.packingUom}`;
    }

    get packingLoader() {
        return (keyword) => {
            var info = { keyword: keyword };
            return this.service.searchPacking(info)
                .then((result) => {
                    return result.data;
                })
        }
    }

    @bindable selectedPacking;
    salesContractNo = "";

    packingChanged() {
        if (this.selectedPacking) {
            this.data.packingId = this.selectedPacking._id;
            this.data.accepted = true;
            this.data.date = moment().format("YYYY-MM-DD");
            // this.data = this.selectedPacking;
            this.salesContractNo = this.selectedPacking.salesContractNo;
            var _items = [];
            this.selectedPacking.items.map((item) => {
                var _item = {};
                _item.product = `${this.salesContractNo}/${this.selectedPacking.colorName}/${this.selectedPacking.construction}/${item.lot}/${item.grade}`;
                _item.quantity = item.quantity;
                _item.remark = item.remark;
                _item.notes = item.note;
                _items.push(_item);
            })
            this.items = _items;
            this.data.items = this.items;
        }
    }

} 