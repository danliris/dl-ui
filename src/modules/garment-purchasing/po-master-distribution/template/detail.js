import { inject, bindable, computedFrom } from 'aurelia-framework'
import { CostCalculationService } from '../service';
const CostCalculationGarmentLoader = require('../../../../loader/cost-calculation-garment-loader');

@inject(CostCalculationService)
export class Detail {
    @bindable selectedCostCalculation;
    @bindable selectedPOSerialNumber;

    costCalculationFilter = {};

    constructor(CostCalculationService) {
        this.costCalculationService = CostCalculationService;
    }

    get costCalculationGarmentLoader() {
        return CostCalculationGarmentLoader;
    }

    @computedFrom("data.Product")
    get dataProduct() {
        return this.data.Product ? this.data.Product.Code : "-";
    }

    @computedFrom("data.Quantity", "data.Conversion")
    get convertedQuantity() {
        return parseFloat((this.data.Quantity * this.data.Conversion).toFixed(2));
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;

        this.readOnly = this.options.readOnly;
        this.isEdit = context.context.options.isEdit && this.data.Id > 0;

        if (this.data.RONo) {
            this.selectedCostCalculation = {
                RO_Number: this.data.RONo
            };
        }

        if (this.data.POSerialNumber) {
            this.selectedPOSerialNumber = this.data.POSerialNumber;
        }

        if (this.data.ParentProduct) {
            this.costCalculationFilter["CostCalculationGarment_Materials.Any(ProductId == \"" + this.data.ParentProduct.Id + "\")"] = true;
            this.costCalculationFilter["IsApprovedPPIC"] = true;
            this.costCalculationFilter["PreSCId"] = this.data.SCId;
        }

    }

    async selectedCostCalculationChanged(newValue) {
        if (newValue) {

            this.data.costCalculation = await this.costCalculationService.read(newValue.Id);
            this.data.CostcalculationId = this.data.costCalculation.Id;
            this.data.RONo = this.data.costCalculation.RO_Number;

            const poSerialNumbers = this.context.context.items
                .filter(i => i.data.POSerialNumber)
                .map(i => i.data.POSerialNumber);

            this.data.listPOSerialNumber = [""].concat(this.data.costCalculation.CostCalculationGarment_Materials
                .filter(m => m.Product.Id == this.data.ParentProduct.Id && poSerialNumbers.indexOf(m.PO_SerialNumber) < 0)
                .map(m => m.PO_SerialNumber));

        } else {

            this.data.listPOSerialNumber = [];
            this.selectedPOSerialNumber = null;

        }
    }

    selectedPOSerialNumberChanged(newValue) {
        if (newValue) {

            const costCalculationMaterial = this.data.costCalculation.CostCalculationGarment_Materials.find(m => m.PO_SerialNumber == newValue);

            this.data.POSerialNumber = costCalculationMaterial.PO_SerialNumber;
            this.data.Product = costCalculationMaterial.Product;
            this.data.QuantityCC = costCalculationMaterial.BudgetQuantity;
            this.data.UomCC = costCalculationMaterial.UOMPrice;

        } else {

            this.data.POSerialNumber = null;
            this.data.Product = null;
            this.data.QuantityCC = 0;
            this.data.UomCC = null;

        }
    }

}