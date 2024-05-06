import { inject, useView } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";

@inject(DialogController)
@useView(
  "modules/merchandiser/ro-validation/dialog/reject.html"
)
export class RejectDialog {
  constructor(controller) {
    this.controller = controller;
    this.reason = null;
  }

  activate(params) {
    this.title = params.title;
  }
}
