import { RestService } from "../../../../utils/rest-service";

const serviceUri = "receipt-subcon-finishing-ins";
const serviceUriSewingOut = "subcon-sewing-outs";
const comodityPriceserviceUri = "comodity-prices";

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

  searchRoSewingOut(info) {
    var endpoint = `${serviceUriSewingOut}/get-by-ro`;
    return super.list(endpoint, info);
  }

  searchSewingOut(info) {
    var endpoint = `${serviceUriSewingOut}/complete`;
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

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
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

  getSewingOutbyId(id) {
    var endpoint = `${serviceUriSewingOut}/${id}`;
    return super.get(endpoint);
  }
}

export { Service };
