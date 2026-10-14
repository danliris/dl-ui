import { RestService } from "../../../utils/rest-service";

const serviceUri = "finished-good-stocks";
const serviceUriFinOut = 'finishing-outs';

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "garment-production");
  }

  search(info) {
    var endpoint = `${serviceUri}/by-ro-summary`;
    return super.list(endpoint, info);
  }

  getByRONo(RONo) {
    var endpoint = `${serviceUri}/by-ro/${RONo}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/racking/${data.Id}`;
    return super.put(endpoint, data);
  }

}

const shippingInvoiceServiceUri = 'garment-shipping/packing-lists';

class PackingInventoryService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "packing-inventory");
    }

    getByPackingListRONo(RONo) {
        var endpoint = `${shippingInvoiceServiceUri}/by-ro-no/${RONo}`;
        return super.get(endpoint);
    }
}

export { Service, PackingInventoryService };

