import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
var lampLoader = require('../../../../loader/lamp-standard-loader');

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
    return lampLoader;
  }
}
