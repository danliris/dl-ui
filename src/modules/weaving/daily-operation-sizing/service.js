import {
  inject,
  Lazy
} from "aurelia-framework";
import {
  HttpClient
} from "aurelia-fetch-client";
import {
  RestService
} from "../../../utils/rest-service";
import {
  Container
} from "aurelia-dependency-injection";
import {
  Config
} from "aurelia-api";

const serviceUri = "weaving/daily-operations-sizing";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint);
  }

  getUnitById(Id) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("core");
    var _serviceUri = `master/units/${Id}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  getById(Id) {
    var endpoint = `${serviceUri}/${Id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  getShiftByTime(value) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/shifts/check-shift/${value}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  // update(data) {
  //   var endpoint = `${serviceUri}/${data.Id}`;
  //   return super.put(endpoint, data);
  // }

  updatePauseEntry(Id) {
    status = "pause";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.get(endpoint);
  }

  updateResumeEntry(Id) {
    status = "resume";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.get(endpoint);
  }

  updateDoffEntry(Id) {
    status = "doff";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.get(endpoint);
  }

  // delete(data) {
  //   var endpoint = `${serviceUri}/${data.Id}`;
  //   return super.delete(endpoint, data);
  // }
}
