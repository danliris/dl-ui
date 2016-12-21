import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'finishing-printing/production-orders';

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

    update(data,_id) {
        var endpoint = `${serviceUri}/${_id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        console.log(data);
        var endpoint = `${serviceUri}/${data._id}?no=${data.orderNo}`;
        return super.delete(endpoint, data);
  }

    getPdfById(id,no) {
        var endpoint = `${serviceUri}/${id}?no=${no}`;
        return super.getPdf(endpoint);
    }
}