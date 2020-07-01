import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/cover-letters';
const packingListServiceUri = 'garment-shipping/packing-lists';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
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
        var endpoint = `${serviceUri}/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }

    getPackingListById(id) {
        var endpoint = `${packingListServiceUri}/${id}`;
        return super.get(endpoint);
    }
    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }
}

export { Service }