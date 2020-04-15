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

const serviceUri = "inventory-document-aval";

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
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

  update(data) {
    let endpoint = `${serviceUri}/${data.id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    let endpoint = `${serviceUri}/${data.id}`;
    return super.delete(endpoint, data);
  }

  // getUomByName(name) {
  //   var config = Container.instance.get(Config);
  //   var _endpoint = config.getEndpoint("core");
  //   var _serviceUri = `master/uoms/${name}`;

  //   return _endpoint.find(_serviceUri).then(result => {
  //     return result.data;
  //   });
  // }
}
