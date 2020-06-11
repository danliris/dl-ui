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
    
  }

}
