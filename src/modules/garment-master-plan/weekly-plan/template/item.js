import {bindable} from 'aurelia-framework'

export class DeliveryOrder {
  activate(context) {
    this.data = context.data;
    this.options = context.options; 
    this.context = context;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
  
}