import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import moment from 'moment';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

    search(info) {
        var endpoint = `purchase-orders/externals/not-approved`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `purchase-orders/externals/by-user/${id}`;
        return super.get(endpoint);
    }

    approve(data) {
        var endpoint = 'purchase-orders/externals/approve';
        return super.post(endpoint, data);
    }

    getListUsedBudget(purchaseRequestNo, purchaseRequestRefNo, productCode, purchaseOrderExternalNo) {
        var endpoint = 'purchase-orders/externals/get-budget';
        var filter = {};
        if (purchaseOrderExternalNo) {
            filter = {
                purchaseRequestNo: purchaseRequestNo,
                purchaseRequestRefNo: purchaseRequestRefNo,
                productCode: productCode,
                purchaseOrderExternalNo: purchaseOrderExternalNo
            };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        }
        else {
            filter = {
                purchaseRequestNo: purchaseRequestNo,
                purchaseRequestRefNo: purchaseRequestRefNo,
                productCode: productCode
            };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        }
    }

    getPRById(id, select) {
        var endpoint = `purchase-requests/${id}`;
        var info = { select: select };
        return super.get(endpoint, null, info);
    }

    getPoId(id, select) {
        var endpoint = `purchase-orders/${id}`;
        //"productionOrder.orderNo","productionOrder.orderType.name", "productionOrder.material", "productionOrder.materialConstruction", "productionOrder.materialWidth"
        var info = { select: select };
        return super.get(endpoint, null, info);
    }
}