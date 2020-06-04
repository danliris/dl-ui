import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";

const UnitLoader = require('../../../../../../loader/garment-units-loader');
var StockLoader = require('../../../../../../loader/garment-leftover-warehouse-stock-loader');


@inject(Service)
export class items {
    @bindable selectedUnit;
    @bindable selectedStock;

    

    get unitLoader() {
        return UnitLoader;
    }

    
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get stockLoader() {
        return StockLoader;
    }
    
    roView = (stock) => {
        return `${stock.RONo}`
    }

    @computedFrom("data.Unit")
    get filter() {
        var filter={
            ReferenceType:"FINISHED_GOOD",
            UnitId: (this.data.Unit || {}).Id || 0,
            "Quantity>0": true
        };
        for(var item of this.context.context.items){
            filter[`RONo == "${item.data.RONo}"`]=false;
        }
        return filter;
    }
    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if(this.data){
            this.selectedUnit = this.data.Unit;
            this.selectedStock = {RONo : this.data.RONo || "" };
        }
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };
        if(this.data.Id){
            var stock= await this.service.getStock({ size: 1, filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id, ReferenceType:"FINISHED_GOOD" }) });
            if(!this.error)
                this.data.StockQuantity=stock.data[0].Quantity+ this.data.ExpenditureQuantity;
        }
    }

    selectedStockChanged(newValue){
        this.data.StockId=0;
        this.data.RONo="";
        this.data.StockQuantity=0;
        if(newValue){
            this.data.StockId=newValue.Id;
            this.data.RONo=newValue.RONo;
            this.data.StockQuantity=newValue.Quantity;
            const existingItem = (this.context.context.options.existingItems || []).find(i => i.StockId == this.data.StockId) || { Quantity: 0 };
            
            this.data.StockQuantity += existingItem.Quantity;
        }
    }

    selectedUnitChanged(newValue){
        this.data.StockId=0;
        this.data.RONo="";
        this.data.StockQuantity=0;
        this.selectedStock=null;
        if(newValue)
            this.data.Unit=newValue;
        else{
            this.data.StockId=0;
            this.data.RONo="";
            this.data.StockQuantity=0;
            this.data.Unit=null;
            this.selectedStock=null;
        }
    }
}