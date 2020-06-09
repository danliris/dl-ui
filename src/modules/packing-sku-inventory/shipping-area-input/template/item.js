import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/pre-input-shipping-production-order-loader');
var DOSalesLoader = require('../../../../loader/do-sales-loader');
export class CartItem {
    @bindable product;

    sppQuery = {};
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.dyeingPrintingAreaInputId = this.contextOptions.dyeingPrintingAreaInputId;
        this.isEdit = this.contextOptions.isEdit;

        this.sppQuery.dyeingPrintingAreaInputId = this.dyeingPrintingAreaInputId;
        
    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get doSalesLoader() {
        return DOSalesLoader;
    }

    // @bindable selectedProductionOrder;
    // selectedProductionOrderChanged(newValue, oldValue) {
    //     if (this.selectedProductionOrder && this.selectedProductionOrder.Id) {
    //         this.data.productionOrder = {};
    //         this.data.productionOrder.id = this.selectedProductionOrder.Id;
    //         this.data.productionOrder.no = this.selectedProductionOrder.OrderNo;
    //         this.data.productionOrder.type = this.selectedProductionOrder.OrderType.Name;
    //         this.data.balance = this.selectedProductionOrder.OrderQuantity;
    //         if (this.selectedProductionOrder.Construction) {
    //             this.data.construction = this.selectedProductionOrder.Construction;
    //         } else {
    //             this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth}`
    //         }
    //         this.data.buyer = this.selectedProductionOrder.Buyer.Name;
    //         this.data.packingInstruction = this.selectedProductionOrder.PackingInstruction;
    //         this.data.color = this.selectedProductionOrder.Details[0].ColorRequest;
    //         this.data.motif = this.selectedProductionOrder.DesignCode;
    //         this.data.uomUnit = this.selectedProductionOrder.Uom.Unit;
    //         this.data.balance = this.selectedProductionOrder.OrderQuantity;
    //         if (this.selectedProductionOrder.OrderNo.charAt(0) === 'P') {
    //             this.data.unit = "PRINTING"
    //         } else {
    //             this.data.unit = "DYEING"
    //         }
    //     }
    //     else {
    //         this.data.productionOrder = {};
    //     }
    // }

    // @bindable selectedDOSales;
    // selectedDOSalesChanged(n, o) {
    //     if (this.selectedDOSales) {
    //         this.data.deliveryOrderSales = {};
    //         this.data.deliveryOrderSales.id = this.selectedDOSales.Id;
    //         this.data.deliveryOrderSales.no = this.selectedDOSales.DOSalesNo;
    //     }
    // }
}