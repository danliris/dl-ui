import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const getFilePeriode = "GetMonitoringKanban";
const productionOrderServiceUri = 'sales/production-orders/get-standar-tests';

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "dyeing");
  }

  search(info) {
    var endpoint = `${getFilePeriode}`;
    return super.list(endpoint, info);
  }

  getByMonthYear(info) {
    var endpoint = `GetMonitoringKanbanMonthYear`;
    return super.list(endpoint, info);
  }

  getProductionOrderDetails(orderNo)
  {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("sales");

    return endpoint.find(productionOrderServiceUri, { orderNo: orderNo })
        .then(results => {
            
            return results;
        });
  }
}


  