import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'expedition/purchasing-to-verification';
const purchasingDocumentExpeditionUri = 'expedition/purchasing-document-expeditions';
const unitPaymentOrderUri = 'unit-payment-orders';

class PurchasingService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing');
    }
    
    search(info) {
        let endpoint = `${unitPaymentOrderUri}`;
        return super.list(endpoint, info);
    }
}

class PurchasingAzureService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }
    
    search(info) {
        let endpoint = `${purchasingDocumentExpeditionUri}`;
        return super.list(endpoint, info);
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    delete(data) {
        let endpoint = `${purchasingDocumentExpeditionUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }
}

export {
    PurchasingService,
    PurchasingAzureService,
};
