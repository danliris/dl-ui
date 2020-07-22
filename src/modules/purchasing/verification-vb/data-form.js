import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
import moment from 'moment';

const VbLoader = require('../../../loader/vb-realization-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable numberVB;
    @bindable items = [];

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.numberVB && this.data.numberVB.VBNo) {
            this.numberVB = this.data.numberVB;
            this.DetailItems = this.data.numberVB.DetailItems;

        } else {
            this.numberVB = null;
            this.DetailItems = null;
        }
    }

    async numberVBChanged(newValue) {
        if (newValue) {
            this.data.numberVB = newValue;
            var dataItems = [];

            console.log(this.data.numberVB);

            if (this.data.numberVB) {

                for (var dataItem of this.data.numberVB.DetailItems) {
                    var item = {};
                    item.Date = dataItem.Date;
                    item.Remark = dataItem.Remark;
                    item.Amount = dataItem.Amount;
                    item.isGetPPn = dataItem.isGetPPn;
                    if (dataItem.isGetPPn == true) {
                        var cnt = dataItem.Amount * 0.1;
                        item.Total = dataItem.Amount + cnt;
                    }
                    else {

                        item.Total = dataItem.Amount;
                    }

                    dataItems.push(item);
                }
                console.log(dataItems);
                this.items = dataItems;

            }
            else {
                this.data.numberVB = [];
                this.items = null;
                this.dataItems = [];
                this.dataItem = {};
                this.item = {};
            }
        }
    }

    context = ["Rincian Purchase Request"];

    columns = [
        {
            field: "Date", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Remark", title: "Keterangan" },
        { field: "Amount", title: "Harga" },
        {
            field: "isGetPPn", title: "Kena Ppn",
            formatter: function (value, row, index) {
                return value ? "Ya" : "Tidak";
            }
        },
        { field: "Total", title: "Total" }
    ]

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    get vbLoader() {

        return VbLoader;
    }

}
