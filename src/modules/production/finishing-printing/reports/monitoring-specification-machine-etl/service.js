import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const uriGRC = 'GetDataMonSpecMachine';
const uriDownload = 'downloadExcelMonSpecMachine';
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
        if (info.shift) {
            if (query === '') query = `shift=${info.shift}`;
            else query = `${query}&shift=${info.shift}`;
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
        var filename= "Monitoring Operational Harian " + info.area;
        return super.getXls_AF(endpoint,"", filename);
    }
}