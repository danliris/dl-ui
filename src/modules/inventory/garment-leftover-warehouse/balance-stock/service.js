import { RestService } from '../../../../utils/rest-service';

const serviceUri = "garment/leftover-warehouse/balance-stocks";
const uomServiceUri = 'master/uoms';
const garmentProductsServiceUri = 'master/garmentProducts';

class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
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
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }
}

class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getUom(info) { 
        var endpoint = `${uomServiceUri}`;
        return super.list(endpoint, info);
    }
    
    getGarmentProducts(info) {
        var endpoint = `${garmentProductsServiceUri}`;
        return super.list(endpoint, info);
    }
}


export { Service, CoreService }