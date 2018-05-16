import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const uriPurchasingToVerification = 'expedition/purchasing-to-verification';
const uriUPO = 'unit-payment-orders-expedition-report';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing');
    }
    
    search(info) {
        let endpoint = `${uriUPO}`;
        return super.list(endpoint, info);
    }
}

class AzureService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    create(data) {
        let endpoint = `${uriPurchasingToVerification}`;
        return super.post(endpoint, data);
    }
}

export {
    Service,
    AzureService,
};
