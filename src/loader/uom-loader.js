import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/uoms';

module.exports = function(keyword, filter) {

<<<<<<< HEAD
  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("core");

  return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data
        });
}
=======
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data.map(step => {
                step.toString = function () {
                    return `${this.unit}`;
                }
                return step;
            });
        });
}
>>>>>>> refs/remotes/danliris/dev
