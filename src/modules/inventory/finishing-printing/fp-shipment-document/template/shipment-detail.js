import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './../service';
var ProductionOrderLoader = require('../../../../../loader/production-order-loader');

@inject(Service, BindingEngine, BindingSignaler)
export class ShipmentDetail {

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
        this.newShipmentItemsOptions = {};
        this.selectedProductionOrder = this.data.selectedProductionOrder;
        this.selectedBuyerName = this.context.options.selectedBuyerName;
        this.selectedBuyerID = this.context.options.selectedBuyerID;
        this.selectedStorageCode = this.context.options.selectedStorageCode;
        this.isNewStructure = this.context.options.isNewStructure;

        this.SPPQuery = { "$where": "this.buyerId'" == this.selectedBuyerID + "'" };

        if (this.data.productionOrderId) {
            this.selectedProductionOrder = await this.service.getProductionOrderById(this.data.productionOrderId)
        }
    }

    controlOptions = {
        control: {
            length: 12
        }
    }

    productionOrderFields = ["_id", "orderNo", "orderType.name", "designCode", "designNumber", "details.colorType"];

    itemColumns = ["Macam Barang", "Design", "Satuan", "Kuantiti Satuan", "Panjang Total", "Berat Satuan", "Berat Total"];
    newItemColumns = ["Daftar Packing Receipt"];

    @bindable selectedProductionOrder;
    async selectedProductionOrderChanged(newVal, oldVal) {
        if (this.selectedProductionOrder && this.selectedProductionOrder._id) {
            this.data.selectedProductionOrder = this.selectedProductionOrder;
            this.data.productionOrderId = this.selectedProductionOrder._id;
            this.data.productionOrderNo = this.selectedProductionOrder.orderNo;
            this.data.productionOrderType = this.selectedProductionOrder.orderType.name;
            this.data.designCode = this.selectedProductionOrder.designCode;
            this.data.designNumber = this.selectedProductionOrder.designNumber;
            this.data.colorType = this.selectedProductionOrder.details[0].colorType;

            //get packing receipts by buyer and production order number where stock balance is greater than 0
            if (this.selectedBuyerName && this.selectedProductionOrder) {
                var filter = {
                    "buyer": this.selectedBuyerName,
                    "productionOrderNo": this.selectedProductionOrder.orderNo
                }

                var info = { filter: JSON.stringify(filter) };
                this.packingReceipts = await this.service.searchPackingReceipts(info);

                if (this.packingReceipts.length > 0) {
                    this.data.items = this.packingReceipts
                }
            }
        } else {
            this.data.selectedProductionOrder = {};
            this.data.productionOrderId = {};
            this.data.productionOrderNo = "";
            this.data.productionOrderType = "";
            this.data.designCode = "";
            this.data.designNumber = "";
            this.data.colorType = "";
            this.data.items = [];
            this.newShipmentItemsOptions.packingReceipts = "";
        }
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    removeItems() {
        this.bind();
    }
}