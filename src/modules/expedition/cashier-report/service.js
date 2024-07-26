import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../utils/rest-service";

const serviceUri = 'cashier-report';

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) { 
       var endpoint = `${serviceUri}/reports?divisionName=${info.divisionName}&isInklaring=${info.isInklaring}&approvalDateFrom=${info.approvalDateFrom}&approvalDateTo=${info.approvalDateTo}`;
       return super.get(endpoint);
        
    }
    
  generateExcel(info) {
       var endpoint = `${serviceUri}/reports/xls?divisionName=${info.divisionName}&isInklaring=${info.isInklaring}&approvalDateFrom=${info.approvalDateFrom}&approvalDateTo=${info.approvalDateTo}`;
       return super.getXls(endpoint);
    }
}
