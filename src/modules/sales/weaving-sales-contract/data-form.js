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

    tagsFilter = { tags: { "$regex": "material", "$options": "i" } };

    incomeTaxOptions = ['Tanpa PPn', 'Include PPn', 'Exclude PPn'];

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

    enterDelegate(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            return false;
        }
        else
            return true;
    }

    enterEventDelegate(event) {
        event();
        return true;
    }

    //set termOfPaymentFilter
    @computedFrom("data.buyer")
    get istermOfPayment() {
        this.termOfPayment = false;
        this.termOfPaymentFilter = {};
        if (this.data.buyer) {
            this.termOfPayment = true;
            if (this.data.buyer.type.trim().toLowerCase() == "ekspor") {
                this.termOfPaymentFilter = { "isExport": true };
            } else {
                this.termOfPaymentFilter = { "isExport": false };
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
    get isRemark() {

        this.remark = false;
        if (this.data.buyer) {

            if (this.data.buyer.type.trim().toLowerCase() != "ekspor") {
                this.remark = true;
            }
        }
        return this.remark;
    }

    @computedFrom("data.buyer")
    get isIncomeTax() {
        this.incomeTax = false;
        if (this.data.buyer) {
            if (this.data.buyer.type.trim().toLowerCase() == "ekspor") {

                this.incomeTax = true;
            } else {

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
            // this.incomeTaxOptions[0];
            this.data.incomeTax = this.incomeTaxOptions[0];
            this.data.buyerId = selectedBuyer._id ? selectedBuyer._id : "";

            if (!this.data.buyerId || this.data.buyerId == "" || !this.data.buyer) {
                this.data.termOfPayment = {};
                this.data.agent = "";
                this.data.comission = "";
                this.data.termOfShipment = "";
                this.data.remark = "";
            }
        }
        else {
            this.data.termOfPayment = {};
            this.data.agent = "";
            this.data.comission = "";
            this.data.termOfShipment = "";
            this.data.remark = "";
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

        return AgentLoader;
    }

    activate() {

    }

    attached() {

    }

} 