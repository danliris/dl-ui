import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../utils/rest-service';

const serviceUri = 'garment-unit-receipt-notes/laporan';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }
    search(info) {
        var endpoint = `${serviceUri}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&unit=${info.unit}&category=${info.category}`;
        return super.get(endpoint);
    }
    generateXls(unit,  category, dateFrom, dateTo, unitname, categoryname) { 
        console.log(unit,  category, dateFrom, dateTo);
        var endpoint = `${serviceUri}/download?unit=${unit}&category=${category}&categoryname=${categoryname}&unitname=${unitname}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
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
