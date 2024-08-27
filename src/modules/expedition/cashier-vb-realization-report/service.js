import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../utils/rest-service";

const serviceUri = 'cashier-vb-realization-report';

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) { 
       var endpoint = `${serviceUri}/reports?divisionName=${info.divisionName}&isInklaring=${info.isInklaring}&account=${info.account}&approvalDateFrom=${info.approvalDateFrom}&approvalDateTo=${info.approvalDateTo}&realizeDateFrom=${info.realizeDateFrom}&realizeDateTo=${info.realizeDateTo}`;
       return super.get(endpoint);
        
    }
    
  generateExcel(info) {
       var endpoint = `${serviceUri}/reports/xls?divisionName=${info.divisionName}&isInklaring=${info.isInklaring}&account=${info.account}&approvalDateFrom=${info.approvalDateFrom}&approvalDateTo=${info.approvalDateTo}&realizeDateFrom=${info.realizeDateFrom}&realizeDateTo=${info.realizeDateTo}`;
       return super.getXls(endpoint);
    }
}
