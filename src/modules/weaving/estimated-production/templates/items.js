import { inject, BindingEngine } from "aurelia-framework";

@inject(BindingEngine)
export class ItemView {
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
      console.log(context);
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }
}