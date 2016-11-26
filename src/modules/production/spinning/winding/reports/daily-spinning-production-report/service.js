import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../../rest-service';
import {SecureService} from '../../../../../../utils/secure-service';

const serviceUri = require('../../../../../../host').production + '/v1/spinning/winding/reports/daily-production';

export class Service extends SecureService {

    constructor(http, aggregator) {
        super(http, aggregator);
    }

    getDailySpinningProductionReport(unitId) {
        var endpoint = `${serviceUri}`;
        var query = '';
        
        if(unitId){
            if(query == '') query = `unitId=${unitId}`;
            else query = `${query}&unitId=${unitId}`;
        }
        if(query != '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }
}