import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../rest-service';
import {SecureService} from '../../../utils/secure-service';

const serviceUri = require('../../../host').purchasing+ '/v1/purchase-oders/by-user';
const serviceUriPODL = require('../../../host').purchasing+ '/v1/purchase-oders/externals';

export class Service extends SecureService {

    constructor(http, aggregator) {
        super(http, aggregator);
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
        var endpoint = require('../../../host').purchasing+ '/v1/purchase-oders/split';
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
    getPR(id)
    {
        var endpoint = `${serviceUriPr}/${id}`;
        return super.get(endpoint);
    }
}