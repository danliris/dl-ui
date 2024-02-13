import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-shipping/receipt-subcon-packing-lists";
const localSalesNoteUri = "garment-shipping/local-sales-notes";

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

  searchLocalSalesNoteByNo(info) {
    var endpoint = `${localSalesNoteUri}`;
    return super.list(endpoint, info);
  }

  getPdfByFilterCarton(id) {
    var endpoint = `${serviceUri}/${id}/carton`;
    return super.getPdf(endpoint);
}
}

const costCalculationServiceUri = "cost-calculation-garments";
const SalesContractserviceUri = "merchandiser/garment-sales-contracts";
const PreSalesContractserviceUri = "merchandiser/garment-pre-sales-contracts";
class SalesService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "sales");
  }

  getCostCalculationByRO(ro) {
    var endpoint = `${costCalculationServiceUri}/by-ro/${ro}`;
    return super.get(endpoint);
  }

  getSalesContractById(id) {
    var endpoint = `${SalesContractserviceUri}/${id}`;
    return super.get(endpoint);
  }

  getPreSalesContractById(id) {
    var endpoint = `${PreSalesContractserviceUri}/${id}`;
    return super.get(endpoint);
  }
}

const UnitServiceUri = "master/units";
const sectionServiceUri = "master/garment-sections";
const uomServiceUri = "master/uoms";
class CoreService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  getSectionById(id) {
    var endpoint = `${sectionServiceUri}/${id}`;
    return super.get(endpoint);
  }

  getStaffIdByName(name) {
    var endpoint = `${shippingStaffUri}`;
    return super.list(endpoint, name);
  }

  getSampleUnit(info) {
    var endpoint = `${UnitServiceUri}`;
    return super.list(endpoint, info);
  }

  getUom(info) {
    var endpoint = `${uomServiceUri}`;
    return super.list(endpoint, info);
  }
}

const packingOutUri = "subcon-packing-outs";

class GarmentProductionService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "garment-production");
  }

  searchPackingOutByNo(info) {
    var endpoint = `${packingOutUri}`;
    return super.list(endpoint, info);
  }

  getPackingOutByNo(info) {
    var endpoint = `${packingOutUri}/complete`;
    return super.list(endpoint, info);
  }
}

export { Service, SalesService, GarmentProductionService, CoreService };
