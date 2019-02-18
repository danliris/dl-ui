import { inject, BindingEngine } from "aurelia-framework";

@inject(BindingEngine)
export class ItemView {
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    this.data.amountTotal =
      this.data.wholeGrade * this.data.fabricConstructionDocument.totalYarn;

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }
}
