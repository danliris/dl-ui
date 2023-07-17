import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = "garment-purchasing/report/garment-finance-import-purchasing-journals";
const serviceDetailUri = "garment-purchasing/report/garment-finance-detail-import-purchasing-journals";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        let endpoint = `${serviceUri}/download?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }

    generateDetailExcel(info) {
        let endpoint = `${serviceDetailUri}/download?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }

}