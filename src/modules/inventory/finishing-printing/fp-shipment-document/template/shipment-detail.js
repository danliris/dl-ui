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

    @bindable selectedProductionOrder;
    async selectedProductionOrderChanged(newVal, oldVal) {
        // if (this.selectedProductionOrder && this.selectedProductionOrder._id) {
        //     this.data.selectedProductionOrder = this.selectedProductionOrder;
        //     this.data.productionOrderId = this.selectedProductionOrder._id;
        //     this.data.productionOrderNo = this.selectedProductionOrder.orderNo;
        //     this.data.productionOrderType = this.selectedProductionOrder.orderType.name;
        //     this.data.designCode = this.selectedProductionOrder.designCode;
        //     this.data.designNumber = this.selectedProductionOrder.designNumber;
        //     this.data.colorType = this.selectedProductionOrder.details[0].colorType;

        //     //get products by buyer and production order number where stock balance is greater than 0
        //     // if (!this.data.items && this.selectedBuyerName && this.selectedProductionOrder) {
        //     if (this.selectedBuyerName && this.selectedProductionOrder) {
        //         var filter = {
        //             "properties.buyerName": this.selectedBuyerName,
        //             "properties.productionOrderNo": this.selectedProductionOrder.orderNo
        //         }

        //         var info = { filter: JSON.stringify(filter) };
        //         this.productResults = await this.service.searchProducts(info);
        //         this.products = this.productResults && this.productResults.data.length > 0 ? this.productResults.data.map((product) => {
        //             return product;
        //         }) : [];
        //         this.productCodes = this.products.length > 0 ? this.products.map((product) => {
        //             return product.code;
        //         }) : [];
        //         if (this.productCodes.length > 0) {
        //             var filterInventory = {
        //                 "productCode": {
        //                     "$in": this.productCodes
        //                 },
        //                 "quantity": {
        //                     "$gt": 0
        //                 },
        //                 "storageCode": this.selectedStorageCode
        //             }
        //             var infoInventory = { filter: JSON.stringify(filterInventory) };
        //             this.inventoryResults = await this.service.searchInventory(infoInventory);
        //             this.inventoryDatas = this.inventoryResults && this.inventoryResults.data.length > 0 ? this.inventoryResults.data.map((result) => {
        //                 return result;
        //             }) : [];

        //             this.shipmentProducts = [];
        //             if (this.inventoryDatas.length > 0 && this.products.length > 0) {
        //                 for (var inventoryData of this.inventoryDatas) {
        //                     var productResult = this.products.find((product) => inventoryData.productId.toString() === product._id.toString());
        //                     var productObj = {
        //                         productId: productResult._id ? productResult._id : null,
        //                         productCode: productResult.code ? productResult.code : "",
        //                         productName: productResult.name ? productResult.name : "",
        //                         designCode: productResult.properties && productResult.properties.designCode ? productResult.properties.designCode : "",
        //                         designNumber: productResult.properties && productResult.properties.designNumber ? productResult.properties.designNumber : "",
        //                         colorType: productResult.properties && productResult.properties.colorName ? productResult.properties.colorName : "",
        //                         uomId: productResult.uom && productResult.uom._id ? productResult.uom._id : null,
        //                         uomUnit: productResult.uom && productResult.uom.unit ? productResult.uom.unit : "",
        //                         quantity: inventoryData.quantity ? inventoryData.quantity : 0,
        //                         length: productResult.properties && productResult.properties.length ? productResult.properties.length : "",
        //                         weight: productResult.properties && productResult.properties.weight ? productResult.properties.weight : ""
        //                     };
        //                     this.shipmentProducts.push(productObj);
        //                     productObj = {};
        //                 }

        //             }
        //             this.data.items = this.shipmentProducts
        //         }
        //     }
        // } else {
        //     this.data.selectedProductionOrder = {};
        //     this.data.productionOrderId = {};
        //     this.data.productionOrderNo = "";
        //     this.data.productionOrderType = "";
        //     this.data.designCode = "";
        //     this.data.designNumber = "";
        //     this.data.colorType = "";
        //     this.data.items = [];
        // }
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    removeItems() {
        this.bind();
    }
}