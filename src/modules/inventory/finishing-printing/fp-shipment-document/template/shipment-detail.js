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
                var packingReceipts = await this.service.searchPackingReceipts(info);

                if (packingReceipts.length > 0) {

                    var items = [];
                    for (var packingReceipt of packingReceipts) {
                        var _item = {};
                        _item.packingReceiptId = packingReceipt._id;
                        _item.packingReceiptCode = packingReceipt.code;
                        _item.storageId = packingReceipt.storageId;
                        _item.storageCode = packingReceipt.storage.code;
                        _item.storageName = packingReceipt.storage.name;
                        _item.referenceNo = packingReceipt.referenceNo;
                        _item.referenceType = packingReceipt.referenceType;
                        _item.packingReceiptItems = [];

                        //find products
                        var productNames = packingReceipt.items.map((packingReceiptItem) => packingReceiptItem.product)
                        var productFilter = {
                            "name": {
                                "$in": productNames
                            }
                        }
                        var productInfo = { filter: JSON.stringify(productFilter) };
                        var products = await this.service.searchProducts(productInfo);

                        //find summaries
                        var inventorySummariesFilter = {
                            "productName": {
                                "$in": productNames
                            }
                        }
                        var inventorySummariesInfo = { filter: JSON.stringify(inventorySummariesFilter) };
                        var inventorySummaries = await this.service.searchInventorySummaries(inventorySummariesInfo);

                        for (var packingReceiptItem of packingReceipt.items) {
                            var _packingReceiptItem = {};
                            var product = products.find((product) => packingReceiptItem.product.toString().toLowerCase() === product.name.toString().toLowerCase());
                            var summary = inventorySummaries.find((inventorySummary) => inventorySummary.productName.toString().toLowerCase() === product.name.toString().toLowerCase());

                            if (product && summary && summary.quantity > 0) {
                                _packingReceiptItem.productId = product._id;
                                _packingReceiptItem.productCode = product.code;
                                _packingReceiptItem.productName = product.name;
                                _packingReceiptItem.designCode = product.properties.designCode;
                                _packingReceiptItem.designNumber = product.properties.designNumber;
                                _packingReceiptItem.colorType = packingReceipt.colorName;
                                _packingReceiptItem.uomId = summary.uomId;
                                _packingReceiptItem.uomUnit = summary.uom;
                                _packingReceiptItem.quantity = summary.quantity;
                                _packingReceiptItem.length = product.properties.length;
                                _packingReceiptItem.weight = product.properties.weight;

                                _item.packingReceiptItems.push(_packingReceiptItem);
                            }
                        }
                        items.push(_item);
                    }
                    this.data.items = items;
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
        }
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    removeItems() {
        this.bind();
    }
}