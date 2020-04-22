import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { GarmentProductionService } from "./service";

const UnitLoader = require('../../../../../loader/garment-units-loader');

@inject(GarmentProductionService)
export class DataForm {

    constructor(garmentProductionService) {
        this.garmentProductionService = garmentProductionService;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedExpenditureGood;
    @bindable selectedUnitFrom;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    itemsColumns = [
        { header: "Size", value: "SizeName" },
        { header: "Jumlah", value: "Quantity" },
        { header: "Satuan", value: "UomUnit" },
        { header: "Keterangan", value: "Remark" }
    ]

    get unitLoader() {
        return UnitLoader;
    }



    get expenditureGoodLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitId: this.data.UnitFrom.Id, ExpenditureType:"SISA", IsReceived:false})
            };
            return this.garmentProductionService.getExpenditureGood(info)
                .then((result) => {
                        return result.data;
                    
                });
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    
    selectedUnitFromChanged(newValue) {
        if (this.data.Id) return;

        this.data.UnitFrom = newValue;

        this.selectedExpenditureGood = null;

    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if (this.data && this.data.Id) {
            this.selectedUnitFrom = {
                Code: this.data.UnitFrom.Code,
                Name: this.data.UnitFrom.Name
            };
            this.selectedExpenditureGood = {
                ExpenditureGoodNo: this.data.ExpenditureGoodNo
            };
            this.data.ComodityName = this.data.Comodity.Name;
            this.data.BuyerName = this.data.Buyer.Name;
            this.data.DataItems=[];
            for (const item of this.data.Items) {
                if(this.data.DataItems.length>0){
                    var duplicate= this.data.DataItems.find(a=>a.Size.Id==item.Size.Id && a.Uom.Id==item.Uom.Id);
                    
                    if(duplicate){
                        var idx= this.data.Items.indexOf(duplicate);
                        duplicate.Quantity+=item.Quantity;
                        this.data.DataItems[idx]=duplicate;
                    }else{
                        item.Size={
                            Id: item.Size.Id,
                            Name: item.Size.Name
                        };
                        item.SizeName=item.Size.Name;
                        item.Quantity=item.Quantity;
                        item.Uom= item.Uom;
                        item.UomUnit= item.Uom.Unit;
                        item.Remark= item.Description;
                        this.data.DataItems.push(item);
                    }
                }
                else{
                    item.Size={
                        Id: item.Size.Id,
                        Name: item.Size.Name
                    };
                    item.SizeName=item.Size.Name;
                    item.Quantity=item.Quantity;
                    item.Uom= item.Uom;
                    item.UomUnit= item.Uom.Unit;
                    item.Remark= item.Description;
                    this.data.DataItems.push(item);
                }
            
                // item.SizeName = item.Size.Name;
                // item.UomUnit = item.Uom.Unit;
            }
        }
    }

    selectedExpenditureGoodChanged(newValue) {
        if (this.data.Id) return;

        this.data.DataItems.splice(0);
        this.data.Items.splice(0);

        if (newValue) {
            this.garmentProductionService.getExpenditureGoodById(newValue.Id)
                .then(exGood => {
                    this.data.ExpenditureGoodId = exGood.Id;
                    this.data.ExpenditureGoodNo = exGood.ExpenditureGoodNo;
                    this.data.RONo = exGood.RONo;
                    this.data.Article = exGood.Article;
                    this.data.Comodity = exGood.Comodity;
                    this.data.ComodityName = exGood.Comodity.Name;
                    this.data.ExpenditureDate = exGood.ExpenditureDate;
                    this.data.ExpenditureDesc = exGood.Description;
                    this.data.Invoice = exGood.Invoice;
                    this.data.Carton = exGood.Carton;
                    this.data.ContractNo = exGood.ContractNo;
                    this.data.Buyer = exGood.Buyer;
                    this.data.BuyerName = exGood.Buyer.Name;
                    //this.data.DataItems=[];
                    for (const item of exGood.Items) {
                        this.data.Items.push({
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

                        if(this.data.DataItems){
                            var duplicate= this.data.DataItems.find(a=>a.Size.Id==item.Size.Id && a.Uom.Id==item.Uom.Id);
                            
                            if(duplicate){
                                var idx= this.data.Items.indexOf(duplicate);
                                duplicate.Quantity+=item.Quantity;
                                this.data.DataItems[idx]=duplicate;
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
                                this.data.DataItems.push(item);
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
                            this.data.DataItems.push(item);
                        }
                    }
                });
        } else {
            this.data.ExpenditureGoodId = null;
            this.data.ExpenditureGoodNo = null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.ComodityName = null;
            this.data.ExpenditureDesc = null;
            this.data.Invoice = null;
            this.data.Carton = null;
            this.data.ContractNo = null;
            this.data.Buyer = null;
            this.data.BuyerName = null;
            delete this.data.ExpenditureDate;
            this.context.ExpenditureGoodViewModel.editorValue = "";
        }
    }
}
