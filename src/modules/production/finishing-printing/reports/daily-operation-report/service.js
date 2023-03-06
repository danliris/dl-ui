import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../utils/rest-service';

const uriGRC = 'GetDataExcelNew';

export class Service extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "dyeing");
    }
    
   
    // search(info) {
    //     var endpoint = `${uriGRC}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&unit=${info.unit}&category=${info.category}&productcode=${info.productcode}`;
    //     return super.get(endpoint); 
    // }

    search(info) {
        console.log("masuk fungsi search service.js");
        var endpoint = `${uriGRC}`;
        return super.list(endpoint, info);
    }
    

    // xls(info) {
    //     console.log(info)
    //     let endpoint = `${uriGRC}/download?${buildQueryString(info)}`;
    //     return super.getXls(endpoint);
    // }
}

// const UnitServiceUri = '../master/units';
// export class CoreService extends RestService {
//     constructor(http, aggregator, config, endpoint) {
//         super(http, aggregator, config, "core");
//     }

//     getSampleUnit(info) {
//         var endpoint = `${UnitServiceUri}`;
//         return super.list(endpoint, info);
//     }
// }