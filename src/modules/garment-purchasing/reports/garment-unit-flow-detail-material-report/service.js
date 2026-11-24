import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const uriGRC = 'garment-flow-detail-material-reports';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }
    
    search(info) {
        var endpoint = `${uriGRC}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&dateFromCreate=${info.dateFromCreate}&dateToCreate=${info.dateToCreate}&unit=${info.unit}&category=${info.category}&productcode=${info.productcode}`;
        return super.get(endpoint);
    }

    xls(info) {
        let endpoint = `${uriGRC}/download-for-unit?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }

    xlsMII(info) {
        let endpoint = `${uriGRC}/download-for-mii?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }
}

const UnitServiceUri = 'master/garment-units';
export class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }
}

