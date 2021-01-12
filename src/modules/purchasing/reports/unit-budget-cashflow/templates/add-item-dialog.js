import { inject, useView } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";

@inject(DialogController)
@useView("./add-item-dialog.html")
export class AddItemDialog {
  constructor(controller) {
    this.controller = controller;
    this.data = {};
    this.error = {};
    this.collection = {
      columns: ["MATA UANG", "NOMINAL VALAS", "NOMINAL IDR", "ACTUAL IDR"],
      onAdd: () => {
        this.data.Items.push({});
      },
    };
  }

  activate(data) {
    console.log("data", data);
    this.data = data;
    // this.data.Items = "";
    this.error = {};
  }

  save(context) {
    console.log("context", context);
  }
}
