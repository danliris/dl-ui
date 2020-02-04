import { inject, bindable } from "aurelia-framework";
import numeral from "numeral";

export class DOSalesItem {
  @bindable TotalPacking;
  @bindable TotalLength;
  @bindable getTotalLengthConversion;

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    
    if (!this.data.TotalPacking) {
      this.data.TotalPacking = 0;
    }
    if (!this.data.TotalLength) {
      this.data.TotalLength = 0;
    }
    if (!this.data.TotalLengthConversion) {
      this.data.TotalLengthConversion = 0;
    }
    
    this.TotalPacking = this.data.TotalPacking;
    this.TotalLength = this.data.TotalLength;
    
    var totalLength = parseInt(this.TotalLength);
    this.getTotalLengthConversion = totalLength * 1.094;
    this.data.TotalLengthConversion = this.getTotalLengthConversion;
  }

  TotalPackingChanged(newValue, oldValue) {
    this.data.TotalPacking = this.TotalPacking;
  }

  TotalLengthChanged(newValue, oldValue) {
    this.data.TotalLength = this.TotalLength;
    var totalLength = parseInt(this.TotalLength);
    this.getTotalLengthConversion = totalLength * 1.094;
    this.data.TotalLengthConversion = this.getTotalLengthConversion;
  }

  TotalLengthConversionChanged(newValue, oldValue) {
    this.data.TotalLengthConversion = this.getTotalLengthConversion;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}
