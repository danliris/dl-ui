import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = "dyeing-printing/report/qc-towarehouse-reports";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

  getReport(sdate, edate) {
    var endpoint = `${serviceUri}`;
    var query = '';
    if (sdate) {
        if (query === '') query = `startdate=${sdate}`;
        else query = `${query}&startdate=${sdate}`;
    }
    if (edate) {
        if (query === '') query = `finishdate=${edate}`;
        else query = `${query}&finishdate=${edate}`;
    }
   
    if (query !== '')
        endpoint = `${serviceUri}?${query}`;

    return super.get(endpoint);
}

generateExcel(sdate, edate) {
    var endpoint = `${serviceUri}/download`;
    var query = '';
    if (sdate) {
        if (query === '') query = `startdate=${sdate}`;
        else query = `${query}&startdate=${sdate}`;
    }
    if (edate) {
        if (query === '') query = `finishdate=${edate}`;
        else query = `${query}&finishdate=${edate}`;
    }
  
    if (query !== '')
        endpoint = `${serviceUri}/download?${query}`;

    return super.getXls(endpoint);
}

}