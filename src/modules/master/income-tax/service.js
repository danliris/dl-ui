import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'master/income-taxes';
const serviceUriSalesTax = 'master/sales-tax-groups';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  downloadTemplate() {
    var endpoint = `${serviceUri}/download-template`;
    return super.getXls(endpoint);
  }  

  getSalesTaxById(id) {
    var endpoint = `${serviceUriSalesTax}/GetSalesTaxIncome/${id}`;
    return super.get(endpoint);
  }

}
