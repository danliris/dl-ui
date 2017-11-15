import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'inventory/packing-receipts';
const packingUnacceptedServiceUri = 'finishing-printing/quality-control/packings-unaccepted';
const packingServiceUri = 'finishing-printing/quality-control/packings';
const productionOrderServiceUri = 'sales/production-orders';
const packingReceiptUnvoidServiceUri = 'inventory/packing-receipts-unvoid';

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

    // split(data) {
    //     var endpoint = 'purchase-orders/split';
    //     return super.post(endpoint, data);
    // }

    update(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }
    getPR(id) {
        var endpoint = `${serviceUriPr}/${id}`;
        return super.get(endpoint);
    }

    searchPacking(info) {
        var endpoint = `${packingServiceUri}`;
        return super.list(endpoint, info);
    }

    searchUnacceptedPacking(info) {
        var endpoint = `${packingUnacceptedServiceUri}`;
        return super.list(endpoint, info);
    }

    getPackingById(id) {
        var endpoint = `${packingServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getPackingUnacceptedById(id) {
        var endpoint = `${packingUnacceptedServiceUri}/${id}`;
        return super.get(endpoint);
    }

    searchUnvoid(info) {
        var endpoint = `${packingReceiptUnvoidServiceUri}`;
        return super.list(endpoint, info);
    }
}