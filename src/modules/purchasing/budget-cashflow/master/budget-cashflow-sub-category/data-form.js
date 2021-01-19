import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const CashflowCategoryLoader = require("../../loader/cashflow-category-loader");


@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    reportTypeOptions = [{
        value: 0,
        text: ""
    }, {
        value: 1,
        text: "Rekap Hutang dan Disposisi"
    }, {
        value: 2,
        text: "Laporan Pembelian"
    }]

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    }

    constructor(service) {
        this.service = service;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        console.log(this);

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.PurchasingCategoryIds)
            this.data.Items = this.data.PurchasingCategoryIds.map(async (item) => {
                item.Category = await this.masterService.getCategoryById(item);
            })
        this.cashflowCategory = await this.service.getBudgetCashflowCategoryById(this.data.CashflowCategoryId);
    }

    get cashflowCategoryLoader() {
        return CashflowCategoryLoader;
    }

    @bindable cashflowCategory;
    cashflowCategoryChanged(newVal, oldVal) {
        if (newVal) {
            console.log(newVal);
            this.data.CashflowCategoryId = newVal.Id;
        } else {
            this.data.CashflowCategoryId = 0;
        }
    }

    columns = [
        "Kategori"
    ]

    get addItems() {
        return (event) => {
            console.log(this.data.Items);
            this.data.Items.push({})
        };
    }

    @bindable reportType
    reportTypeChanged(newVal, oldVal) {
        if (newVal) {
            this.data.ReportType = newVal.value
        } else {
            this.data.ReportType = 0;
        }
    }

    // @computedFrom("data.Items")
    get anyCategoryIsRawMaterial() {

        if (this.data.Items && this.data.Items.length > 0) {
            return this.data.Items.find(f => f.Category && f.Category.code == "BB");
        }
        return false;
    }
}
