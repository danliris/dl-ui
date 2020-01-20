import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'report/local-purchasing-book-reports';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) { 
        var endpoint = `${serviceUri}?isValas=true&no=${info.no}&category=${info.category}&unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.get(endpoint);
        
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}/download?isValas=true&no=${info.no}&category=${info.category}&unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}