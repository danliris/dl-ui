import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../../rest-service';
import {SecureService} from '../../../../../../utils/secure-service';

const serviceUri = require('../../../../../../host').production + '/v1/spinning/winding/reports/winding-quality-samplings';

export class Service extends SecureService {

    constructor(http, aggregator) {
        super(http, aggregator);
    }

    getByDate(sdate, edate) {
        if(sdate && edate)
            var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
        else if(sdate && !edate)
            var endpoint = `${serviceUri}?dateFrom=${sdate}`;
        else if(!sdate && edate)
            var endpoint = `${serviceUri}?dateTo=${edate}`;
        else
            var endpoint = `${serviceUri}`;
        return super.get(endpoint);
    }

    generateExcel(sdate, edate) {
        if(sdate && edate)
            var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
        else if(sdate && !edate)
            var endpoint = `${serviceUri}?dateFrom=${sdate}`;
        else if(!sdate && edate)
            var endpoint = `${serviceUri}?dateTo=${edate}`;
        else
            var endpoint = `${serviceUri}`;
        return super.getXls(endpoint);
    }
}