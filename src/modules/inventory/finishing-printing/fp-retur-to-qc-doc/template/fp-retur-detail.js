import {bindable} from 'aurelia-framework';
import { Config } from "aurelia-api";
import { Container } from 'aurelia-dependency-injection';

export class FPReturToQCDetail {
  @bindable selectedDealUom
  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    if(this.data){
      this.data.designName=this.data.designCode + ' - '+ this.data.designNumber;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}