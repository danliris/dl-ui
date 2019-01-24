import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUri = 'count-configurations';
const lotYarnServiceUri = "lot/configuration";

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "spinning");
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
        console.log(data)
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getLotByYarnType(yarnType,finishingDrawing){
        var endpoint = `${lotYarnServiceUri}/getLotByYarn/${yarnType}/${finishingDrawing}`;
        return super.get(endpoint);
    }

    // getLot(keyword, filter) {
    //     var config = Container.instance.get(Config);
    //     var endpoint = config.getEndpoint("core-azure");

    //     return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), order: JSON.stringify({ "name": "asc" }) })
    //         .then(results => {
    //             return results.data;
    //         });
    // }

    // getYarn(yarnType) {
    //     var config = Container.instance.get(Config);
    //     var _endpoint = config.getEndpoint("core");
    //     var _serviceUri = `master/budget-currencies/by-code?code=${code}&date=${date}`;

    //     return _endpoint.find(_serviceUri)
    //         .then(result => {
    //             return result.data;
    //         });
    // }

}