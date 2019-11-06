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
import {
  debug
} from 'util';

const serviceUri = 'weaving/machines-planning';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  getUnitById(Id) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("core");
    var _serviceUri = `master/units/${Id}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  //Get Data Machine Planning Report
  getAll() {
    var filterType = "get-all";
    var endpoint = `${serviceUri}/${filterType}`;
    return super.get(endpoint);
  }
  
  getByWeavingUnit(weavingUnitId) {
    var filterType = "get-by-weaving-unit";
    var endpoint = `${serviceUri}/${filterType}/${weavingUnitId}`;
    return super.get(endpoint);
  }
  
  getByMachine(machineId) {
    var filterType = "get-by-machine";
    var endpoint = `${serviceUri}/${filterType}/${machineId}`;
    return super.get(endpoint);
  }
  
  getByBlock(block) {
    var filterType = "get-by-block";
    var endpoint = `${serviceUri}/${filterType}/${block}`;
    return super.get(endpoint);
  }
  
  getByWeavingUnitMachine(weavingUnitId, machineId) {
    var filterType = "get-by-weaving-unit-machine";
    var endpoint = `${serviceUri}/${filterType}/unit/${weavingUnitId}/machine/${machineId}`;
    return super.get(endpoint);
  }
  
  getByWeavingUnitBlock(weavingUnitId, block) {
    var filterType = "get-by-weaving-unit-block";
    var endpoint = `${serviceUri}/${filterType}/unit/${weavingUnitId}/block/${block}`;
    return super.get(endpoint);
  }
  
  getByMachineBlock(machineId, block) {
    var filterType = "get-by-machine-block";
    var endpoint = `${serviceUri}/${filterType}/machine/${machineId}/block/${block}`;
    return super.get(endpoint);
  }
  
  getAllSpecified(weavingUnitId, machineId, block) {
    var filterType = "get-all-specified";
    var endpoint = `${serviceUri}/${filterType}/unit/${weavingUnitId}/machine/${machineId}/block/${block}`;
    return super.get(endpoint);
  }

  //Export to Excel Machine Planning Report
  getXlsAll() {
    var filterType = "get-all";
    var endpoint = `${serviceUri}/${filterType}`;
    return super.getXls(endpoint);
  }
  
  getXlsByWeavingUnit(weavingUnitId) {
    var filterType = "get-by-weaving-unit";
    var endpoint = `${serviceUri}/${filterType}/${weavingUnitId}`;
    return super.getXls(endpoint);
  }
  
  getXlsByMachine(machineId) {
    var filterType = "get-by-machine";
    var endpoint = `${serviceUri}/${filterType}/${machineId}`;
    return super.getXls(endpoint);
  }
  
  getXlsByBlock(block) {
    var filterType = "get-by-block";
    var endpoint = `${serviceUri}/${filterType}/${block}`;
    return super.getXls(endpoint);
  }
  
  getXlsByWeavingUnitMachine(weavingUnitId, machineId) {
    var filterType = "get-by-weaving-unit-machine";
    var endpoint = `${serviceUri}/${filterType}/unit/${weavingUnitId}/machine/${machineId}`;
    return super.getXls(endpoint);
  }
  
  getXlsByWeavingUnitBlock(weavingUnitId, block) {
    var filterType = "get-by-weaving-unit-block";
    var endpoint = `${serviceUri}/${filterType}/unit/${weavingUnitId}/block/${block}`;
    return super.getXls(endpoint);
  }
  
  getXlsByMachineBlock(machineId, block) {
    var filterType = "get-by-machine-block";
    var endpoint = `${serviceUri}/${filterType}/machine/${machineId}/block/${block}`;
    return super.getXls(endpoint);
  }
  
  getXlsAllSpecified(weavingUnitId, machineId, block) {
    var filterType = "get-all-specified";
    var endpoint = `${serviceUri}/${filterType}/unit/${weavingUnitId}/machine/${machineId}/block/${block}`;
    return super.getXls(endpoint);
  }
}
