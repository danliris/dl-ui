import { inject, useView, computedFrom } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";

@inject(DialogController)
@useView(
  "modules/weaving/estimated-production/dialogs/ep-sop-quantity-editor.html"
)
export class EpSopQuantityEditor {
  constructor(dialogController) {
    this.dialogController = dialogController;
  }

  additionalSOP = [];

  customTableFeatureOptions = {
    showColumns: false,
    search: false,
    showToggle: false
  };

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    // this.sopColumns = [
    // { field: "date", title: "Tanggal" },
    // { field: "sopNo", title: "No. SOP" }
    // ];
    // this.sopColumns.unshift("__check");
  }

  sopColumns = [
    {
      field: "isSOPChecked",
      title: "",
      checkbox: true,
      sortable: false,
      formatter: function(value, data, index) {
        this.checkboxEnabled = !data.isPosted;
        return "";
      }
    },
    { field: "date", title: "Tanggal" },
    { field: "sopNo", title: "No. SOP" }
  ];

  // pcsNo;
  activate(data) {
    this.data = data;
    // this.pcsNo = this.data && this.data.pcsNo ? this.data.pcsNo : "";
    // this.pcsLength = this.data && this.data.length ? this.data.length : 0;
    // this.pcsWidth = this.data && this.data.width ? this.data.width : 0;
  }

  saveCallback() {
    // var action = Promise.resolve(this.pcsNo);

    action
      .then(result => {
        this.dialogController.ok({
          // pcsNo: this.pcsNo,
          // pcsLength: this.pcsLength,
          // pcsWidth: this.pcsWidth
        });
      })
      .catch(error => {
        this.error = error;
      });
  }
}
