import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client'; 
import {SecureService} from '../../../../../utils/secure-service';
 
const serviceUri = require('../../../../../host').core + '/v1/purchasing/po/reports/by-category';
 
export class Service extends SecureService{

  constructor(http, aggregator) {
    super(http, aggregator);
  }
  
  getByDate(sdate,edate) 
  {
      var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
      return super.get(endpoint);
  }
 

}
