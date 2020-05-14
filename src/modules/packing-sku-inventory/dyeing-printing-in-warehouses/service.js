import { RestService } from "../../../utils/rest-service";
const serviceUri = "input-warehouses";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  // getPreWarehouse(searchDate, searchShift, searchGroup) {
  //   var endpoint = `${serviceUri}/pre-warehouse`;
  //   var query = "";

  //   if (searchDate) {
  //     if (query === "") query = `searchDate=${searchDate}`;
  //     else query = `${query}&searchDate=${searchDate}`;
  //   }
  //   if (searchShift) {
  //     if (query === "") query = `searchShift=${searchShift}`;
  //     else query = `${query}&searchShift=${searchShift}`;
  //   }
  //   if (searchGroup) {
  //     if (query === "") query = `searchGroup=${searchGroup}`;
  //     else query = `${query}&searchGroup=${searchGroup}`;
  //   }
  //   if (query !== "") {
  //     endpoint = `${serviceUri}/pre-warehouse?${query}`;
  //   }

  //   return super.get(endpoint);
  // }

  getProductionOrderOutput(){
      var endpoint = `${serviceUri}/output-production-orders`;

      return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.id}`;
    return super.delete(endpoint, data);
  }

  getPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }

  generateExcel(id) {
    var endpoint = `${serviceUri}/xls/${id}`;
    return super.getXls(endpoint);
  }
}
