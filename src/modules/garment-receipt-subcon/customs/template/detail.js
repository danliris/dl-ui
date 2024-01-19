import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "../service";

@inject(Service)
export class Detail {
  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  uomView = (data) => {
    return `${data.Unit || data.unit || ""}`;
  };
}
