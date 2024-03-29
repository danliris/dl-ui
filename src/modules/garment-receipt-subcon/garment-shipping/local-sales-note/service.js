import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-shipping/receipt-subcon-local-sales-notes";
const serviceUriSC = "garment-shipping/local-sales-contracts";
const serviceUriPL = "garment-shipping/receipt-subcon-packing-lists";

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
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

  // getSCById(id) {
  //     var endpoint = `${serviceUriSC}/${id}`;
  //     return super.get(endpoint);
  // }

  getPL(info) {
    var endpoint = `${serviceUriPL}`;
    return super.list(endpoint, info);
  }
}

const coreserviceUri = "master/account-banks";
class CoreService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  getBankAccountById(id) {
    var endpoint = `${coreserviceUri}/${id}`;
    return super.get(endpoint);
  }
}

export { Service, CoreService };
