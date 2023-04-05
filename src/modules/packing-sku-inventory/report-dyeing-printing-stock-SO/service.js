import { RestService } from '../../../utils/rest-service';
const serviceUri = 'stock-opname-warehouse';
//const avalServiceUri = 'aval-stock-report';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}/report-so`;
        return super.list(endpoint, info);
    }

    searchPacking(info) {
        var endpoint = `${serviceUri}/packing`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {

        var endpoint = `${serviceUri}/report-so-xls`;
        var query = '';
        // if (info.dateFrom) {
        //     if (query === '') query = `dateFrom=${info.dateFrom}`;
        //     else query = `${query}&dateFrom=${info.dateFrom}`;
        // }
        // if (info.dateTo) {
        //     if (query === '') query = `dateTo=${info.dateTo}`;
        //     else query = `${query}&dateTo=${info.dateTo}`;
        // }
        if (info.dateFrom) {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo) {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (info.barcode) {
            if (query === '') query = `barcode=${info.barcode}`;
            else query = `${query}&barcode=${info.barcode}`;
        }

        if (info.track) {
            if (query === '') query = `track=${info.track}`;
            else query = `${query}&track=${info.track}`;
        }
        if (info.productionOrderId) {
            if (query === '') query = `productionOrderId=${info.productionOrderId}`;
            else query = `${query}&productionOrderId=${info.productionOrderId}`;
        }
        
        if (query !== '')
            endpoint = `${endpoint}?${query}`;

        return super.getXls(endpoint);
    }

    searchAval(info) {
        var endpoint = `${avalServiceUri}`;
        return super.list(endpoint, info);
    }
}