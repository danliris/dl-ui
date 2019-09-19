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

const serviceUri = "weaving/daily-operations-reaching-tying";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  getUnitById(Id) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("core");
    var _serviceUri = `master/units/${Id}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  getConstructionNumberById(value) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/fabric-constructions/construction-number/${value}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  getShiftByTime(value) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/shifts/check-shift/${value}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint);
  }

  getById(Id) {
    var endpoint = `${serviceUri}/${Id}`;
    return super.get(endpoint);
  }

  updateReachingStart(Id, data) {
    var status = "reaching-start";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  updateReachingChangeOperator(Id, data) {
    var status = "change-operator";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  updateReachingFinish(Id, data) {
    var status = "reaching-finish";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  updateTyingStart(Id, data) {
    var status = "tying-start";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  updateTyingFinish(Id, data) {
    var status = "tying-finish";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }
}
