import { RestService } from "../../../../utils/rest-service";

const serviceUri = "subcon-expenditure-good-returns";
const comodityPriceserviceUri = "comodity-prices";
const expenditureGoodServiceUri = "subcon-packing-outs";
const finishedGoodServiceUri = "subcon-finished-good-stocks";

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

  getExpenditureGood(info) {
    var endpoint = `${expenditureGoodServiceUri}/complete`;
    return super.list(endpoint, info);
  }

  getExpenditureGoodByNo(info) {
    var endpoint = `${expenditureGoodServiceUri}`;
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

  getFinishedGoodById(id) {
    var endpoint = `${finishedGoodServiceUri}/${id}`;
    return super.get(endpoint);
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

const serviceUriPR = "garment-purchase-requests";
const serviceUriURNDO = "garment-unit-receipt-notes/by-do";
class PurchasingService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "purchasing-azure");
  }

  getGarmentPR(info) {
    var endpoint = `${serviceUriPR}`;
    return super.list(endpoint, info);
  }

  getDOUrnBC(info) {
    console.log(info);
    var endpoint = `${serviceUriURNDO}`;
    return super.list(endpoint, info);
  }
}

const serviceUriBCNo = "customs-reports/getTemp/byBCNo";
class CustomReportService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "customs-report");
  }

  getBCNo(info) {
    console.log(info);
    var endpoint = `${serviceUriBCNo}`;
    return super.list(endpoint, info);
  }
}

export { Service, SalesService, PurchasingService, CustomReportService };
