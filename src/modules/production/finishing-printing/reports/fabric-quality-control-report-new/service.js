import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = "dyeing-printing/report/fabric-quality-control-reports";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        let endpoint = `${serviceUri}/download?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }

}