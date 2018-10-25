import { inject, Lazy } from 'aurelia-framework';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'creditor-account/report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    search(info) {
        console.log(info);
        let endpoint = `${serviceUri}`;
        // let endpoint = `${serviceUri}?bankId=${info.bankId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.list(endpoint, info);
    }

    getXls(info) {
        let endpoint = `${serviceUri}/download?bankId=${info.bankId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}