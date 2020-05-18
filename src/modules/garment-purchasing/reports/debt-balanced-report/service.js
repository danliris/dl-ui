import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service'; 

const serviceUri = 'debt-balance-reports';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

search(info) { 
        var endpoint = `${serviceUri}?jnsSpl=${info.jnsSpl}&payMtd=${info.payMtd}&category=${info.category}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.get(endpoint);
        
    }
    
generateExcel(info) {
        var endpoint = `${serviceUri}/download?jnsSpl=${info.jnsSpl}&payMtd=${info.payMtd}&category=${info.category}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}