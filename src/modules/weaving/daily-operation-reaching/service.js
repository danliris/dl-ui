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

const serviceUri = "weaving/daily-operations-reaching";

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
    return super.list(endpoint, info);
  }

  getById(Id) {
    var endpoint = `${serviceUri}/${Id}`;
    return super.get(endpoint);
  }

  updateReachingInStart(Id, data) {
    var status = "reaching-in-start";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  updateReachingInChangeOperator(Id, data) {
    var status = "reaching-in-change-operator";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  updateReachingInFinish(Id, data) {
    var status = "reaching-in-finish";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  updateCombStart(Id, data) {
    var status = "comb-start";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  updateCombChangeOperator(Id, data) {
    var status = "comb-change-operator";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  updateCombFinish(Id, data) {
    var status = "comb-finish";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  deleteHistoryStartOrCompleteStatus(Id,data){
    var status = data.HistoryStatus;
    var endpoint = `${serviceUri}/${Id}/${data.HistoryId}/${data.BeamProductId}/${status}`;
    return super.put(endpoint,data)
  }
  deleteHistoryEntryStatus(data){
    var endpoint = `${serviceUri}/${data.Id}/${data.HistoryId}`;
    return super.delete(endpoint, data);
  }
  deleteHistoryContinueOrFinishStatus(Id,data){
    var status = data.HistoryStatus;
    var endpoint = `${serviceUri}/${Id}/${data.HistoryId}/${data.BeamProductId}/${status}`;
    return super.put(endpoint, data);
  }
}
