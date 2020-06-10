import { bindable, computedFrom } from 'aurelia-framework';

export class Item {
  @bindable Length;
  constructor() {
    this.error = {};
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.UnitLength = context.context.options.UnitLength;

    this.Length = this.data.Length;
    
    if (this.UnitLength == "MTR") {
      this.InputConversion = this.Length * 1.094;
    } else if (this.UnitLength == "YDS") {
      this.InputConversion = this.Length * 0.914;
    } else {
      this.InputConversion = 0;
    }
    this.data.InputConversion = this.InputConversion;
  }

  LengthChanged(newValue, oldValue) {
    if (this.Length && this.Length > 0) {
      this.data.Length = {};
      if (this.UnitLength == "MTR") {
        this.InputConversion = this.Length * 1.094;
      } else if (this.UnitLength == "YDS") {
        this.InputConversion = this.Length * 0.914;
      } else {
        this.InputConversion = 0;
      }
    } else {
      this.InputConversion = 0;
    }
    this.data.InputConversion = this.InputConversion;
    this.data.Length = this.Length;
  }
  
}
