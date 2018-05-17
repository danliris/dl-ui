import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'unit-payment-order-verification';
const serviceUriExpedition = 'expedition/purchasing-document-expeditions';
const serviceUriUnitPaymenOrder = 'unit-payment-orders';
const serviceUriPurchaseRequest = 'purchase-requests/by-user';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    search(info) {
        var endpoint = `${serviceUriExpedition}`;
        return super.list(endpoint, info);
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    getById(id) {
        var endpoint = `${serviceUriExpedition}/${id}`;
        return super.get(endpoint);
    }
}

class MongoService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing');
    }

    searchByCode(info) {
        var endpoint = `${serviceUriUnitPaymenOrder}`;
        return super.list(endpoint, info);
    }

    searchPrByCode(info) {
        var endpoint = `${serviceUriPurchaseRequest}`;
        return super.list(endpoint, info);
    }

}

export {
    Service,
    MongoService,
};


