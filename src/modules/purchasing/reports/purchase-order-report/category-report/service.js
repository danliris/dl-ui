import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../rest-service';
import {SecureService} from '../../../../../utils/secure-service';

const serviceUri = require('../../../../../host').purchasing+ '/v1/purchasing/po/reports/categories';

export class Service extends SecureService {

    constructor(http, aggregator) {
        super(http, aggregator);
    }

    getByDate(sdate, edate) {
        var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
        return super.get(endpoint);
    }

    generateExcel(sdate, edate) {
        var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
        return super.getXls(endpoint);
    }

    getallData() {
        var endpoint = `${serviceUri}`;
        return super.get(endpoint);
    }

    generateExcelnoDate() {
        var endpoint = `${serviceUri}`;
        return super.getXls(endpoint);
    }

    generateExcel(sdate, edate) {
        var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
        return super.getXls(endpoint);
    }
}
