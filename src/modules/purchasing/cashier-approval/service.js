import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = 'cashier-approval';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    delete(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getVBNonPO(id){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("finance");
        const resource = `vb-non-po-request/${id}`;
        return _endpoint.find(resource)
            .then(result => {
                return result.data;
            });
    }

    getVBWithPO(id){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("finance");
        const resource = `vb-with-po-request/${id}`;
        return _endpoint.find(resource)
            .then(result => {
                return result.data;
            });
    }
}
