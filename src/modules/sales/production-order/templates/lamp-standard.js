import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class LampStandard {

  @bindable lampStandard;

  activate(context) {
    this.data = context.data;
    this.lampStandard = this.data.lampStandard;
    this.error = context.error;
    this.options = context.options;
  }

  autocompleteOption = {
    control: {
      length: 12
    }
  }

  lampStandardChanged(newValue){
    if (newValue){
      this.data.lampStandard = newValue;
      this.data.lampStandardId = newValue._id;
    }
    else{
      this.data.lampStandard = {};
      this.data.lampStandardId = {};
    }
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
