import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = "garment-shipping/report/garment-finance-export-sales-journals";
const serviceDetailUri = "garment-shipping/report/garment-finance-detail-export-sales-journals";


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

    generateDetailExcel(info) {
        let endpoint = `${serviceDetailUri}/download?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }

}