import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../../rest-service';
import {SecureService} from '../../../../../../utils/secure-service';

const serviceUri = require('../../../../../../host').production + '/v1/spinning/winding/reports/daily-production';

export class Service extends SecureService {

    constructor(http, aggregator) {
        super(http, aggregator);
    }

    getDailySpinningProductionReport(firstDay, lastDay, unitId) {
        var endpoint = `${serviceUri}`;
        var query = '';
        
        if(firstDay){
            if(query == '') query = `firstDay=${firstDay}`;
            else query = `${query}&firstDay=${firstDay}`;
        }
        if(lastDay){
            if(query == '') query = `lastDay=${lastDay}`;
            else query = `${query}&lastDay=${lastDay}`;
        }
        if(unitId){
            if(query == '') query = `unitId=${unitId}`;
            else query = `${query}&unitId=${unitId}`;
        }

        if(query != '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }
}