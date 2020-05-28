import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { GarmentPurchasingService } from "./service";

const UnitLoader = require('../../../../../loader/garment-units-loader');
const BuyerLoader = require('../../../../../loader/garment-leftover-warehouse-buyer-loader');

@inject(GarmentPurchasingService)
export class DataForm {

    constructor(garmentPurchasingService) {
        this.garmentPurchasingService = garmentPurchasingService;
    }

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable selectedUnit;
    @bindable selectedBuyer;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    @computedFrom("readOnly")
    get items() {
        return {
            columns: this.readOnly ? [
                "Unit",
                "PO No",
                "Satuan",
                "Jumlah Keluar"
            ] : [
                "Unit",
                "PO No",
                "Satuan",
                "Jumlah Stock",
                "Jumlah Keluar"
            ],
            onAdd: function () {
                this.data.Items.push({});
            }.bind(this),
            options: {
                isEdit: this.isEdit,
                existingItems: this.existingItems
            }
        };
    };

    expenditureDestinations = [
        "UNIT",
        "JUAL LOKAL",
        "SAMPLE",
        "LAIN-LAIN"
    ];

    get unitLoader() {
        return UnitLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    unitView = (data) => {
        return `${data.Code} - ${data.Name}`;
    }

    buyerView = (data) => {
        return `${data.Code} - ${data.Name}`;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if (this.data && this.data.Id) {
            this.selectedUnit = {
                Code: this.data.UnitExpenditure.Code,
                Name: this.data.UnitExpenditure.Name
            };

            this.existingItems = this.data.Items.map(i => {
                return {
                    StockId: i.StockId,
                    Quantity: i.Quantity
                };
            });
        }

        // if (this.readOnly) {
        //     this.items.columns = [
        //         "Unit",
        //         "PO No",
        //         "Jumlah Keluar",
        //         "Satuan"
        //     ];
        // }
    }

    expenditureDestinationsChanged() {
        this.context.selectedUnitViewModel.editorValue = "";
        this.selectedUnit = null;
        this.context.selectedBuyerViewModel.editorValue = "";
        this.selectedBuyer = null;
        this.data.RemarkEtc = null;
    }

    selectedUnitChanged(newValue) {
        if (this.data.Id) return;

        this.data.UnitExpenditure = newValue;
    }

    selectedBuyerChanged(newValue) {
        if (this.data.Id) return;

        this.data.Buyer = newValue;
    }

}
