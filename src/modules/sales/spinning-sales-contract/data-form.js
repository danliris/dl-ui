import { inject, bindable, computedFrom } from 'aurelia-framework';

var BuyersLoader = require('../../../loader/buyers-loader');
var ComodityLoader = require('../../../loader/comodity-loader');
var UomLoader = require('../../../loader/uom-loader');
var QualityLoader = require('../../../loader/quality-loader');
var AccountBankLoader = require('../../../loader/account-banks-loader');
var ProductLoader = require('../../../loader/product-loader');
var TermOfPaymentLoader = require('../../../loader/term-of-payment-loader');
var AgentLoader = require('../../../loader/agent-loader')

export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;

    @bindable title;

    @bindable isEdit;
    @bindable isView;

    @bindable Buyer;
    @bindable TermOfPayment;
    @bindable Comodity;
    @bindable Quality;
    @bindable AccountBank;
    @bindable Agent;

    termOfPaymentFilter = {};

    // tagsFilter = { tags: { "$regex": "material", "$options": "i" } };
    tagsFilter = {};
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

        if (this.data.Id) {
            this.Buyer = this.data.Buyer;
            this.Agent = this.data.Agent;
            this.Comodity = this.data.Comodity;

            this.TermOfPayment =
                {
                    _id: this.data.TermOfPayment.Id,
                    code: this.data.TermOfPayment.Code,
                    termOfPayment: this.data.TermOfPayment.Name,
                    IsExport: this.data.TermOfPayment.IsExport
                }

            this.Quality = this.data.Quality;

            this.AccountBank =
                {
                    code: this.data.AccountBank.Code,
                    accountName: this.data.AccountBank.AccountName,
                    accountNumber: this.data.AccountBank.AccountNumber,
                    currency: { code: this.data.AccountBank.AccountCurrencyCode },
                    bankName: this.data.AccountBank.BankName
                };
            this.data.FromStock = this.data.FromStock ? "Ya" : "Tidak";
        }

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

    //set termOfPaymentFilter
    BuyerChanged(newValue, oldValue) {
        if (this.Buyer) {
            this.data.Buyer = this.Buyer;
            if (this.data.Buyer) {
                if (this.data.Buyer.Type == "Ekspor") {
                    this.termOfPaymentFilter = { "IsExport": true };
                } else {
                    this.termOfPaymentFilter = { "IsExport": false };
                }
            }

            // if (oldValue) {
            //     this.Buyer = {};
            //     this.TermOfPayment = {};
            //     this.Agent = {};

            //     this.data.Comission = "";
            //     this.data.TermOfShipment = "";
            //     this.data.Remark = "";
            //     this.data.ShipmentDescription = "";
            // }
        } else {
            this.Buyer = {};
            this.data.Buyer = {};

            this.TermOfPayment = {};
            this.data.TermOfPayment = {};

            this.Agent = {};
            this.data.Agent = {};

            this.data.Comission = "";
            this.data.TermOfShipment = "";
            this.data.Remark = "";
            this.data.ShipmentDescription = "";
        }
    }

    TermOfPaymentChanged(newValue, oldValue) {
        if (this.TermOfPayment) {
            this.data.TermOfPayment = {
                Id: this.TermOfPayment._id,
                Code: this.TermOfPayment.code,
                Name: this.TermOfPayment.termOfPayment,
                IsExport: this.TermOfPayment.IsExport
            }
        } else {
            this.TermOfPayment = {};
            this.data.TermOfPayment = {};
        }
    }

    ComodityChanged(newValue, oldValue) {
        if (this.Comodity) {
            this.data.Comodity = this.Comodity;
        } else {
            this.Comodity = {};
            this.data.Comodity = {};
        }
    }

    UomChanged() {
        if (this.Uom) {
            this.data.Uom = this.Uom;
        } else {
            this.Uom = {};
            this.data.Uom = {};
        }
    }

    QualityChanged() {
        if (this.Quality) {
            this.data.Quality = this.Quality;
        } else {
            this.Quality = {};
            this.data.Quality = {};
        }
    }

    AccountBankChanged() {
        if (this.AccountBank) {
            this.data.AccountBank = {
                Id: this.AccountBank._id,
                AccountName: this.AccountBank.accountName,
                AccountNumber: this.AccountBank.accountNumber,
                BankName: this.AccountBank.bankName,
                Code: this.AccountBank.code,
                AccountCurrencyId: this.AccountBank.currency._id,
                AccountCurrencyCode: this.AccountBank.currency.code,
            }
        } else {
            this.AccountBank = {};
            this.data.AccountBank = {};
        }
    }


    getAccount = (text) => {
        var data = text.code ? `${text.accountName}-${text.bankName}-${text.accountNumber}-${text.currency.code}` : "";
        return data
    }

    getAgentText = (text) => {
        var data = text.Code ? `${text.Code}-${text.Name}` : "";
        return data
    }

    AgentChanged() {
        if (this.Agent) {
            this.data.Agent = this.Agent
        }
        else {
            this.Agent = {};
            this.data.Agent = {};
            this.data.Comission = "";
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
} 