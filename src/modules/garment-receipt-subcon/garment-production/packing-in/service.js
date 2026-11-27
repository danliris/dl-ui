import { RestService } from "../../../../utils/rest-service";

const serviceUri = "subcon-packing-ins";
const serviceUriSewingOut = "subcon-sewing-outs";
const serviceUriFinishingOut = "subcon-finishing-outs";
const serviceUriCuttingOut = "receipt-subcon-cutting-outs";
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

  //Search RO for Loader
  searchRoSewingOut(info) {
    var endpoint = `${serviceUriSewingOut}/get-by-ro`;
    return super.list(endpoint, info);
  }

  searchRoCuttingOut(info) {
    var endpoint = `${serviceUriCuttingOut}/get-by-ro`;
    return super.list(endpoint, info);
  }

  searchRoFinishingOut(info) {
    var endpoint = `${serviceUriFinishingOut}`;
    return super.list(endpoint, info);
  }
  //

  //Search Data by ID from Loader
  searchSewingOut(info) {
    var endpoint = `${serviceUriSewingOut}/complete`;
    return super.list(endpoint, info);
  }

  searchCuttingOut(info) {
    var endpoint = `${serviceUriCuttingOut}/complete`;
    return super.list(endpoint, info);
  }

  searchFinishingOut(info) {
    var endpoint = `${serviceUriFinishingOut}/complete`;
    return super.list(endpoint, info);
  }

  //

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
}

export { Service };
