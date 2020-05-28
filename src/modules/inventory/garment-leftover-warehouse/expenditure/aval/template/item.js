import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";

const UnitLoader = require('../../../../../../loader/garment-units-loader');
var ReceiptAvalLoader = require('../../../../../../loader/garment-leftover-warehouse-aval-receipt-loader');
var StockLoader = require('../../../../../../loader/garment-leftover-warehouse-stock-loader');

@inject(Service)
export class items {
    @bindable selectedUnit;
    @bindable selectedStock;
    @bindable selectedAval;

    get unitLoader() {
        return UnitLoader;
    }

    
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get avalLoader() {
        return ReceiptAvalLoader;
    }
    
    avalView = (aval) => {
        return `${aval.AvalReceiptNo}`
    }

    get stockLoader() {
        return StockLoader;
    }
    
    roView = (stock) => {
        return `${stock.RONo}`
    }


    @computedFrom("data.Unit")
    get filterFabric() {
        var filter={
            AvalType:this.data.type,
            UnitFromId: (this.data.Unit || {}).Id || 0,
            IsUsed:false
        };
        for(var item of this.context.context.items){
            filter[`AvalReceiptNo == "${item.data.AvalReceiptNo}"`]=false;
        }
        return filter;
    }
    get filterAcc() {
        return {
            ReferenceType:"AVAL_ACCECORIES",
            UnitId: (this.data.Unit || {}).Id || 0,
            "Quantity>0": true
        };
    }
    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.isFabric=this.data.type==="AVAL FABRIC";
        if(this.data){
            this.selectedUnit = this.data.Unit;
            this.selectedStock = {RONo : this.data.RONo || "" };
            this.selectedAval = {AvalReceiptNo : this.data.AvalReceiptNo || "" };
        }
        if(this.isFabric){
            this.uom="KG";
        }
        if(this.data.Id && !this.isFabric){
            var stock= await this.service.getStock({ size: 1, filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id, ReferenceType:"FINISHED_GOOD" }) });
        
            this.data.StockQuantity=stock.data[0].Quantity+ this.data.ExpenditureQuantity;
        }
        
    }

    selectedAvalChanged(newValue){
        this.data.AvalReceiptId=0;
        this.data.AvalReceiptNo="";
        this.data.Quantity=0;
        if(newValue){
            this.data.AvalReceiptId=newValue.Id;
            this.data.AvalReceiptNo=newValue.AvalReceiptNo;
            this.data.Quantity=newValue.TotalAval;
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
        }
    }

    selectedUnitChanged(newValue){
        this.data.StockId=0;
        this.data.RONo="";
        this.data.StockQuantity=0;
        this.selectedStock=null;
        this.data.AvalReceiptId=0;
        this.data.AvalReceiptNo="";
        this.data.Quantity=0;
        if(newValue)
            this.data.Unit=newValue;
        else{
            this.data.StockId=0;
            this.data.RONo="";
            this.data.StockQuantity=0;
            this.data.Unit=null;
            this.selectedStock=null;
            this.selectedAval=null;
            this.data.AvalReceiptId=0;
            this.data.AvalReceiptNo="";
            this.data.Quantity=0;
        }
    }
}