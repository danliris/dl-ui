
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = "clearance-vb";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "finance");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    post(data) {
        var endpoint = `${serviceUri}/post`;
        return super.put(endpoint, data);
    }

    unpost(data) {
        var endpoint = `${serviceUri}/unpost/${data.Id}`;
        return super.put(endpoint, data);
    }
}