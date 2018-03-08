import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'sewing-blocking-plans-accepted-order-monitoring';

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

    getWeeklyPlan(filter){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-master-plan");
        var _serviceUri = `weekly-plans`;

        return _endpoint.find(_serviceUri, { filter: JSON.stringify(filter), order: JSON.stringify({"unit.code":1}) })
            .then(result => {
                return result.data;
            });
    }
}

