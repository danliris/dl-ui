import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-disposition-expeditions';

const purchasingServiceUri = 'garment-disposition-purchase';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "finance");
    }

    search(info) {
        return super.list(serviceUri, info);
    }

    sendToCashier(id) {
        var endpoint = `${serviceUri}/send-to-cashier/${id}`;
        return super.put(endpoint);
    }

    sendToVerificationRejected(id, reason) {
        var endpoint = `${serviceUri}/send-to-verification-rejected/${id}`;
        let body = { Remark: reason };
        return super.put(endpoint, body);
    }
};

class PurchasingService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getById(id) {
        var endpoint = `${purchasingServiceUri}/${id}`;
        return super.get(endpoint);
    }
}

export { Service, PurchasingService }