import {bindable} from 'aurelia-framework'

export class Item {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
    this.context = context;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
  
}