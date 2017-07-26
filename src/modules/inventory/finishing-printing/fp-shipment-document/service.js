import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';


const serviceUri = "inventory/fp-shipment-document";
const inventoryServiceUri = "inventory/inventory-summary";
const buyerServiceUri = "master/buyer";
const productServiceUri = "master/product";
const productionOrderServiceUri = "sales/production-order";

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory");
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

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    searchBuyer(info) {
        var endpoint = `${buyerServiceUri}`;
        return super.list(endpoint, info);
    }

    searchProductionOrder(info) {
        var endpoint = `${productionOrderServiceUri}`;
        return super.list(endpoint, info);
    }

    searchProducts(info) {
        var endpoint = `${productServiceUri}`;
        return super.list(endpoint, info);
    }

    searchInventory(info) {
        var endpoint = `${inventoryServiceUri}`;
        return super.list(endpoint, info);
    }

}