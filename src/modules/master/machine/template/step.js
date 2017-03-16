import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

var StepLoader = require('../../../../loader/step-loader');

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

  get StepLoader() {
    return StepLoader;
  }
}
