import { inject, bindable, containerless, computedFrom } from 'aurelia-framework'
import { Service } from "./service";

const EMKLLoader = require('../../../loader/garment-emkl-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data;
    @bindable selectedEmkl;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    itemsColumns = [
        { header: "No Disposisi EMKL" },
        { header: "Tgl Invoice / Tagihan" },
        { header: "No Invoice / Tagihan" },
    ];

    billsColumns = [
        { header: "Unit", value: "unit" },
        { header: "Tagihan", value: "bill" },
    ];

    get emklLoader() {
        return EMKLLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.itemsOptions = {
            isEdit: this.isEdit,
            data: this.data
        }
    }

    emklView = (data) => {
        var name = data.Name || data.name;
        return `${name}`;
    }

    get addItems() {
        return (event) => {
            this.data.items.push({});
        };
    }

    get removeItems() {
        return (event) => {
        };
    }

    selectedEmklChanged(newValue) {
        this.data.emkl = newValue;
        this.data.items.splice(0);
    }

    @computedFrom('data.emkl')
    get address() {
        return (this.data.emkl || {}).address || (this.data.emkl || {}).Address;
    }

    @computedFrom('data.emkl')
    get npwp() {
        return (this.data.emkl || {}).npwp || (this.data.emkl || {}).NPWP;
    }

    get bills() {
        let bills = {};
        if (this.data.items) {
            for (const item of this.data.items) {
                if (item.paymentDisposition && item.paymentDisposition.invoiceDetails) {
                    for (const invoiceDetail of item.paymentDisposition.invoiceDetails) {
                        bills["C1A"] = invoiceDetail.amountPerUnit["C1A"];
                        bills["C1B"] = invoiceDetail.amountPerUnit["C1B"];
                        bills["C2A"] = invoiceDetail.amountPerUnit["C2A"];
                        bills["C2B"] = invoiceDetail.amountPerUnit["C2B"];
                        bills["C2C"] = invoiceDetail.amountPerUnit["C2C"];
                    }
                }
            }
        }

        let result = [];
        for (const key in bills) {
            if (bills.hasOwnProperty(key)) {
                const element = bills[key];
                result.push({ unit: key, bill: element });
            }
        }

        return result;
    }
}
