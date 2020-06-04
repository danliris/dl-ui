import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');

export class CartItem {
    sppColumns = [];
    sppOptions = {};
    
    isShowing = false;
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.destinationArea = this.contextOptions.destinationArea;
        this.isEdit = this.contextOptions.isEdit;
        this.sppOptions.destinationArea = this.destinationArea;

        if (this.data.balance && !this.data.previousBalance) {
            this.data.previousBalance = this.data.balance;
        }

        if (this.destinationArea === "TRANSIT") {
            this.sppColumns = ["Keterangan Transit", "Grade", "Qty Keluar"];
        } else {
            this.sppColumns = ["Grade", "Qty Keluar"];
        }

        if (this.destinationArea == "TRANSIT") {
            this.data.status = "NOT OK";
        } else if (this.destinationArea == "GUDANG AVAL") {
            this.data.status = "OK";
        } else {
            this.data.status = "OK";
        }


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

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    addSPPDetailCallback = (e) => {
        this.data.productionOrderDetails = this.data.productionOrderDetails || [];
        this.data.productionOrderDetails.push({
            
        });
    };
}