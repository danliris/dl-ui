import { inject, bindable, computedFrom } from 'aurelia-framework';

var BuyersLoader = require('../../../loader/buyers-loader');
var ComodityLoader = require('../../../loader/comodity-loader');
var UomLoader = require('../../../loader/uom-loader');
var QualityLoader = require('../../../loader/quality-loader');
var AccountBankLoader = require('../../../loader/account-banks-loader');
var MaterialLoader = require('../../../loader/material-loader');
var ProductLoader = require('../../../loader/products-loader');
var YarnMaterialLoader = require('../../../loader/yarn-material-loader');
var TermOfPaymentLoader = require('../../../loader/term-of-payment-loader');
var AgentLoader = require('../../../loader/agent-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;

    @bindable title;

    @bindable isEdit;
    @bindable isView;


    termOfPaymentFilter = {};

    tagsFilter = { tags: { "$regex": "Material" } };

    incomeTaxOptions = [];

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
    get isIncomeTax() {
        this.incomeTax = false;
        if (this.data.buyer) {
            if (this.data.buyer.type.trim().toLowerCase() == "ekspor") {
                this.incomeTaxOptions = ['Tanpa PPn'];
                this.incomeTax = true;
            } else {
                this.incomeTaxOptions = ['Include PPn', 'Exclude PPn', 'Tanpa PPn'];
                this.incomeTax = true;
            }
        }
        return this.incomeTax;
    }


    @computedFrom("data.buyer")
    get isComission() {
        this.comission = false;
        if (this.data.buyer) {
            if (this.data.buyer.type.trim().toLowerCase() == "ekspor") {
                this.comission = true;
            }
        }
        return this.comission;
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
        var selectedBuyer = e.detail || {};
        if (selectedBuyer) {
            this.data.buyerId = selectedBuyer._id ? selectedBuyer._id : "";
            this.data.termOfPayment = "";
            this.data.agent = "";
            this.data.comission = "";
        }
        else {
            this.data.termOfPayment = "";
            this.data.agent = "";
            this.data.comission = "";
        }
    }

    comodityChanged(e) {
        console.log('comodity changed')
    }

    uomChanged(e) {
        console.log('uom changed')
    }

    qualityChanged(e) {
        console.log('quality changed')
    }

    accountBankChanged(e) {
        console.log('accountBank changed')
    }

    materialChanged(e) {
        console.log('material changed')
    }


    productChanged(e) {
        console.log('product changed')
    }

    yarnMaterialChanged(e) {
        console.log('yarnMaterial Changed')
    }

    termOfPaymentChanged(e) {
        console.log('term of payment Changed')
    }

    agentChanged(e) {
        var selectedAgent = e.detail || {};
        if (selectedAgent) {
            this.data.agentId = selectedAgent._id ? selectedAgent._id : "";
            if (!this.data.agent) {
                this.data.comission = "";
            }
        }
        else {
            this.data.comission = "";
        }
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

    get materialLoader() {
        return MaterialLoader;
    }

    get productLoader() {
        return ProductLoader;
    }

    get yarnMaterialLoader() {
        return YarnMaterialLoader;
    }

    get termOfPaymentLoader() {
        return TermOfPaymentLoader;
    }

    get agentLoader() {

        //         .then(results => {
        //     return results.data.map(buyer => {
        //         buyer.toString = function () {
        //             return [this.code, this.name]
        //                 .filter((item, index) => {
        //                     return item && item.toString().trim().length > 0;
        //                 }).join(" - ");
        //         }
        //         return buyer;
        //     })
        // });

        return BuyersLoader.toString;
    }

    activate() {

    }

    attached() {

    }
} 