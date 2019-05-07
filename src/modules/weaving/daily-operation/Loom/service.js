import { RestService } from "../../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";
const serviceUri = 'weaving/daily-operations-loom';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "weaving");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getUnitById(Id) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/units/${Id}`;

        return _endpoint.find(_serviceUri).then(result => {
            return result.data;
        });
    }
}