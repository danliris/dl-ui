import {
  inject,
  Lazy
} from 'aurelia-framework';
import {
  HttpClient
} from 'aurelia-fetch-client';
import {
  RestService
} from '../../../utils/rest-service';

const serviceUri = 'shipping-area-note';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

  getReport(sdate, mutation, zone) {
    var endpoint = `${serviceUri}`;
    var query = '';

    if (sdate) {
      if (query === '') query = `searchDate=${(sdate)}`;
      else query = `${query}&searchDate=${(sdate)}`;
    }
    if (mutation) {
      if (query === '') query = `mutation=${mutation}`;
      else query = `${query}&mutation=${mutation}`;
    }
    if (zone) {
      if (query === '') query = `zone=${(zone)}`;
      else query = `${query}&zone=${(zone)}`;
    }
    if (query !== '')
      endpoint = `${serviceUri}?${query}`;

    return super.get(endpoint);
  }

  generateExcel(sdate, mutation, zone) {

    var endpoint = `${serviceUri}/xls`;
    var query = '';
    if (sdate) {
      if (query === '') query = `searchDate=${(sdate)}`;
      else query = `${query}&searchDate=${(sdate)}`;
    }
    if (mutation) {
      if (query === '') query = `mutation=${mutation}`;
      else query = `${query}&mutation=${mutation}`;
    }
    if (zone) {
      if (query === '') query = `zone=${(zone)}`;
      else query = `${query}&zone=${(zone)}`;
    }
    if (query !== '')
      endpoint = `${serviceUri}?${query}`;


    if (query !== '')
      endpoint = `${endpoint}?${query}`;

    return super.getXls(endpoint);
  }
}
