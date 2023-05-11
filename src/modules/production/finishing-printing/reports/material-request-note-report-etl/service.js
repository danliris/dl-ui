import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../utils/rest-service';

const uriGRC = 'GetMaterialRequestReport';
const uriDownload = 'GetMaterialRequestDownloadReport';

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
        if (info.unit) {
            if (query === '') query = `unit=${info.unit}`;
            else query = `${query}&unit=${info.unit}`;
        }
        if (info.startdate) {
            if (query === '') query = `startdate=${info.startdate}`;
            else query = `${query}&startdate=${info.startdate}`;
        }
        if (info.finishdate) {
            if (query === '') query = `finishdate=${info.finishdate}`;
            else query = `${query}&finishdate=${info.finishdate}`;
        }
        if (query !== '')
            endpoint = `${uriDownload}?${query}`;
        var filename= "Laporan SPB";
        return super.getXls_AF(endpoint,"", filename);
    }
}