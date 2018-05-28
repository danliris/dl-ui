import { Router } from "aurelia-router";
import { inject, bindable, computedFrom, BindingEngine } from "aurelia-framework";

var SizeRangeLoader  = require('../../../loader/size-range-loader');


@inject(Router, BindingEngine)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable disabled = "true";
    @bindable OLCheck;
    @bindable OTL1Check;
    @bindable OTL2Check;
    @bindable OTL3Check;
    @bindable Quantity;
    @bindable data = {};
    @bindable error = {};
    @bindable SelectedRounding;

    defaultRate = { Id: 0, Value: 0, CalculatedValue: 0 };
    length0 = {
      label: {
        align: "left"
      }
    }
    length4 = {
      label: {
        align: "left",
        length: 4
      }
    }
    length6 = {
      label: {
        align: "left",
        length: 6
      }
    }
    length8 = {
      label: {
        align: "left",
        length: 8
      }
    }

    costCalculationGarment_MaterialsInfo = {
        columns: [
            { header: "Kategori", value: "Category" },
            { header: "Material", value: "Material" },
            { header: "Deskripsi", value: "Description" },
            { header: "Kuantitas", value: "Quantity" },
            { header: "Satuan", value: "SatuanQuantity" },
            { header: "Price", value: "Price" },
            { header: "Satuan", value: "SatuanPrice" },
            { header: "Konversi", value: "Conversion" },
            { header: "Total", value: "Total" },
            { header: "Ongkir (%)", value: "ShippingFeePortion" },
            { header: "Jumlah Ongkir", value: "TotalShippingFee" },
            { header: "Kuantitas Budget", value: "BudgetQuantity" },
        ],
        onAdd: function () {
            this.data.CostCalculationGarment_Materials.push({ QuantityOrder: this.data.Quantity, FabricAllowance: this.data.FabricAllowance, AccessoriesAllowance: this.data.AccessoriesAllowance, Rate: this.data.Rate });
            console.log(this.data.CostCalculationGarment_Materials);
        }.bind(this)
    }
    radio = {
        Dollar: "Dollar",
        Rupiah: "Rupiah"
    }

    constructor(router, bindingEngine) {
        this.router = router;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    get sizeRangeLoader() {
      return SizeRangeLoader;
    }
}
