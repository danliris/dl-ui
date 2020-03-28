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
              filter: JSON.stringify({UnitId: this.data.UnitFrom.Id, ExpenditureType:"SISA"})
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


    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if (this.data && this.data.Id) {
            this.selectedExpenditureGood = {
                ExpenditureGoodNo: this.data.ExpenditureGoodNo
            };
            this.data.ComodityName = this.data.Comodity.Name;
            this.data.BuyerName = this.data.Buyer.Name;
            for (const item of this.data.Items) {
                item.SizeName = item.Size.Name;
                item.UomUnit = item.Uom.Unit;
            }
        }
    }

    selectedExpenditureGoodChanged(newValue) {
        if (this.data.Id) return;

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
                    }
                });
        }
    }
}
