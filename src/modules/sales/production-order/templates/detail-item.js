import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
var colorLoader = require('../../../../loader/color-type-loader');

export class DetailItem {
  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
  }

  controlOption = {
    control: {
      length: 12
    }
  }

  setColorTypeId(newValue) {
    if (newValue){
      this.data.colorType = newValue;
      this.data.colorTypeId = newValue._id;
    }
    else{
      this.data.colorType = {};
      this.data.colorTypeId = {};
    }
  }

  get loader() {
    return colorLoader;
  }
}
