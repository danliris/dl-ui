import { inject, bindable, computedFrom } from 'aurelia-framework';

var BuyersLoader = require('../../../loader/buyers-loader');
var ComodityLoader = require('../../../loader/comodity-loader');
var UomLoader = require('../../../loader/uom-loader');
var QualityLoader = require('../../../loader/quality-loader');
var AccountBankLoader = require('../../../loader/account-banks-loader');
var MaterialLoader = require('../../../loader/material-loader');
var ProductLoader = require('../../../loader/products-loader');
var YarnMaterialLoader = require('../../../loader/yarn-material-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data;
    @bindable error;

    @bindable title;

    @bindable cancel;
    @bindable delete;
    @bindable save;
    @bindable edit;

    tagsFilter = { tags: { "$regex": "Material" } };

    incomeTaxOptions = ['Include PPn', 'Exclude PPn', 'Tanpa PPn'];

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;

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

    // dateFormat(e) {
    //     return moment(this.data.deliverySchedule).format("MMMM Do YY");
    // }

    buyersChanged(e) {
        console.log('buyers changed')
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


    resetErrors() {
        this.error = {};
        // this.data.items = []

    }


    activate() {

    }

    attached() {

    }
} 