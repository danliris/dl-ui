import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../rest-service';
import {SecureService} from '../../../../../utils/secure-service';

const serviceUri = require('../../../../../host').core + '/v1/purchasing/po/report/unit';

export class Service extends SecureService {

  constructor(http, aggregator) {
    super(http, aggregator);
  }

  getDataUnit(sdate,edate)
  {
    var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
    return super.get(endpoint);
  }

  getDetailUnit(sdate, edate, unit) {
    var endpoint = `${serviceUri}/${unit}?dateFrom=${sdate}&dateTo=${edate}`;
    return super.get(endpoint);
  }

}
