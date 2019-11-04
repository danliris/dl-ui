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
  debug
} from 'util';

const serviceUri = 'weaving/daily-operations-sizing/machine-planning-report';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
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












  //Get Data
  getDataByDate(date, weavingUnitId, shiftId, spu) {
    var periodType = "date";
    var endpoint = `${serviceUri}/${periodType}/${date}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
    return super.get(endpoint);
  }

  getDataByDateRange(startDate, endDate, weavingUnitId, shiftId, spu) {
    var periodType = "daterange";
    var endpoint = `${serviceUri}/${periodType}/start-date/${startDate}/end-date/${endDate}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
    return super.get(endpoint);
  }

  getDataByMonth(month, weavingUnitId, shiftId, spu) {
    var periodType = "month";
    var endpoint = `${serviceUri}/${periodType}/${month}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
    return super.get(endpoint);
  }

  //Export to Excel
  getXlsByDate(date, weavingUnitId, shiftId, spu) {
    var periodType = "date";
    var endpoint = `${serviceUri}/${periodType}/${date}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
    return super.getXls(endpoint);
  }

  getXlsByDateRange(startDate, endDate, weavingUnitId, shiftId, spu) {
    var periodType = "daterange";
    var endpoint = `${serviceUri}/${periodType}/start-date/${startDate}/end-date/${endDate}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
    return super.getXls(endpoint);
  }

  getXlsByMonth(month, weavingUnitId, shiftId, spu) {
    var periodType = "month";
    var endpoint = `${serviceUri}/${periodType}/${month}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
    return super.getXls(endpoint);
  }
}
