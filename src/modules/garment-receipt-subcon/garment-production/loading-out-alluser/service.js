import { RestService } from "../../../../utils/rest-service";

const serviceUri = "subcon-loading-outs";
const serviceUriLoadingIn = "subcon-loading-ins";
const comodityPriceserviceUri = "comodity-prices";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "garment-production");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
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

  getLoadingInbyId(id) {
    var endpoint = `${serviceUriLoadingIn}/${id}`;
    return super.get(endpoint);
  }

  getPdfById(id, buyer) {
    var endpoint = `${serviceUri}/${id}/${buyer}`;
    return super.getPdf(endpoint);
  }

  getComodityPrice(info) {
    var endpoint = `${comodityPriceserviceUri}`;
    return super.list(endpoint, info);
  }
}
