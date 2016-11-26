import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../rest-service';
import {SecureService} from '../../../../../utils/secure-service';

const serviceUri = require('../../../../../host').production+ '/v1/spinning/winding/production-outputs/by-user';
const serviceUriLot = require('../../../../../host').production+ '/v1/spinning/winding/search-lots';
export class Service extends SecureService {

    constructor(http, aggregator) {
        super(http, aggregator);
    }

    getLot(_productId,_machineId)
    {
        var endpoint = `${serviceUriLot}?_productId=${_productId}&_machineId=${_machineId}`;
        return super.get(endpoint);
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
}