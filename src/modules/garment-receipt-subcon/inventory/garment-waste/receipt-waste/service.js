import { RestService } from "../../../../../utils/rest-service";

const serviceUri = "garment-receipt-subcon/waste/receipt";

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "inventory-azure");
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
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }
}

const preparingUri = "subcon-preparings";

class GarmentProductionService extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "garment-production");
  }

  getPreparings(info) {
    var endpoint = `${preparingUri}`;
    return super.list(endpoint, info);
  }

  getPreparingWithBC(info) {
    var _preparingUri = "preparings/with-bc";
    var endpoint = `${_preparingUri}`;
    return super.list(endpoint, info);
  }
}

export { Service, GarmentProductionService };
