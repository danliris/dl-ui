import { RestService } from "../../../../../utils/rest-service";

const serviceUri = "garment-receipt-subcon/waste/expenditure";

const serviceReceiptUri = "garment-receipt-subcon/waste/receipt";
// const resourceStock = 'garment/leftover-warehouse-stocks';
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

  searchBOMNo(info) {
    var endpoint = `${serviceReceiptUri}`;
    return super.list(endpoint, info);
  }
  // getStock(info) {
  //     var endpoint = `${resourceStock}`;
  //     return super.list(endpoint, info);
  // }

  getPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }
}

export { Service };
