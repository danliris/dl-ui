import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

var BankLoader = require('../../../loader/banks-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var BuyerLoader = require('../../../loader/buyers-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;

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
    }

    statusOptions = ["IN", "OUT"];
    sourceTypes = ["Operasional", "Investasi", "Pendanaan"];

    get bankLoader() {
        return BankLoader;
    }

    bankView = (bank) => {
        return bank.accountName ? `${bank.accountName} - ${bank.bankName} - ${bank.accountNumber} - ${bank.currency.code}` : '';
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get getSupplierLabel() {
        if (this.data.Status == "OUT" && this.data.SourceType == "Operasional") {
            return "Supplier";
        } else {
            return "Ke";
        }
    }

    supplierView = (supplier) => {
        return `${supplier.code} / ${supplier.name}`
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    get getBuyerLabel() {
        if (this.data.Status == "IN" && this.data.SourceType == "Operasional") {
            return "Buyer";
        } else {
            return "Dari";
        }
    }

    buyerView = (buyer) => {
        return `${buyer.code} / ${buyer.name}`
    }

    get isFrom() {
        if (this.data.Status == "IN") {
            return true;
        }
        return false;
    }
}