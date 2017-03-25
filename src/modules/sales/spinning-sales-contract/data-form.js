import { inject, bindable, computedFrom } from 'aurelia-framework';

var BuyersLoader = require('../../../loader/buyers-loader');
var ComodityLoader = require('../../../loader/comodity-loader');
var UomLoader = require('../../../loader/uom-loader');
var QualityLoader = require('../../../loader/quality-loader');
var AccountBankLoader = require('../../../loader/account-banks-loader');
var ProductLoader = require('../../../loader/products-loader');
var TermOfPaymentLoader = require('../../../loader/term-of-payment-loader');
var AgentLoader = require('../../../loader/agent-loader')

export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;

    @bindable title;

    @bindable isEdit;
    @bindable isView;

    termOfPaymentFilter = {};

    tagsFilter = { tags: { "$regex": "Material" } };

    incomeTaxOptions = ['Tanpa PPn', 'Exclude PPn', 'Include PPn'];

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        // this.termOfPayment={};
    }

    //set termOfPaymentFilter
    @computedFrom("data.buyer")
    get istermOfPayment() {
        this.termOfPayment = false;
        this.termOfPaymentFilter = {};
        if (this.data.buyer) {
            this.termOfPayment = true;
            if (this.data.buyer.type.trim().toLowerCase() == "ekspor") {
                this.termOfPaymentFilter = { isExport: true };
            } else {
                this.termOfPaymentFilter = { isExport: false };
            }
        } else {
            this.termOfPayments = {};
        }
        return this.termOfPayment;
    }

    @computedFrom("data.buyer")
    get isExport() {
        this.agent = false;
        if (this.data.buyer) {
            if (this.data.buyer.type.trim().toLowerCase() == "ekspor") {
                this.agent = true;
            }
        }
        return this.agent;
    }

    @computedFrom("data.buyer")
    get isTermOfShipment() {
        this.termOfShipment = false;
        if (this.data.buyer) {
            if (this.data.buyer.type.trim().toLowerCase() == "ekspor") {
                this.termOfShipment = true;
            }
        }
        return this.termOfShipment;
    }

    buyersChanged(e) {
        var selectedBuyer = e.detail;
        this.data.agent = {};
        this.agentChanged({});
        this.data.termOfPayment = {};
        this.termOfPaymentChanged({});
        this.data.comission = "";
        this.data.incomeTax = this.incomeTaxOptions[0];
        if (selectedBuyer) {
            this.data.buyerId = selectedBuyer._id ? selectedBuyer._id : "";
            if (selectedBuyer.type.toLowerCase() == "ekspor" || selectedBuyer.type.toLowerCase() == "export") {
                this.filterpayment = {
                    "isExport": true
                };
            }
            else {
                this.filterpayment = {
                    "isExport": false
                };
            }

        }
        console.log('buyer changed');
    }

    comodityChanged(e) {
        console.log('comodity changed');
    }

    uomChanged(e) {
        console.log('uom changed');
    }

    qualityChanged(e) {
        console.log('quality changed');
    }

    accountBankChanged(e) {
        console.log('accountBank changed');
    }

    productChanged(e) {
        console.log('product changed');
    }

    termOfPaymentChanged(e) {
        console.log('term of payment Changed');
    }

    agentChanged(e) {
        var selectedAgent = e.detail || {};
        if (selectedAgent) {
            this.data.agentId = selectedAgent._id ? selectedAgent._id : "";
            if (!this.readOnly) {
                this.data.comission = "";
            }
        }
        else {
            this.data.comission = "";
        }
        console.log('agent changed');
    }



    get buyersLoader() {
        return BuyersLoader;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get uomLoader() {
        return UomLoader;
    }

    get qualityLoader() {
        return QualityLoader;
    }

    get accountBankLoader() {
        return AccountBankLoader;
    }

    get productLoader() {
        return ProductLoader;
    }

    get termOfPaymentLoader() {
        return TermOfPaymentLoader;
    }

    get agentLoader() {
        return AgentLoader;
    }

    activate() {

    }

    attached() {

    }
} 