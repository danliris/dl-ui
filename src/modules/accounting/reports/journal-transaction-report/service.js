import { inject, Lazy } from 'aurelia-framework';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'journal-transactions/report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getXls(info) {
        var query = `?month=${info.month}&year=${info.year}`;

        let endpoint = `${serviceUri}/downloads/xls${query}`;
        return super.getXls(endpoint);
    }
}