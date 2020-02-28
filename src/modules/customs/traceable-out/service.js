
import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'customs-reports';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "customs-report");
    }

    search(info) { 
        console.log(info);
        var endpoint = `${serviceUri}/traceable/out`;
        return super.list(endpoint, info);

        //return super.get(endpoint);
    }

    search2(ro) { 
        var endpoint = `${serviceUri}/traceable/out/detail?ro=${ro}`;
        return super.get(endpoint);

        //return super.get(endpoint);
    }
    
    generateExcel(info) {
        console.log(info);
        var endpoint = `${serviceUri}/traceableout/download?bcno=${info.bcno}`;
        return super.getXls(endpoint);
    }
}