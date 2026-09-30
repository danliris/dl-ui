import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
//const UnitLoader = require('../../../../../../loader/garment-units-loader');
const UnitLoader = require('../../../../../../loader/garment-unitsAndsample-loader');
const StockLoader = require('../../../../../../loader/garment-leftover-warehouse-stock-distinct-loader');
import { Service } from '../service';

@inject(Service)
export class Item {
    @bindable selectedUnit;
    @bindable selectedStock;
    @bindable selectedUom;
    @bindable unitFrom;
    @bindable destination;
    @bindable NotUnit;

    constructor(service) {
        this.service = service;
    }
    
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;

        this.isEdit = context.context.options.isEdit && this.data.Id > 0;
        this.NotUnit = context.context.options.isNotUnit;

        if (this.data.Unit) {
            this.selectedUnit = this.data.Unit;
        }

        if (this.data.PONo) {
            this.selectedStock = {
                PONo: this.data.PONo
            };
        }

        if (this.data.Stocks) {
            this.uomItems = [""].concat(this.data.Stocks.map(d => (d.Uom || {}).Unit));
        }

        if (this.data.Uom) {
            this.selectedUom = (this.data.Uom || {}).Unit || "";
        } else {
            this.selectedUom = "";
        }
    }
    selectedPO = (data) => {
      return `${data.PONo}`
    }

    uomItems = [""];
    destination = [
      { Id: 123, Code: "GMT", Name: "GARMENT" },
      { Id: 107, Code: "SMP1", Name: "SAMPLE" }
    ];
    unitFrom = [
      { Id: 123, Code: "GMT", Name: "GARMENT" },
      { Id: 107, Code: "SMP1", Name: "SAMPLE" },
      { Id: 0, Code: "SBC", Name: "TERIMA SUBCON" }
    ];

    get unitLoader() {
        return UnitLoader;
    }

    get stockLoader() {
        return StockLoader;
    }

    get stockLoaderSelect() {
        return ["PONo","Id"];
    }

    @computedFrom("data.Unit")
    get stockLoaderFilter() {
        return {
            ReferenceType: "FABRIC",
            UnitId: (this.data.Unit || {}).Id || 0,
            "Quantity > 0": true
        };
    }


    @computedFrom('NotUnit', 'unitFrom', 'destination')
    get unitOptions() {
        if (this.NotUnit === 'JUAL LOKAL' || this.NotUnit === 'EXPORT' || this.NotUnit === 'LAIN-LAIN') {
            return this.unitFrom;
        }
        return this.destination;
    }
    
    // selectedUnitChanged(newValue) {
    //     this.data.Unit = newValue;
    //     this.selectedStockViewModel.editorValue = "";
    //     this.selectedStock = null;
    // }
    selectedUnitChanged(newValue, oldValue) {
        if (newValue && (!oldValue || newValue.Id !== oldValue.Id)) {
            this.data.Unit = newValue;
            
            this.selectedStockViewModel.editorValue = "";
            this.selectedStock = null;

            this.data.PONo = null;
            this.data.Stocks = null;
            this.uomItems = [""]; 
            this.selectedUom = null;
        }
    }

    selectedStockChanged(newValue, oldValue) {
        this.data.PONo = null;
        this.data.Stocks = null;
        this.uomItems = [""];
        this.selectedUom = null;

        if (newValue) {
            this.data.PONo = newValue.PONo;

            this.service.searchStock({ filter: JSON.stringify({ Id: newValue.Id, PONo: this.data.PONo || "-" , UnitId:this.data.Unit.Id}) })
                .then(result => {
                    if (result.statusCode == 200) {
                        const uomUnits = this.context.context.items.filter(i => (i.data.Unit || {}).Id == this.data.Unit.Id && i.data.PONo == this.data.PONo && i.data.Uom != null).map(i => i.data.Uom.Unit);

                        this.data.Stocks = result.data.filter(d => uomUnits.findIndex(u => u == (d.Uom || {}).Unit) < 0);
                        this.data.Product = result.data.map(x => x.Product).find(product => product);
                        // this.uomItems = [""].concat(this.data.Stocks.map(d => (d.Uom || {}).Unit));
                        this.selectedUom = this.data.Stocks.map(d => (d.Uom || {}).Unit);
                      }
                });
        }
    }

    selectedUomChanged(newValue) {
        if (newValue) {
            this.data.Stock = this.data.Stocks.find(d => d.Uom.Unit == newValue);
            
            if (this.data.Stock) {
                const existingItem = (this.context.context.options.existingItems || []).find(i => i.StockId == this.data.Stock.Id) || { Quantity: 0 };
                this.data.Stock.Quantity += existingItem.Quantity;

                this.data.StockId = this.data.Stock.Id;
                this.data.Quantity = this.data.Stock.Quantity;
                this.data.Uom = this.data.Stock.Uom;
                this.data.BasicPrice=this.data.Stock.BasicPrice;
            }
        } else {
            this.data.Stock = null;
            this.data.StockId = 0;
            this.data.Quantity = 0;
            this.data.Uom = null;
        }
    }
}
