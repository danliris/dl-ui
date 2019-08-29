import { RestService } from '../../../utils/rest-service';

const costCalculationGarmentServiceUri = "cost-calculation-garments";

class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    replace(id, data) {
        var endpoint = `${costCalculationGarmentServiceUri}/${id}`;
        return super.patch(endpoint, data);
    }

    getCostCalculationGarmentById(id) {
        var endpoint = `${costCalculationGarmentServiceUri}/with-product-names/${id}`;
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