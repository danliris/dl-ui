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

const serviceUri = "output-aval";

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getAvailableAval(searchDate, searchShift) {
    var endpoint = `${serviceUri}/available-aval`;
    var query = "";

    if (searchDate) {
      if (query === "") query = `searchDate=${searchDate}`;
      else query = `${query}&searchDate=${searchDate}`;
    }
    if (searchShift) {
      if (query === "") query = `searchShift=${searchShift}`;
      else query = `${query}&searchShift=${searchShift}`;
    }
    if (query !== "") {
      endpoint = `${serviceUri}/available-aval?${query}`;
    }
    
    return super.get(endpoint);
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
