import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'finishing-printing/kanbans';
const productionOrderServiceUri = 'sales/production-orders';
const durationEstimationUri = 'master/fp-duration-estimations';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "production");
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
    var endpoint = `${serviceUri}/${data._id}`;
    return super.put(endpoint, data);
  }

  updateIsComplete(id) {
    var endpoint = `${serviceUri}/complete/${id}`;
    return super.put(endpoint);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data._id}`;
    return super.delete(endpoint, data);
  }

  getByCode(code) {
    var endpoint = `${serviceUri}?keyword=${code}`;
    return super.get(endpoint);
  }
  
  getProductionOrderDetails(orderNo) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("production");

    return endpoint.find(productionOrderServiceUri, { keyword: orderNo })
      .then(results => {
        var productionOrder = results.data[0];
        var productionOrderDetails = [];

        for (var detail of productionOrder.details) {
          productionOrderDetails.push(detail);
        }

        return productionOrderDetails;
      });
  }

  getDurationEstimation(code, select) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");
    var filter = {
      "processType.code": code
    };

    var promise = endpoint.find(durationEstimationUri, { select: select, filter: JSON.stringify(filter) });
    this.eventAggregator.publish('httpRequest', promise);
    return promise
      .catch(e => {
        this.eventAggregator.publish('httpRequest', promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then((result) => {
        this.eventAggregator.publish('httpRequest', promise);
        return Promise.resolve(result);
      });
  }

  getPdfById(id) {
      var endpoint = `${serviceUri}/${id}`;
      return super.getPdf(endpoint);
  }
}