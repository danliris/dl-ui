import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../rest-service';
import {SecureService} from '../../../../../utils/secure-service';
 
const serviceUri = require('../../../../../host').core + '/v1/purchasing/po/reports';
 
export class Service extends SecureService{

  constructor(http, aggregator) {
    super(http, aggregator);
  }
  
  // getByDate(sdate,edate,unit) 
  // {
  //     var endpoint = `${serviceUri}?unit=null&dateFrom=${sdate}&dateTo=${edate}`;
  //     return super.get(endpoint);
  // }
 
 getDetailUnit(sdate,edate,unit)
 {
    var endpoint = `${serviceUri}/${unit}?dateFrom=${sdate}&dateTo=${edate}`;
    return super.get(endpoint);
 }

}
