import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'budget-cashflows';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getBestCase(query) {
        let endpoint = `${serviceUri}/best-case`;
        return super.list(endpoint, query);
    }

    getWorstCase(query) {
        let endpoint = `${serviceUri}/worst-case`;
        return super.list(endpoint, query);
    }

    upsertWorstCase(form) {
        let endpoint = `${serviceUri}/worst-case`;
        return super.put(endpoint, form);
    }
}