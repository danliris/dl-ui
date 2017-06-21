import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'purchase-orders/price';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing");
    }

    search(unitId, categoryId, PODLNo, PRNo, supplierId, dateFrom, dateTo, state,budgetId,staffName,productName) {
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&PODLNo=${PODLNo}&PRNo=${PRNo}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}&state=${state}&budgetId=${budgetId}&staffName=${staffName}&productName=${productName}`;
        return super.get(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    generateExcel(unitId, categoryId, PODLNo, PRNo, supplierId, dateFrom, dateTo, state,budgetId,staffName,productName) {
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&PODLNo=${PODLNo}&PRNo=${PRNo}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}&state=${state}&budgetId=${budgetId}&staffName=${staffName}&productName=${productName}`;
        return super.getXls(endpoint);
    }

}
