import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../utils/rest-service'; 

const serviceUri = 'purchase-oders/reports/categories';

export class Service extends RestService {
 
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing");
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

}
