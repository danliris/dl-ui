import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'fact-beacukai-reports';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "customs-report");
    }

    search(info) {
        let endpoint = `${serviceUri}/out`;
        console.log(info)
        return super.list(endpoint, info);
    }

    getXls(info) {
        let endpoint = `${serviceUri}/download?trNo=${info.trNo}&unitId=${info.unitId}&status=${info.status}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}