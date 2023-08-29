import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'accounts-monitoring';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "auth");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/xls`;
        var query = '';
        console.log(info);
        if (info.userId) {
            if (query === '') query = `userId=${info.userId}`;
            else query = `${query}&userId=${info.userId}`;
        }
        if (info.menu) {
            if (query === '') query = `menu=${info.menu}`;
            else query = `${query}&menu=${info.menu}`;
        }
        if (query !== '')
        endpoint = `${endpoint}?${query}`;

    return super.getXls(endpoint);
    }

    _getEndPoint(info)
    {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (info.userId) {
            if (query === '') query = `userId=${info.userId}`;
            else query = `${query}&userId=${info.userId}`;
        }
        if (info.menu) {
            if (query === '') query = `menu=${info.menu}`;
            else query = `${query}&menu=${info.menu}`;
        }
       
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;
        
        return endpoint;
    }
}