import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'master/sales-tax-groups';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}/ListPost`;
    return this.endpoint.post(endpoint, data)
        .catch(async e => {
            const result = await e.json();
            console.log(result);
            throw result;
        });
  }

  // update(data) {
  //   var endpoint = `${serviceUri}/ListPut/${data.Id}`;
  //   return this.endpoint.update(endpoint, null, data)
  //       .catch(async e => {
  //           const result = await e.json();
  //           throw result;
  //       });
  // }

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  downloadTemplate()
  {
      var endpoint = `${serviceUri}/download-template`;
      return super.getXls(endpoint);
  }

}
