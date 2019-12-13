import { RestService } from '../../../utils/rest-service';

const approveServiceUri = "merchandiser/budget-validations/ppic";
const serviceUri = 'cost-calculation-garments';

class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getByIdWithProductNames(id) {
        var endpoint = `${serviceUri}/with-product-names/${id}`;
        return super.get(endpoint);
    }

    replace(id, data) {
        var endpoint = `${serviceUri}/${id}`;
        return super.patch(endpoint, data);
    }

    approve(data) {
        var endpoint = `${approveServiceUri}`;
        return super.post(endpoint, data);
    }
};

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
