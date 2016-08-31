import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../rest-service';
 
const serviceUri = require('../../../host').core + '/v1/po/garmentjoborderfabrics';
const serviceUriPODL = require('../../../host').core + '/v1/po/garmentjoborderfabrics/podl';

export class Service extends RestService{

  constructor(http, aggregator) {
        super(http, aggregator);
    }

    search(keyword) {
        var endpoint = `${serviceUri}?keyword=${keyword}`;
        return super.get(endpoint);
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
    
    searchPODL(keyword) {
        var endpoint = `${serviceUriPODL}?keyword=${keyword}`;
        return super.get(endpoint);
    }

    getPODLById(id) {
        var endpoint = `${serviceUriPODL}/${id}`;
        return super.get(endpoint);
    }

    createGroup(data) {
        var endpoint = `${serviceUriPODL}`;
        return super.post(endpoint, data);
    }
}
