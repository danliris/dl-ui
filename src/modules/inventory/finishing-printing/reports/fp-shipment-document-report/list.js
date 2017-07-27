import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

var ShipmentLoader = require("../../../../../loader/shipment-loader");
var BuyerLoader = require("../../../../../loader/buyers-loader");
var ProductionOrderLoader = require("../../../../../loader/production-order-loader");

@inject(Router, Service)
export class List {


    info = {
        code: "",
        productionOrderNo: "",
        dateFrom: "",
        dateTo: "",

    };
    code = {};
    productionOrderNo = {};
    dateFrom = "";
    dateTo = "";

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    @bindable selectedShipmentNumber;
    selectedShipmentNumberChanged(newVal, oldVal) {
        if (this.selectedShipmentNumber && this.selectedShipmentNumber.shipmentNumber) {
            this.filter.shipmentNumber = this.selectedShipmentNumber.shipmentNumber;
        } else {
            this.filter.shipmentNumber = "";
        }
    }

    @bindable selectedDeliveryCode;
    selectedDeliveryCodeChanged(newVal, oldVal) {
        if (this.selectedDeliveryCode && this.selectedDeliveryCode.deliveryCode) {
            this.filter.deliveryCode = this.selectedDeliveryCode.deliveryCode;
        } else {
            this.filter.deliveryCode = "";
        }
    }

    @bindable selectedProductIdentity;
    selectedProductIdentityChanged(newVal, oldVal) {
        if (this.selectedProductIdentity && this.selectedProductIdentity.productIdentity) {
            this.filter.productIdentity = this.selectedProductIdentity.productIdentity;
        } else {
            this.filter.productIdentity = "";
        }
    }

    @bindable selectedBuyer;
    selectedBuyerChanged(newVal, oldVal) {
        if (this.selectedBuyer && this.selectedBuyer._id) {
            this.filter.buyerId = this.selectedBuyer._id;
        } else {
            this.filter.buyerId = null;
        }
    }

    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newVal, oldVal) {
        if (this.selectedProductionOrder && this.selectedProductionOrder._id) {
            this.filter.productionOrderId = this.selectedProductionOrder._id;
        } else {
            this.filter.productionOrderId = null;
        }
    }



    searching() {

        if (this.filter) {
            this.info.shipmentNumber = this.filter.shipmentNumber ? this.filter.shipmentNumber : "";
            this.info.deliveryCode = this.filter.deliveryCode ? this.filter.deliveryCode : "";
            this.info.productIdentity = this.filter.productIdentity ? this.filter.productIdentity : "";
            this.info.buyerId = this.filter.buyerId ? this.filter.buyerId : null;
            this.info.productionOrderId = this.filter.productionOrderId ? this.filter.productionOrderId : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then((result) => {
                var tempData;
                this.no = 0;
                this.newData = [];

                for (var i = 0; i < result.data.length; i++) {
                    for (var j = 0; j < result.data[i].details.length; j++) {
                        for (var k = o; k < result.data[i].details[j].items.length; k++) {

                            tempData = {};
                            this.no += 1;

                            tempData.no = this.no;
                            tempData._createdDate = result.data[i]._createdDate;
                            tempData.code = result.data[i].code;
                            tempData.shipmentNumber = result.data[i].shipmentNumber;
                            tempData.productionOrderNo = result.data[i].details[j].productionOrderNo;
                            tempData.buyer = result.data[i].buyerName;
                            tempData.productName = result.data[i].details[j].items[k].productName;
                            tempData.uomUnit = result.data[i].details[j].items[k].uomUnit;
                            tempData.quantity = result.data[i].details[j].items[k].quantity;
                            tempData.lengthTotal = (result.data[i].details[j].items[k].quantity * result.data[i].details[j].items[k].length).toFixed(2);
                            tempData.weightTotal = (result.data[i].details[j].items[k].quantity * result.data[i].details[j].items[k].weight).toFixed(2);

                            this.newData.push(tempData);

                        }
                    }
                }
            })
    }


    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    ExportToExcel() {
        if (this.filter) {
            this.info.shipmentNumber = this.filter.shipmentNumber ? this.filter.shipmentNumber : "";
            this.info.deliveryCode = this.filter.deliveryCode ? this.filter.deliveryCode : "";
            this.info.productIdentity = this.filter.productIdentity ? this.filter.productIdentity : "";
            this.info.buyerId = this.filter.buyerId ? this.filter.buyerId : null;
            this.info.productionOrderId = this.filter.productionOrderId ? this.filter.productionOrderId : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        }
        else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    shipmentFields = ["_id", "code", "_createdDate", "shipmentNumber", "deliveryCode", "productIdentity"]
    get shipmentLoader() {
        return ShipmentLoader;
    }

    buyerFields = ["_id", "name", "code"]
    get buyerLoader() {
        return BuyerLoader;
    }

    productionOrderFields = ["_id", "orderNo"]
    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    reset() {
        this.filter = {};
        this.data = [];
    }

}