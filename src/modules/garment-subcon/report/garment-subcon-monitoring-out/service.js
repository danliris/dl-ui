import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'subcon-contracts/subcon-out-monitoring';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

search(info) { 
    console.log(info);
    var endpoint = `${serviceUri}?subconcontractNo=${info.subconcontractNo}&subconContractType=${info.subconContractType}&subconCategory=${info.subconCategory}`;
    return super.get(endpoint);
    
}
    
generateExcel(info) {
       var endpoint = `${serviceUri}/download?subconcontractNo=${info.subconcontractNo}&subconContractType=${info.subconContractType}&subconCategory=${info.subconCategory}`;
       return super.getXls(endpoint);
    }

}