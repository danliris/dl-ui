
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'monitoring-approval-gm';

class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        return super.list(serviceUri, info);
    }

    downloadExcel(info) {
        const query =
            `keyword=${encodeURIComponent(info.keyword || "")}` +
            `&filter=${encodeURIComponent(info.filter || "{}")}`;

        return super.getXls(
            `${serviceUri}/excel?${query}`
        );
    }
}

export { Service };
