import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const uriPurchasingToVerification = 'expedition/purchasing-to-verification';
const uriPurchasingDocumentExpedition = 'expedition/purchasing-document-expeditions';
const uriUPO = 'unit-payment-orders';
const uriPOE = 'purchase-orders-externals';

class PurchasingService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing');
    }
    
    searchPOE(info) {
        let endpoint = `${uriPOE}`;
        return super.list(endpoint, info);
    }
}

class PurchasingAzureService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }
    
    search(info) {
        let endpoint = `${uriPurchasingDocumentExpedition}`;
        return super.list(endpoint, info);
    }

    create(data) {
        let endpoint = `${uriPurchasingToVerification}`;
        return super.post(endpoint, data);
    }

    delete(data) {
        let endpoint = `${uriPurchasingDocumentExpedition}/${data.Id}`;
        return super.delete(endpoint, data);
    }
}

export {
    PurchasingService,
    PurchasingAzureService,
};
