import { RestService } from "../../../../utils/rest-service";

const serviceUri = "subcon-sewing-ins";
const serviceUriLoadingOut = "subcon-loading-outs";
const comodityPriceserviceUri = "comodity-prices";
// const serviceUriSewingIn = "sewing-ins";

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "garment-production");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getComodityPrice(info) {
    var endpoint = `${comodityPriceserviceUri}`;
    return super.list(endpoint, info);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  read(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getLoadingOutbyId(id) {
    var endpoint = `${serviceUriLoadingOut}/${id}`;
    return super.get(endpoint);
  }

  getPdfById(id, buyer) {
    var endpoint = `${serviceUri}/${id}/${buyer}`;
    return super.getPdf(endpoint);
  }

  post(data) {
    data.approved = true;
    var endpoint = `${serviceUri}/approve`;
    return super.put(endpoint, data);
  }

  unpost(data) {
    data.approved = false;
    var endpoint = `${serviceUri}/approve`;
    return super.put(endpoint, data);
  }

  // searchSewingIn(info) {
  //   var endpoint = `${serviceUriSewingIn}`;
  //   return super.list(endpoint, info);
  // }
}

const serviceUriPR = "garment-purchase-requests";

class PurchasingService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "purchasing-azure");
  }

  getGarmentPR(info) {
    var endpoint = `${serviceUriPR}`;
    return super.list(endpoint, info);
  }
}

export { Service, PurchasingService };
