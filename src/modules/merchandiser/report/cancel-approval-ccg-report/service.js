import { RestService } from '../../../../utils/rest-service'; 

const serviceUri = 'cost-calculation-garments/cancel-approval';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "sales");
  }

search(info) { 
        var endpoint = `${serviceUri}/report`;
        return super.list(endpoint,info);
    }
    
generateExcel(info) {
        var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}