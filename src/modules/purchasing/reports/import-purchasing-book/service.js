import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'report/import-purchasing-book-reports';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(filter) { 
        var endpoint = `${serviceUri}?no=${filter.no}&unit=${filter.unit}&category=${filter.category}&dateFrom=${filter.dateFrom}&dateTo=${filter.dateTo}`;
        return super.get(endpoint);
    }
    
    generateExcel(filter) {
        var endpoint = `${serviceUri}/download?no=${filter.no}&unit=${filter.unit}&category=${filter.category}&dateFrom=${filter.dateFrom}&dateTo=${filter.dateTo}`;
        return super.getXls(endpoint);
    }
}
