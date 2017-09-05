import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'invoice-notes/by-user';
const deliveryOrderUri = 'delivery-orders/no-invoice';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
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

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    getPdfVatNote(id) {
        var endpoint = `invoice-notes/pdf/vat/${id}`;
        return super.getPdf(endpoint);
    }

    getPdfIncomeTaxNote(id) {
        var endpoint = `invoice-notes/pdf/income-tax/${id}`;
        return super.getPdf(endpoint);
    }

    getDeliveryOrder(filter) {
        var endpoint = `${deliveryOrderUri}`;
        return super.list(endpoint, {filter: JSON.stringify(filter)});
    }
}
