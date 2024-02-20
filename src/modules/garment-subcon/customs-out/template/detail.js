import { computedFrom } from "aurelia-framework";

export class Detail {
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;

    this.itemOptions = context.context.options;
    this.isShowing = true;
  }

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }
}
