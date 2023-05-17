import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'machine';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "customs-report");
    }

    search(info) {
        var endpoint = `${serviceUri}/machiness`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/machines/${id}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/machines/${data.MachineID}`;
        return super.put(endpoint, data);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download?tipe=${info.tipe}&ctg=${info.ctg}&serial=${info.serial}`;
        return super.getXls(endpoint);
    }

}

export { Service }