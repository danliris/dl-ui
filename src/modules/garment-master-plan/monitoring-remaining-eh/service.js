import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'weekly-plans-monitoring-remaining-eh';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-master-plan");
    }

    search(info) { 
        var endpoint = `${serviceUri}?year=${info.year}&unit=${info.unit}`;
        return super.get(endpoint);
        
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}?year=${info.year}&unit=${info.unit}`;
        return super.getXls(endpoint);
    }
}
