import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
var colorLoader = require('../../../../loader/color-type-loader');

export class DetailItem {
  @bindable ColorType;
  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    this.ColorType = this.data.ColorType
    console.log(this.data);
  }

  controlOption = {
    control: {
      length: 12
    }
  }
  ColorTypeChanged() {
    if (this.ColorType) {
      console.log(this.ColorType);
      this.data.Color = this.ColorType.Name;
      this.data.ColorType = this.ColorType;
    } else {
      this.data.ColorType = {};
      // this.data.colorTypeId = {};
      this.data.Color = '';
    }
  }
  get loader() {
    return colorLoader;
  }
}
