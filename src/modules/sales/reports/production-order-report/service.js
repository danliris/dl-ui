import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'sales/reports/production-order-report';
const serviceDetailsUri = 'sales/reports/production-order-report/details';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    getReport(info) {
        var endpoint = `${serviceUri}`;
        var query = '';
        return super.list(endpoint, info);
    }

    getDetailReport(salesContractNo) {
        var endpoint = `${serviceDetailsUri}?salesContractNo=${salesContractNo}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}`;
        if (typeof info.filter === "string")
            endpoint = `${serviceUri}?${info.filter}`;
        return super.getXls(endpoint);
    }
}