import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class LampStandard {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  autocompleteOption = {
    control: {
      length: 12
    }
  }

  setLampStandardId(event) {
    this.data.lampStandardId = this.data.lampStandard._id;
  }

  get loader() {
    return (keyword, query) => {
      const resource = 'master/lamp-standards';
      var config = Container.instance.get(Config);
      var endpoint = config.getEndpoint("core");
      return endpoint.find(resource)
        .then(results => {
          return results.data.map(lamp => {
            return lamp;
          })
        });
    };
  }
}
