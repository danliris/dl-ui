import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../../rest-service';
import {SecureService} from '../../../../../utils/secure-service';

const serviceUri = require('../../../../../host').production+ '/v1/spinning/winding/production-outputs/by-user';

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

    update(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }
}