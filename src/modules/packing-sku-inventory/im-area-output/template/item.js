import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');

export class CartItem {
    @bindable product;
    isAval = false;
    isTransit = false;
    remarks = [];
    avalItems = [];
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.destinationArea = this.contextOptions.destinationArea;
        this.isEdit = this.contextOptions.isEdit;
        this.isShowing = false;

        
        
    }

    bind() {
        if (this.data.balance) {
            this.data.previousBalance = this.data.balance;
        }
        if (this.destinationArea == "TRANSIT") {
            this.remarks = ["Acc Buyer", "Keputusan Prod", "Perbaikan", "Colet"];
            this.data.status = "NOT OK";
            this.remarksGrade = [
                "A", "B", "C", "BS", "Aval 1"
            ];
            this.isTransit = true;
            this.isAval = false;
            // if (this.data.isChecked)
            //     this.data.balance = this.data.initLength;
        } else if (this.destinationArea == "GUDANG AVAL") {
            this.remarks = [
                "Aval 2"
            ];
            this.data.status = "OK";

            // if (this.data.isChecked)
            //     this.data.balance = this.data.avalALength + this.data.avalBLength + this.data.avalConnectionLength;
            this.isTransit = false;
            this.isAval = true;
            this.avalColumns = ["Jenis Aval", "Panjang"];
            this.data.avalItems = [];
            var avalAItem = {
                type: "Aval A",
                length: this.data.avalALength
            };
            this.data.avalItems.push(avalAItem);
            var avalBItem = {
                type: "Aval B",
                length: this.data.avalBLength
            };
            this.data.avalItems.push(avalBItem);
            var avalConnectionItem = {
                type: "Aval Sambungan",
                length: this.data.avalConnectionLength
            };
            this.data.avalItems.push(avalConnectionItem);


            // if (this.data.isChecked)
            //     this.data.balance = this.data.initLength;
        } else {
            this.remarks = [
                "A", "B", "C", "BS", "Aval 1"
            ];
            this.data.status = "OK";
            this.isTransit = false;
            this.isAval = false;
        }
        if (this.data.productionOrder && this.data.productionOrder.id) {
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.Id = this.data.productionOrder.id;
            this.selectedProductionOrder.OrderNo = this.data.productionOrder.no;
            this.selectedProductionOrder.OrderType = {};
            this.selectedProductionOrder.OrderType.Name = this.data.productionOrder.type;
            this.selectedProductionOrder.OrderQuantity = this.data.productionOrder.orderQuantity;
            this.selectedProductionOrder.Construction = this.data.construction;
            this.selectedProductionOrder.Buyer = {};
            this.selectedProductionOrder.Buyer.Name = this.data.buyer;
            this.selectedProductionOrder.PackingInstruction = this.data.packingInstruction;
            this.selectedProductionOrder.Details = [];
            this.selectedProductionOrder.Details.push({});
            this.selectedProductionOrder.Details[0].ColorRequest = this.data.color;
            this.selectedProductionOrder.DesignCode = this.data.motif;
            this.selectedProductionOrder.Uom = {};
            this.selectedProductionOrder.Uom.Unit = this.data.uomUnit;
            if (this.selectedProductionOrder.OrderNo.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }
        }
    }
    get totalBalance() {
        if (this.isAval) {
            if (!this.isEdit){

                this.data.balance = this.data.avalItems.reduce((a, b) => +a + +b.length, 0);
                this.totalBalanceAval = this.data.avalItems.reduce((a, b) => +a + +b.length, 0);;
            }

            this.totalBalanceAval = this.data.avalItems.reduce((a, b) => +a + +b.length, 0);
            
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

    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder.Id) {
            this.data.productionOrder = {};
            this.data.productionOrder.id = this.selectedProductionOrder.Id;
            this.data.productionOrder.no = this.selectedProductionOrder.OrderNo;
            this.data.productionOrder.type = this.selectedProductionOrder.OrderType.Name;
            this.data.productionOrder.orderQuantity = this.selectedProductionOrder.OrderQuantity;
            if (this.selectedProductionOrder.Construction) {
                this.data.construction = this.selectedProductionOrder.Construction;
            } else {
                this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth}`
            }
            this.data.buyer = this.selectedProductionOrder.Buyer.Name;
            this.data.packingInstruction = this.selectedProductionOrder.PackingInstruction;
            this.data.color = this.selectedProductionOrder.Details[0].ColorRequest;
            this.data.motif = this.selectedProductionOrder.DesignCode;
            this.data.uomUnit = this.selectedProductionOrder.Uom.Unit;
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