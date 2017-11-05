import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './../service';

@inject(Service, BindingEngine, BindingSignaler)
export class NewShipmentItem {

    packingReceiptOptions = {};
    packingReceiptItemsColumns = ["Macam Barang", "Design", "Satuan", "Kuantiti Satuan", "Panjang Total", "Berat Satuan", "Berat Total"]

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    async activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.context = context.context;
        this.packingReceipt = this.data;


        if (this.data) {
            this.data.packingReceiptId = this.packingReceipt._id;
            this.data.packingReceiptCode = this.packingReceipt.code;
            this.data.storageId = this.packingReceipt.storageId;
            this.data.storageCode = this.packingReceipt.storage.code;
            this.data.storageName = this.packingReceipt.storage.name;
            this.data.referenceNo = this.packingReceipt.referenceNo;
            this.data.referenceType = this.packingReceipt.referenceType;
            this.data.packingReceiptItems = this.packingReceipt.items;

            //find products and inventory
            if (this.data.packingReceiptItems.length > 0) {
                this.productNames = this.data.packingReceiptItems.map((packingReceiptItem) => {
                    return packingReceiptItem.product;
                })

                var filter = {
                    "name": {
                        "$in": productNames
                    }
                }

                var info = { filter: JSON.stringify(filter) };
                var products = await this.findProducts(info);
                this.packingReceiptOptions.products = this.products;

                var productIds = products.length > 0 ? products.map((product) => product._id) : null;

                // var inventories = await this.
            }
        }
    }


}