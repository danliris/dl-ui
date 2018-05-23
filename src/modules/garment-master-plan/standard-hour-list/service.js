import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'standard-hours';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-master-plan");
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

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    getBuyerById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/garment-buyers/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getComodityById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-master-plan");
        var _serviceUri = `master-plan-comodities/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }
}