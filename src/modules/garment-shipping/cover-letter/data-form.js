import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";

var PackingListLoader = require('./garment-packing-list-loader');
var ForwarderLoader = require('../../../loader/garment-forwarders-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;

    @bindable selectedPackingList;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 6
        }
    };

    freightOptions = [
        "COLLECT",
        "PREPAID"
    ];

    get packingListLoader() {
        return PackingListLoader;
    }

    get forwarderLoader() {
        return ForwarderLoader;
    }

    orderView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`
    }

    forwarderView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
    }

    selectedPackingListChanged(newValue, oldValue) {
        if (newValue) {
            this.data.packingListId = newValue.id;
            this.data.invoiceNo = newValue.invoiceNo;
            this.data.order = newValue.buyerAgent;
            this.data.exportEstimationDate = newValue.exportEstimationDate;
        } else {
            this.data.packingListId = 0;
            this.data.invoiceNo = null;
            this.data.order = null;
            this.data.exportEstimationDate = null;
        }
    }

}
