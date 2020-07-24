import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/adj-shipping-spp-loader');

export class CartItem {
    @bindable product;

    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.isEdit = this.contextOptions.isEdit;
        if (this.data.productionOrder && this.data.productionOrder.id) {
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.productionOrder = {};
            this.selectedProductionOrder.productionOrder.id = this.data.productionOrder.id;
            this.selectedProductionOrder.productionOrder.no = this.data.productionOrder.no;
            this.selectedProductionOrder.productionOrder.type = this.data.productionOrder.type;
            this.selectedProductionOrder.construction = this.data.construction;
            this.selectedProductionOrder.material = {};
            this.selectedProductionOrder.material.id = this.data.material.id;
            this.selectedProductionOrder.material.name = this.data.material.name;
            this.selectedProductionOrder.grade = this.data.grade;
            this.selectedProductionOrder.packing = this.data.packing;
            this.selectedProductionOrder.materialConstruction = {};
            this.selectedProductionOrder.materialConstruction.id = this.data.materialConstruction.id;
            this.selectedProductionOrder.materialConstruction.name = this.data.materialConstruction.name;

            this.selectedProductionOrder.materialWidth = this.data.materialWidth;

            this.selectedProductionOrder.buyerId = this.data.buyerId;
            this.selectedProductionOrder.buyer = this.data.buyer;

            this.selectedProductionOrder.color = this.data.color;

            this.selectedProductionOrder.motif = this.data.motif;

            this.selectedProductionOrder.uomUnit = this.data.uomUnit;

            this.selectedProductionOrder.productionOrder.orderQuantity = this.data.productionOrder.orderQuantity;
            this.selectedProductionOrder.unit = this.data.unit;
            this.selectedProductionOrder.packingType = this.data.packingType;
        }
    }

    @bindable balance;
    get totalBalance() {
        this.data.balance = this.data.qtyPacking * this.data.qty;
        this.balance = this.data.balance;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    adjSPPFormatter = (spp) => {
        // if (spp.productionOrder) {
        //     return `${spp.productionOrder.no}`
        // }
        return `${spp.productionOrder.no}`
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder.productionOrder) {
            this.data.productionOrder = {};
            this.data.productionOrder.id = this.selectedProductionOrder.productionOrder.id;
            this.data.productionOrder.no = this.selectedProductionOrder.productionOrder.no;
            this.data.productionOrder.type = this.selectedProductionOrder.productionOrder.type;
            this.data.construction = this.selectedProductionOrder.construction;
            this.data.remark = this.selectedProductionOrder.remark;
            this.data.material = {};
            this.data.material.id = this.selectedProductionOrder.material.id;
            this.data.material.name = this.selectedProductionOrder.material.name;

            this.data.materialConstruction = {};
            this.data.materialConstruction.id = this.selectedProductionOrder.materialConstruction.id;
            this.data.materialConstruction.name = this.selectedProductionOrder.materialConstruction.name;

            this.data.materialWidth = this.selectedProductionOrder.materialWidth;

            this.data.grade = this.selectedProductionOrder.grade;
            this.data.packing = this.selectedProductionOrder.packing;
            this.data.buyerId = this.selectedProductionOrder.buyerId;
            this.data.buyer = this.selectedProductionOrder.buyer;
            this.data.color = this.selectedProductionOrder.color;
            this.data.motif = this.selectedProductionOrder.motif;
            this.data.uomUnit = this.selectedProductionOrder.uomUnit;
            this.data.productionOrder.orderQuantity = this.selectedProductionOrder.productionOrder.orderQuantity;
            this.data.unit = this.selectedProductionOrder.unit;
            this.data.packingType = this.selectedProductionOrder.packingType;
        }
        else {
            this.data.productionOrder = {};
        }
    }
}