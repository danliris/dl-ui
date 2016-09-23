import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../rest-service';
 
const serviceUri = require('../../../../host').core + '/v1/po/poreport';
 
export class Service extends RestService{

  constructor(http, aggregator) {
    super(http, aggregator);
  }
  
  getByDate(sdate,edate) 
  {
      var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
      return super.get(endpoint);
  }
 
}
