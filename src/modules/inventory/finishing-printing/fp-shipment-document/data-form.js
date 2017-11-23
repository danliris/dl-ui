import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './service';
var StorageLoader = require('../../../../loader/storage-loader');
var BuyerLoader = require('../../../../loader/buyers-loader');

@inject(Service, BindingEngine, BindingSignaler)
export class DataForm {
    @bindable readOnly = false;
    @bindable buyerReadOnly = false;
    @bindable data;
    @bindable error;
    @bindable packing;
    @bindable isNewStructure = true;

    @bindable title;

    buyerFields = ["_id", "code", "name", "address", "type"];

    buyerControlOptions = {
        control: {
            length: 4
        }
    };

    deliveryCodeControlOptions = {
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
        this.detailOptions = {};
        this.detailOptions.selectedBuyerName = "";
        this.detailOptions.selectedBuyerID = "";
        this.detailOptions.selectedStorageCode = "";
        this.detailOptions.isNewStructure = this.context.isNewStructure;
        if (this.data._id && this.data.buyerId) {
            this.selectedBuyer = await this.service.getBuyerById(this.data.buyerId);
        }
    }

    detailOptions = {};
    @bindable selectedBuyer;
    selectedBuyerChanged(newValue, oldValue) {
        if (this.selectedBuyer && this.selectedBuyer._id) {
            this.data.buyerId = this.selectedBuyer._id;
            this.data.buyerCode = this.selectedBuyer.code;
            this.data.buyerName = this.selectedBuyer.name;
            this.data.buyerAddress = this.selectedBuyer.address;
            this.data.buyerType = this.selectedBuyer.type;
            this.detailOptions.selectedBuyerName = this.selectedBuyer.name;
            this.detailOptions.selectedBuyerID = this.selectedBuyer._id;
            if (!this.context.buyerReadOnly) {
                this.data.details = [];
            }
        } else {
            this.data.buyerId = {};
            this.data.buyerCode = "";
            this.data.buyerName = "";
            this.data.buyerAddress = "";
            this.data.buyerType = "";
            this.detailOptions.selectedBuyerName = "";
            this.detailOptions.selectedBuyerID = "";
        }
    }

    // isNewStructureChanged(newValue, oldValue) {
    //     console.log(newValue);
    //     this.detailOptions.isNewStructure = newValue;
    // }

    @bindable selectedStorage;
    selectedStorageChanged(newValue) {
        if (newValue) {
            this.detailOptions.selectedStorageCode = newValue.code;
            this.data.storage = newValue;
            if (!this.context.buyerReadOnly) {
                this.data.details = [];
            }
        }
        else {
            this.data.storage = undefined;
            this.detailOptions.selectedStorageCode = "";
        }
    }

    get addDetails() {
        return (event) => {
            this.context.DetailsCollection.bind()
            this.data.details.push({})
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
        return this.selectedBuyer && this.selectedStorage;
    }
} 