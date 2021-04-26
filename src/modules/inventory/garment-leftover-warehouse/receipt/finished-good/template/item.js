import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { GarmentProductionService } from "../service";
const LeftoverComodityLoader = require('../../../../../../loader/garment-leftover-comodity-loader');
const ExpenditureGoodLoader = require('../../../../../../loader/garment-expenditure-good-loader');

@inject(GarmentProductionService)
export class Item {
    @bindable selectedComodity;
    @bindable selectedExpenditureGood;

    itemsColumns = [
        { header: "Size", value: "SizeName" },
        { header: "Jumlah", value: "Quantity" },
        { header: "Satuan", value: "UomUnit" },
        { header: "Keterangan", value: "Remark" },
        { header: "Komoditi", value: "ComodityName" }
    ]

    get filter(){
        var filter={
            UnitId: this.data.unitId, 
            ExpenditureType:"SISA", 
            IsReceived:false
        }
        for(var item of this.context.context.items){
            filter[`ExpenditureGoodNo == "${item.data.ExpenditureGoodNo}"`]=false;
        }
        return filter;
    }

    get leftoverComodityLoader() {
        return LeftoverComodityLoader;
    }

    leftoverComodityView = (leftoverComodity) => {
        return `${leftoverComodity.Code} - ${leftoverComodity.Name}`;
    }

    constructor(garmentProductionService) {
        this.garmentProductionService = garmentProductionService;
    }

    get expenditureGoodLoader() {
        return ExpenditureGoodLoader;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;

        this.readOnly = context.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        console.log(context)
        this.itemOptions = {
            isCreate: this.isCreate,
            Id: this.data.Id || 0
        }
        this.selectedExpenditureGood={
            ExpenditureGoodNo:this.data.ExpenditureGoodNo,
            Id:this.data.ExpenditureGoodId
        };
    }

    selectedComodityChanged(newValue){
        if(newValue){
            this.data.LeftoverComodity=newValue;
        }
    }

    selectedExpenditureGoodChanged(newValue,oldValue) {
        if (this.data.Id) return;

        if(this.data.details){
            this.data.details.splice(0);
            this.data.dataDetails.splice(0);
        }
        if (newValue) {
            if(newValue.Id!=oldValue.Id){
                this.garmentProductionService.getExpenditureGoodById(newValue.Id)
                .then(exGood => {
                    this.data.ExpenditureGoodId = exGood.Id;
                    this.data.ExpenditureGoodNo = exGood.ExpenditureGoodNo;
                    this.data.RONo = exGood.RONo;
                    this.data.Article = exGood.Article;
                    this.data.Comodity = exGood.Comodity;
                    this.data.ComodityName = exGood.Comodity.Name;
                    this.data.Buyer = exGood.Buyer;
                    this.data.BuyerName = exGood.Buyer.Name;
                    this.data.details=[];
                    //this.data.DataItems=[];
                    for (const item of exGood.Items) {
                        console.log(item)
                        this.data.details.push({
                            ExpenditureGoodItemId: item.Id,
                            Size: {
                                Id: item.Size.Id,
                                Name: item.Size.Size
                            },
                            SizeName: item.Size.Size,
                            Quantity: item.Quantity,
                            Uom: item.Uom,
                            UomUnit: item.Uom.Unit,
                            Remark: item.Description
                        });

                        if(this.data.dataDetails){
                            var duplicate= this.data.dataDetails.find(a=>a.Size.Id==item.Size.Id && a.Uom.Id==item.Uom.Id);
                            
                            if(duplicate){
                                var idx= this.data.details.indexOf(duplicate);
                                duplicate.Quantity+=item.Quantity;
                                this.data.dataDetails[idx]=duplicate;
                            }else{
                                item.Size={
                                    Id: item.Size.Id,
                                    Name: item.Size.Size
                                };
                                item.SizeName=item.Size.Name;
                                item.Quantity=item.Quantity;
                                item.Uom= item.Uom;
                                item.UomUnit= item.Uom.Unit;
                                item.Remark= item.Description;
                                this.data.dataDetails.push(item);
                            }
                        }
                        else{
                            item.Size={
                                Id: item.Size.Id,
                                Name: item.Size.Size
                            };
                            item.SizeName=item.Size.Name;
                            item.Quantity=item.Quantity;
                            item.Uom= item.Uom;
                            item.UomUnit= item.Uom.Unit;
                            item.Remark= item.Description;
                            this.data.dataDetails.push(item);
                        }
                    }
                });
            }
        } else {
            this.data.ExpenditureGoodId = null;
            this.data.ExpenditureGoodNo = null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.ComodityName = null;
            this.data.Buyer = null;
            this.data.BuyerName = null;
            this.ExpenditureGoodViewModel.editorValue = "";
        }
    }
}