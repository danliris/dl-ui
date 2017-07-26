import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from './../service';

@inject(Service, BindingEngine, BindingSignaler)
export class ShipmentDetail {

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.context = context.context;
        this.selectedProductionOrder = this.data.selectedProductionOrder;
        this.selectedBuyerId = this.context.options.selectedBuyerId;
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
        if (this.selectedProductionOrder && this.selectedProductionOrder._id) {
            this.data.selectedProductionOrder = this.selectedProductionOrder;
            this.data.productionOrderId = this.selectedProductionOrder._id;
            this.data.productionOrderNo = this.selectedProductionOrder.orderNo;
            this.data.productionOrderType = this.selectedProductionOrder.orderType.name;
            this.data.designCode = this.selectedProductionOrder.designCode;
            this.data.designNumber = this.selectedProductionOrder.designNumber;
            this.data.colorType = this.selectedProductionOrder.details[0].colorType;
            // if (this.selectedBuyerId && this.selectedProductionOrder) {
            //     this.products = await this.service
            // }
            console.log(this.data);
        } else {
            this.data.selectedProductionOrder = {};
            this.data.productionOrderId = {};
            this.data.productionOrderNo = "";
            this.data.productionOrderType = "";
            this.data.designCode = "";
            this.data.designNumber = "";
            this.data.colorType = "";
        }

        // this.selectedProductionOrder = newVal;
    }

    get productionOrderLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: this.productionOrderFields };
            return this.service.searchProductionOrder(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    async getProducts() {

    }
}