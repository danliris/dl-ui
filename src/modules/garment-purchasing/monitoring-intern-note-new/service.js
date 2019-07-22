import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';



const serviceUri = 'garment-intern-notes';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) { 
        var endpoint = `${serviceUri}/monitoring`;
        return super.list(endpoint, info);
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}/monitoring/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&no=${info.no}&supplierCode=${info.supplierCode}&curencyCode=${info.curencyCode}`;
        return super.getXls(endpoint);
    }
}