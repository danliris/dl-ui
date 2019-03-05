import { inject, bindable, computedFrom } from "aurelia-framework";
import { callbackify } from "util";

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable ringDocuments;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor() {}

  ringDocumentsColumns = [
    { header: "Kode Nomor Benang", value: "Code" },
    { header: "Nomor Benang", value: "Number" }
  ];

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    
    if (this.data.Id) {
      this.ringDocumentsOptions = {};
      this.ringDocumentsOptions.Code = "";
      this.ringDocumentsOptions.Number = "";
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  //Triggered when "+" on Items Collections Clicked
  get addRingDocuments() {
    return event => {
      this.data.RingDocuments.push({});
    };
  }
}
