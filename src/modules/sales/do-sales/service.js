import { RestService } from "../../../utils/rest-service";

const serviceUri = "sales/do-sales";
const salesContractServiceUri = "sales/finishing-printing-sales-contracts";
const productionOrderServiceUri = "sales/production-orders";
const buyerServiceUri = "master/buyers";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "sales");
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

  getDOSalesPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }

  searchSalesContract(info) {
    var endpoint = `${salesContractServiceUri}`;
    return super.list(endpoint, info);
  }

  getSalesContractById(id, select) {
    var endpoint = `${salesContractServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  getProductionOrderBySalesContractId(salesContractId) {
    var endpoint = `${productionOrderServiceUri}/filter-by-sales-contract/${salesContractId}`;
    return super.list(endpoint);
  }
}

export class ServiceCore extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "core");
  }

  searchBuyer(info) {
    var endpoint = `${buyerServiceUri}`;
    return super.list(endpoint, info);
  }

  getBuyerById(id, select) {
    var endpoint = `${buyerServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }
}
