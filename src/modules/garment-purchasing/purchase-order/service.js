import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
var moment = require('moment');

const serviceUri = 'purchase-orders/by-user';
const servicePRUri = 'purchase-requests/by-tags';

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

    split(data) {
        var endpoint = 'purchase-orders/split';
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

    searchByTags(keyword, shipmentDateFrom, shipmentDateTo) {
        var endpoint = `${servicePRUri}`;
        var filter = {};
        if (keyword && shipmentDateFrom && shipmentDateTo) {
            filter = {
                shipmentDateFrom: moment(shipmentDateFrom).format("YYYY-MM-DD"),
                shipmentDateTo: moment(shipmentDateTo).format("YYYY-MM-DD"),
                tag: keyword
            };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        }
        else if (keyword) {
            filter = { tag: keyword };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        } else if (shipmentDateFrom && shipmentDateTo) {
            filter = {
                shipmentDateFrom: moment(shipmentDateFrom).format("YYYY-MM-DD"),
                shipmentDateTo: moment(shipmentDateTo).format("YYYY-MM-DD"),
            };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        } else {
            return super.list(endpoint);
        }
    }
}