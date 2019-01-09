import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'garment-purchase-orders/monitoring';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(args) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, args);
    }

    generateExcel(args) {
        var endpoint = `${serviceUri}/download?unit=${unit}&category=${category}&epoNo=${epoNo}&roNo=${roNo}&prNo=${prNo}&doNo=${doNo}&supplier=${supplier}&staff=${staff}&dateFrom=${dateFrom}&dateTo=${dateTo}&status=${status}`;
        return super.getXls(endpoint);
    }

}
