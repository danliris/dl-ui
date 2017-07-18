import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'finishing-printing/quality-control/packings';
const productionOrderServiceUri = 'sales/production-orders';
const buyerServiceUri = "master/buyer";
const materialConstructionServiceUri = "master/material-construction";

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
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

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    searchProductionOrder(info) {
        var endpoint = `${productionOrderServiceUri}`;
        return super.list(endpoint, info);
    }

    getProductionOrderById(id, select) {
        var endpoint = `${productionOrderServiceUri}/${id}`;
        //"productionOrder.orderNo","productionOrder.orderType.name", "productionOrder.material", "productionOrder.materialConstruction", "productionOrder.materialWidth"
        var info = { select: select };
        return super.get(endpoint, null, info);
    }

    searchBuyer(info) {
        var endpoint = `${buyerServiceUri}`;
        return super.list(endpoint, info);
    }

    getBuyerById(id, select) {
        var endpoint = `${buyerServiceUri}/${id}`;
        var info = { select: select };
        return super.get(endpoint, null, info);
    }

    searchMaterialConstruction(info) {
        var endpoint = `${materialConstructionServiceUri}`;
        return super.list(endpoint, info);
    }

    getMaterialConstructionById(id, select) {
        var endpoint = `${materialConstructionServiceUri}/${id}`;
        var info = { select: select };
        return super.get(endpoint, null, info);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }
}