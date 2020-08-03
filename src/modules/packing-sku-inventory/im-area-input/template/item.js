import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');

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
            this.selectedProductionOrder.Id = this.data.productionOrder.id;
            this.selectedProductionOrder.OrderNo = this.data.productionOrder.no;

            this.selectedProductionOrder.OrderType = {};
            this.selectedProductionOrder.OrderType.Name = this.data.productionOrder.type;
            this.selectedProductionOrder.Construction = this.data.construction;

            this.selectedProductionOrder.Material = {};
            this.selectedProductionOrder.Material.Id = this.data.material.id;
            this.selectedProductionOrder.Material.Name = this.data.material.name;

            this.selectedProductionOrder.MaterialConstruction = {};
            this.selectedProductionOrder.MaterialConstruction.Id = this.data.materialConstruction.id;
            this.selectedProductionOrder.MaterialConstruction.Name = this.data.materialConstruction.name;

            this.selectedProductionOrder.MaterialWidth = this.data.materialWidth;

            this.selectedProductionOrder.Buyer = {};
            this.selectedProductionOrder.Buyer.Id = this.data.buyerId;
            this.selectedProductionOrder.Buyer.Name = this.data.buyer;

            this.selectedProductionOrder.PackingInstruction = this.data.packingInstruction;

            this.selectedProductionOrder.Details = [];
            this.selectedProductionOrder.Details.push({});
            this.selectedProductionOrder.Details[0].ColorRequest = this.data.color;

            this.selectedProductionOrder.DesignCode = this.data.motif;

            this.selectedProductionOrder.Uom = {};
            this.selectedProductionOrder.Uom.Unit = this.data.uomUnit;

            this.selectedProductionOrder.OrderQuantity = this.data.productionOrder.orderQuantity;

            this.selectedProductionOrder.ProcessType = {};
            this.selectedProductionOrder.ProcessType.Id = this.data.processType.id;
            this.selectedProductionOrder.ProcessType.Name = this.data.processType.name;
            
            this.selectedProductionOrder.YarnMaterial = {};
            this.selectedProductionOrder.YarnMaterial.Id = this.data.yarnMaterial.id;
            this.selectedProductionOrder.YarnMaterial.Name = this.data.yarnMaterial.name;

            if (this.selectedProductionOrder.OrderNo.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }
        }
    }


    controlOptions = {
        control: {
            length: 12
        }
    };

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder.Id) {
            this.data.productionOrder = {};
            this.data.productionOrder.id = this.selectedProductionOrder.Id;
            this.data.productionOrder.no = this.selectedProductionOrder.OrderNo;
            this.data.productionOrder.type = this.selectedProductionOrder.OrderType.Name;

            if (this.selectedProductionOrder.Construction) {
                this.data.construction = this.selectedProductionOrder.Construction;
            } else {
                this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth}`
            }
            this.data.material = {};
            this.data.material.id = this.selectedProductionOrder.Material.Id;
            this.data.material.name = this.selectedProductionOrder.Material.Name;

            this.data.materialConstruction = {};
            this.data.materialConstruction.id = this.selectedProductionOrder.MaterialConstruction.Id;
            this.data.materialConstruction.name = this.selectedProductionOrder.MaterialConstruction.Name;

            this.data.materialWidth = this.selectedProductionOrder.MaterialWidth;

            this.data.buyerId = this.selectedProductionOrder.Buyer.Id;
            this.data.buyer = this.selectedProductionOrder.Buyer.Name;
            this.data.packingInstruction = this.selectedProductionOrder.PackingInstruction;
            this.data.color = this.selectedProductionOrder.Details[0].ColorRequest;
            this.data.motif = this.selectedProductionOrder.DesignCode;
            this.data.uomUnit = this.selectedProductionOrder.Uom.Unit;
            this.data.productionOrder.orderQuantity = this.selectedProductionOrder.OrderQuantity;
            this.data.balance = this.selectedProductionOrder.OrderQuantity;

            this.data.processType = {};
            this.data.processType.id = this.selectedProductionOrder.ProcessType.Id;
            this.data.processType.name = this.selectedProductionOrder.ProcessType.Name;

            this.data.yarnMaterial = {};
            this.data.yarnMaterial.id = this.selectedProductionOrder.YarnMaterial.Id;
            this.data.yarnMaterial.name = this.selectedProductionOrder.YarnMaterial.Name;

            if (this.selectedProductionOrder.OrderNo.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }
        }
        else {
            this.data.productionOrder = {};
        }
    }
}