import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from '../../../../utils/rest-service';

const getFilePeriode = "GetFilePeriode";
//const getArea = "GetArea";
// const getAreaBaru = "GetAreaBaru";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "dyeing");
    //super(http, aggregator, config, "production-azure");
  }

  search(info) {
    var endpoint = `${getFilePeriode}`;
    return super.list(endpoint, info);
  }

  // getArea() {
  //   var endpoint = `${getArea}`;
  //   return super.get(endpoint);
  // }

  // getAreaBaru() {
  //   var endpoint = `${getAreaBaru}`;
  //   return super.get(endpoint);
  // }

  // getReport( machine) {
  //  // var endpoint = `${serviceUri}`;
  //   var query = '';
  //   if (machine) {
  //     if (query === '') query = `machine=${machine.Id}`;
  //     else query = `${query}&machine=${machine.Id}`;
  // }
  // }
}
