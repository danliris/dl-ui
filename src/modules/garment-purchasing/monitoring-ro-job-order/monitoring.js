import { inject } from 'aurelia-framework'
import { Service } from "./service";
const CostCalculationGarmentLoader = require('../../../loader/cost-calculation-garment-loader');

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 5 },
        control: { length: 2 }
    }

    costCalculationFilter = {
        "IsValidatedROPPIC": true
    }

    get costCalculationGarmentLoader() {
        return CostCalculationGarmentLoader;
    }

    tableData = []

    search() {
        if (this.selectedROGarment) {
            this.service.search({CostCalculationId: this.selectedROGarment.Id})
                .then(result => this.tableData = result.data);
        }
    }
}