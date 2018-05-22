import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = '';
// const serviceUri = "rates";
// const serviceUri = "efficiencies";



class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "md");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    getBudgetById(id) {
        var endpoint = `${serviceUri}/budget/${id}`;
        return super.getPdf(endpoint);
    }

    //cari ongkos
    searchRates(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }
    //cari efficiencies
    getEffByQty(qty) {
        var endpoint = `${serviceUri}/quantity/${qty}`;
        return super.get(endpoint);
    }

};


