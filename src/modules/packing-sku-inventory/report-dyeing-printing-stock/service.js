import { RestService } from '../../../utils/rest-service';
const serviceUri = 'stock-warehouse';
const avalServiceUri = 'aval-stock-report';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(dateReport, zona) {
        var endpoint = `${serviceUri}/xls?dateReport=${dateReport}&zona=${zona}`;

        return super.getXls(endpoint);
    }

    searchAval(info) {
        var endpoint = `${avalServiceUri}`;
        return super.list(endpoint, info);
    }

    generateExcelAval(date) {
        var endpoint = `${avalServiceUri}/xls?searchDate=${date}`;

        return super.getXls(endpoint);
    }
}