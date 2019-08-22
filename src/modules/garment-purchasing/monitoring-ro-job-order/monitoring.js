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
            this.service.search({costCalculationId: this.selectedROGarment.Id})
                .then(result => {
                    result.data.forEach(d => {
                        [].concat(d.Items).forEach(i => {
                            i.Quantity = (i.DistributionQuantity / i.Conversion).toFixed(2);
                        })
                    })
                    this.tableData = result.data;
                });
        }
    }
}