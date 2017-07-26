import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './service';

@inject(Service, BindingEngine, BindingSignaler)
export class DataForm {
    @bindable readOnly = false;
    @bindable buyerReadOnly = false;
    @bindable data;
    @bindable error;
    @bindable packing;

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

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    detailOptions = {};
    @bindable selectedBuyer;
    selectedBuyerChanged(newValue, oldValue) {
        if (this.selectedBuyer && this.selectedBuyer._id) {
            this.data.buyerId = this.selectedBuyer._id;
            this.data.buyerName = this.selectedBuyer.name;
            this.data.buyerAddress = this.selectedBuyer.address;
            this.data.buyerType = this.selectedBuyer.type;
            this.detailOptions = {
                selectedBuyerId: this.selectedBuyer._id
            }
        } else {
            this.data.buyerId = {};
            this.data.buyerName = "";
            this.data.buyerAddress = "";
            this.data.buyerType = "";
            this.detailOptions = {};
        }
    }

    get buyerLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: this.buyerFields };
            return this.service.searchBuyer(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    get addItems() {
        return (event) => {
            this.data.details.push({})
        }
    }

} 