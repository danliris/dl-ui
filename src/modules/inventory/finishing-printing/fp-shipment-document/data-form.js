import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './service';
var StorageLoader = require('../../../../loader/storage-loader');
var BuyerLoader = require('../../../../loader/buyers-loader');

@inject(Service, BindingEngine, BindingSignaler)
export class DataForm {
    @bindable readOnly = false;
    // @bindable buyerReadOnly = false;
    @bindable data;
    @bindable error;
    @bindable packing;
    // @bindable isNewStructure = true;

    @bindable title;

    // buyerFields = ["_id", "code", "name", "address", "type"];

    mediumControlOptions = {
        control: {
            length: 4
        }
    };

    smallControlOptions = {
        control: {
            length: 2
        }
    };

    detailColumns = ["Daftar Surat Perintah Produksi"]

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        // this.detailOptions = {};

        this.selectedBuyer = this.data.Buyer || undefined;
        this.selectedStorage = this.data.Storage || undefined;

        if (this.selectedBuyer) {
            this.detailOptions.selectedBuyerName = this.selectedBuyer.Name;
            this.detailOptions.selectedBuyerId = this.selectedBuyer.Id;
        }

        if (this.selectedStorage) {
            this.detailOptions.selectedStorageCode = this.selectedStorage.Code;
        }
    }

    @bindable detailOptions = {};
    @bindable selectedBuyer;
    selectedBuyerChanged(newValue, oldValue) {
        this.data.Buyer = newValue;
        if (newValue) {
            this.detailOptions.selectedBuyerName = newValue.Name;
            this.detailOptions.selectedBuyerId = newValue.Id;
            this.data.Details = [];
            // if (!this.context.buyerReadOnly) {
            //     this.data.details = [];
            // }
        } else {
            this.data.Details = [];
            this.data.Buyer = undefined;
            this.detailOptions.selectedBuyerName = undefined;
            this.detailOptions.selectedBuyerId = undefined;
        }
    }

    @bindable selectedStorage;
    selectedStorageChanged(newValue, oldValue) {
        this.data.Storage = newValue;
        if (newValue) {
            this.detailOptions.selectedStorageCode = newValue.code;
            this.data.Storage = newValue;
            this.data.Details = [];
            // if (!this.context.buyerReadOnly) {
            //     this.data.details = [];
            // }
        }
        else {
            this.data.Details = [];
            this.data.Storage = undefined;
            this.detailOptions.selectedStorageCode = "";
        }
    }

    get addDetails() {
        return (event) => {
            this.data.Details.push({});
            this.context.DetailsCollection.bind();
        }
    }

    storageView = (storage) => {
        return `${storage.unit.name} - ${storage.name}`
    }

    get storageLoader() {
        return StorageLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    @computedFrom("selectedBuyer", "selectedStorage")
    get detailVisibility() {
        // console.log();
        return this.selectedBuyer && this.selectedStorage;
    }
} 