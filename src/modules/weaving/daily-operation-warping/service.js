import {
  RestService
} from "../../../utils/rest-service";
import {
  Container
} from "aurelia-dependency-injection";
import {
  Config
} from "aurelia-api";
const serviceUri = 'weaving/daily-operations-warping';

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
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

  updateForStartProcess(data) {
    const startProcess = 'start-process';
    var endpoint = `${serviceUri}/${startProcess}`;
    return super.put(endpoint, data);
  }

  updateForStopProcess(data) {
    const pauseProcess = 'pause-process';
    var endpoint = `${serviceUri}/${pauseProcess}`;
    return super.put(endpoint, data);
  }

  updateForResumeProcess(data) {
    const resumeProcess = 'resume-process';
    var endpoint = `${serviceUri}/${resumeProcess}`;
    return super.put(endpoint, data);
  }

  updateForFinishProcess(data) {
    const finishProcess = 'finish-process';
    var endpoint = `${serviceUri}/${finishProcess}`;
    return super.put(endpoint, data);
  }

  updateForfinishDailyOperation(data) {
    const finishDailyOperation = 'finish-process-operation';
    var endpoint = `${serviceUri}/${finishDailyOperation}`;
    return super.put(endpoint, data);
  }

  getById(Id) {
    var endpoint = `${serviceUri}/${Id}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }
}
