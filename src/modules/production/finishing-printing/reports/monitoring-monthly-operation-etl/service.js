import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../utils/rest-service';

const uriGRC = 'GetMonitoringOPReport';
const uriDownload = 'GetMonitoringOPDownloadReport';

export class Service extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "dyeing");
    }
    
    search(info) {
        var endpoint = `${uriGRC}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = `${uriDownload}`;
        var query = '';
        if (info.area) {
            if (query === '') query = `area=${info.area}`;
            else query = `${query}&area=${info.area}`;
        }
        if (info.idmesin) {
            if (query === '') query = `idmesin=${info.idmesin}`;
            else query = `${query}&idmesin=${info.idmesin}`;
        }
        if (info.month) {
            if (query === '') query = `month=${info.month}`;
            else query = `${query}&month=${info.month}`;
        }
        if (info.year) {
            if (query === '') query = `year=${info.year}`;
            else query = `${query}&year=${info.year}`;
        }
        if (query !== '')
            endpoint = `${uriDownload}?${query}`;
        var filename= "Monitoring Monthly Operation Machine " + info.area;
        return super.getXls_AF(endpoint,"", filename);
    }
}