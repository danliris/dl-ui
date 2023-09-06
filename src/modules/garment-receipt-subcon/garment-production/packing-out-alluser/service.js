import { RestService } from "../../../../utils/rest-service";

const serviceUri = "subcon-packing-outs";
const comodityPriceserviceUri = "comodity-prices";
const packingInServiceUri = "subcon-packing-ins";
const preparingServiceUri = "subcon-preparings";
const serviceUriFinOut = "finishing-outs";

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

  getPackingIn(info) {
    var endpoint = `${packingInServiceUri}/complete`;
    return super.list(endpoint, info);
  }

  getPackingInByRo(info) {
    var endpoint = `${packingInServiceUri}/get-by-ro`;
    return super.list(endpoint, info);
  }

  getPreparingByRONo(info) {
    var endpoint = `${preparingServiceUri}`;
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

  searchFinishingOut(info) {
    var endpoint = `${serviceUriFinOut}`;
    return super.list(endpoint, info);
  }

  getPdfById(id, buyer) {
    var endpoint = `${serviceUri}/${id}/${buyer}`;
    return super.getPdf(endpoint);
  }
}

const costCalculationServiceUri = "cost-calculation-garments";
const serviceUriSalesContract = "merchandiser/garment-sales-contracts";
class SalesService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "sales");
  }

  getCostCalculationByRONo(info) {
    var endpoint = `${costCalculationServiceUri}`;
    return super.list(endpoint, info);
  }

  getSalesContractByRONo(info) {
    var endpoint = `${serviceUriSalesContract}`;
    return super.list(endpoint, info);
  }
}

const shippingInvoiceServiceUri = "garment-shipping/invoices/packingListById";
class PackingInventoryService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "packing-inventory");
  }

  getDataByPackingLisId(id) {
    var endpoint = `${shippingInvoiceServiceUri}/${id}`;
    return super.get(endpoint);
  }
}
export { Service, SalesService, PackingInventoryService };
