import { RestService } from '../../../utils/rest-service';

const serviceUri = 'aval-components';
const cuttingInUri = 'cutting-ins';
const sewingOutUri = 'sewing-outs';
const uomServiceUri = 'master/uoms';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    read(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getCuttingIn(info) {
        var endpoint = `${cuttingInUri}/complete`;
        return super.list(endpoint, info);
    }

    getSewingOut(info) {
        var endpoint = `${sewingOutUri}/dynamic`;
        return super.list(endpoint, info);
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
}

export { Service, CoreService }