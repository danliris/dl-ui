import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";

var ReceiptWasteLoader = require('../../../../../loader/garment-receipt-waste-loader');

@inject(Service)
export class items {
    @bindable selectedBON;


    get wasteLoader() {
        return ReceiptWasteLoader;
    }

    wasteView = (waste) => {
        return `${waste.GarmentReceiptWasteNo}`
    }


    get filterBOM() {
        // console.log('context', this.context);
        var filter = {
            WasteType: this.data.type,
            IsUsed: false
        };
        for (var item of this.context.context.items) {
            filter[`GarmentReceiptWasteNo == "${item.data.GarmentReceiptWasteNo}"`] = false;
        }
        return filter;
    }

    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        //this.isFabric=this.data.type==="AVAL FABRIC";

        if (this.data) {
            this.selectedBON = { GarmentReceiptWasteNo: this.data.GarmentReceiptWasteNo || "" };
        }

        this.data.uom = "KG";
    }

    selectedBONChanged(newValue) {
        this.data.GarmentReceiptWasteId = 0;
        this.data.GarmentReceiptWasteNo = "";
        this.data.Quantity = 0;
        if (newValue) {
            this.data.GarmentReceiptWasteId = newValue.Id;
            this.data.GarmentReceiptWasteNo = newValue.GarmentReceiptWasteNo;
            this.data.Quantity = newValue.TotalAval;
        }
    }
}