import { RestService } from '../../../utils/rest-service';

const serviceUri = 'monitoring-approval-gm';

class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        return super.list(serviceUri, info);
    }
}

export { Service }