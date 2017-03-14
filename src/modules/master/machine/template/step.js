import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class Step {

  @bindable step;

  activate(context) {
    this.data = context.data;
    this.step = this.data.step;
    this.error = context.error;
    this.options = context.options;
  }

  autocompleteOption = {
    control: {
      length: 12
    }
  }

  stepChanged(newValue){
    if (newValue){
      this.data.step = newValue;
      this.data.stepId = newValue._id;
    }
    else{
      this.data.step = {};
      this.data.stepId = {};
    }
  }

  get loader() {
    return (keyword, query) => {
      const resource = 'master/steps';
      var config = Container.instance.get(Config);
      var endpoint = config.getEndpoint("core");
      return endpoint.find(resource)
        .then(results => {
          return results.data.map(step => {
            return step;
          })
        });
    };
  }
}