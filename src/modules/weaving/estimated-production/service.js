import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUriEstimatedProduction = 'weaving/estimation-productions';
const serviceUriOrderDocument = 'weaving/orders/order-by-period';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "weaving");
    }

    searchSOP(month, year, unitCode, status) {
        status = "OPEN-ORDER";
        var endpoint = `${serviceUriOrderDocument}/${month}/${year}/unit/${unitCode}/status/${status}`;
        return super.list(endpoint);
    }

    searchEP(info) {
        var endpoint = `${serviceUriEstimatedProduction}`;
        return super.list(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUriEstimatedProduction}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUriEstimatedProduction}`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUriEstimatedProduction}/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUriEstimatedProduction}/${data.id}`;
        return super.delete(endpoint, data);
    }

    getByCode(code) {
        var endpoint = `${serviceUriEstimatedProduction}?keyword=${code}`;
        return super.get(endpoint);
    }
}