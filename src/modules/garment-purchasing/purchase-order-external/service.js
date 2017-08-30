import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'purchase-orders/externals/by-user';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    post(data) {
        var endpoint = 'purchase-orders/externals/post';
        return super.post(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    searchByTags(categoryId, keyword, shipmentDateFrom, shipmentDateTo) {
        var endpoint = 'purchase-orders/by-tags';
        var filter = {};
        if (keyword && shipmentDateFrom && shipmentDateTo) {
            filter = {
                categoryId: categoryId,
                shipmentDateFrom: moment(shipmentDateFrom).format("YYYY-MM-DD"),
                shipmentDateTo: moment(shipmentDateTo).format("YYYY-MM-DD"),
                tag: keyword
            };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        }
        else if (keyword) {
            filter = { categoryId: categoryId, tag: keyword };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        } else if (shipmentDateFrom && shipmentDateTo) {
            filter = {
                categoryId: categoryId,
                shipmentDateFrom: moment(shipmentDateFrom).format("YYYY-MM-DD"),
                shipmentDateTo: moment(shipmentDateTo).format("YYYY-MM-DD"),
            };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        } else {
            filter = { categoryId: categoryId };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        }
    }

    cancel(id) {
        var endpoint = `purchase-orders/externals/cancel/${id}`;
        return super.put(endpoint);
    }

    unpost(id) {
        var endpoint = `purchase-orders/externals/unpost/${id}`;
        return super.put(endpoint);
    }

    close(id) {
        var endpoint = `purchase-orders/externals/close/${id}`;
        return super.put(endpoint);
    }

    getPoId(id, select) {
        var endpoint = `purchase-orders/${id}`;
        //"productionOrder.orderNo","productionOrder.orderType.name", "productionOrder.material", "productionOrder.materialConstruction", "productionOrder.materialWidth"
        var info = { select: select };
        return super.get(endpoint, null, info);
    }
}
