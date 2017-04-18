import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'finishing-printing/reports/fabric-quality-control-report';
const fabricServiceUri = 'finishing-printing/quality-control/fabrics'

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (info.kanbanCode) {
            if (query === '') query = `kanbanCode=${info.kanbanCode}`;
            else query = `${query}&kanbanCode=${info.kanbanCode}`;
        }

        if (info.productionOrderNo) {
            if (query === '') query = `productionOrderNo=${info.productionOrderNo}`;
            else query = `${query}&productionOrderNo=${info.productionOrderNo}`;
        }

        if (info.productionOrderType) {
            if (query === '') query = `productionOrderType=${info.productionOrderType}`;
            else query = `${query}&productionOrderType=${info.productionOrderType}`;
        }

        if (info.shiftIm) {
            if (query === '') query = `shiftIm=${info.shiftIm}`;
            else query = `${query}&shiftIm=${info.shiftIm}`;
        }

        if (info.dateFrom) {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo) {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return endpoint;
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    searchFabricQC(info) {
        var endpoint = `${fabricServiceUri}`;
        return super.list(endpoint, info)
    }
}