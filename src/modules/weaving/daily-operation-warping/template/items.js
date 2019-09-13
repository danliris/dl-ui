import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";

@inject(BindingEngine, Service)
export class Items {
  constructor(bindingEngine, service) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }
}
