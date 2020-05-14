import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
const UnitLoader = require('../../../../../../loader/garment-units-loader');
const StockLoader = require('../../../../../../loader/garment-leftover-warehouse-stock-loader');

export class Item {
    @bindable selectedUnit;
    @bindable selectedStock;

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;

        this.isEdit = context.context.options.isEdit && this.data.Id > 0;

        if (this.data.Unit) {
            this.selectedUnit = this.data.Unit;
        }

        if (this.data.StockId) {
            this.selectedStock = {
                PONo: this.data.PONo
            };
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    get stockLoader() {
        return StockLoader;
    }

    @computedFrom("data.Unit")
    get stockLoaderFilter() {
        return {
            ReferenceType: "FABRIC",
            UnitId: (this.data.Unit || {}).Id || 0,
            "Quantity > 0": true
        };
    }

    selectedUnitChanged(newValue) {
        this.data.Unit = newValue;
        this.selectedStockViewModel.editorValue = "";
        this.selectedStock = null;
    }

    selectedStockChanged(newValue) {
        this.data.Stock = newValue;

        if (this.data.Stock) {
            this.data.StockId = this.data.Stock.Id;
            this.data.PONo = this.data.Stock.PONo;
            this.data.Quantity = this.data.Stock.Quantity;
            this.data.Uom = this.data.Stock.Uom;
        }
    }
}