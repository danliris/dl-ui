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

const serviceUri = "input-aval";

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getPreAval(info) {
    var endpoint = `${serviceUri}/pre-aval`;
    // var query = '';

    // if (date) {
    //   if (query === '') query = `date=${(date)}`;
    //   else query = `${query}&date=${(date)}`;
    // }
    // if (shift) {
    //   if (query === '') query = `shift=${shift}`;
    //   else query = `${query}&shift=${shift}`;
    // }
    // if (query !== '')
    //   endpoint = `${serviceUri}?${query}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    let endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    let endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  // update(data) {
  //   let endpoint = `${serviceUri}/${data.id}`;
  //   return super.put(endpoint, data);
  // }

  // delete(data) {
  //   let endpoint = `${serviceUri}/${data.id}`;
  //   return super.delete(endpoint, data);
  // }
}
