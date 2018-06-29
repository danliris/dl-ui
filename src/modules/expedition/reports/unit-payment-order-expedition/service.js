import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const uriPurchasingDocumentExpeditionReport = 'expedition/purchasing-document-expeditions-report';
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

    search(info) {
        let endpoint = `${uriPurchasingDocumentExpeditionReport}`;
        return super.list(endpoint, info);
    }
}

export {
    Service,
    AzureService,
};