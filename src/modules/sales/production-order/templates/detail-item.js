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

  setColorTypeId(event) {
    var colorType = event.detail;
    this.data.colorTypeId = colorType._id;
  }

  get loader() {
    return colorLoader;
  }
}
