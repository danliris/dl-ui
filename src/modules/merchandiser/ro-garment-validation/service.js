
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "merchandiser/ro-garment-validations";
const costCalculationGarmentServiceUri = "cost-calculation-garments";

class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    getCostCalculationGarmentById(id) {
        var endpoint = `${costCalculationGarmentServiceUri}/ro-garment-validation/${id}`;
        return super.get(endpoint);
    }
}

const servicePurchaseRequestUri = 'garment-purchase-requests';

class PurchaseRequestService extends RestService {
    constructor(http, aggregator, config) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getProducts(info) {
        var endpoint = `${servicePurchaseRequestUri}/dynamic`;
        return super.list(endpoint, info);
    }
}

export { Service, PurchaseRequestService }