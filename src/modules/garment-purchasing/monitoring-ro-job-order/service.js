import { RestService } from '../../../utils/rest-service';

const serviceUri = 'monitoring/ro-job-order';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }
}