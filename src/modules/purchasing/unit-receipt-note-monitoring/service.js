import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service'; 

const serviceUri = 'unit-receipt-notes/monitoring/by-user';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing");
    }

    search(no, PRNo, unitId, categoryId, supplierId, dateFrom, dateTo) {
        var endpoint = `${serviceUri}?no=${no}&PRNo=${PRNo}&unitId=${unitId}&categoryId=${categoryId}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.get(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    generateExcel(no, PRNo, unitId, categoryId, supplierId, dateFrom, dateTo) {
        var endpoint = `${serviceUri}?no=${no}&PRNo=${PRNo}&unitId=${unitId}&categoryId=${categoryId}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.getXls(endpoint);
    }

}
