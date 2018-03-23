import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'booking-orders-canceled-monitoring';
const HourServiceUri = 'standard-hours-by-style';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-master-plan");
    }

    search(info) { 
        var endpoint = `${serviceUri}?code=${info.code}&buyer=${info.buyer}&cancelState=${info.cancelState}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.get(endpoint);
        
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}?code=${info.code}&buyer=${info.buyer}&cancelState=${info.cancelState}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}