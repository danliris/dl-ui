import { RestService } from '../../../utils/rest-service';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

const serviceUri = 'service-subcon-expenditure-good';
// const serviceUriSewIn = 'sewing-ins';
const serviceUriFinishedGoodStock = 'finished-good-stocks';
const serviceUriPR = 'garment-purchase-requests';
const comodityPriceserviceUri = 'comodity-prices';

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "garment-production");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  searchItem(info) {
    var endpoint = `${serviceUri}/item`;
    return super.list(endpoint, info);
  }

  getComodityPrice(info) {
    var endpoint = `${comodityPriceserviceUri}`;
    return super.list(endpoint, info);
  }

  // searchSewingIn(info) {
  //   var endpoint = `${serviceUriSewIn}`;
  //   return super.list(endpoint, info);
  // }

  searchFinishedGoodStockByRo(info) {
    var endpoint = `${serviceUriFinishedGoodStock}/list`;
    return super.list(endpoint, info);
  }

  GetFinishedGoodStockById(id) {
    var endpoint = `${serviceUriFinishedGoodStock}/${id}`;
    return super.get(endpoint);
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

  searchComplete(info) {
    var endpoint = `${serviceUri}/complete`;
    return super.list(endpoint, info);
  }

  getPdfById(id) {
    var endpoint = `${serviceUri}/get-pdf/${id}`;
    return super.getPdf(endpoint);
  }

  generateExcel(info) {
    var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.getXls(endpoint);
  }

}

class PurchasingService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "purchasing-azure");
  }

  getGarmentPR(info) {
    var endpoint = `${serviceUriPR}`;
    return super.list(endpoint, info);
  }
}

export { Service, PurchasingService }
