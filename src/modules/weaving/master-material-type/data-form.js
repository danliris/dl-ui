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
    { header: "Kode Nomor Benang", value: "code" },
    { header: "Nomor Benang", value: "number" }
  ];

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    console.log(this.data);
    // this.ringDocuments = this.data.ringDocuments;
    // if (this.data.id) {
    //   this.ringDocuments = this.data.ringDocuments;
    //   this.ringDocumentsOptions = {};
    //   this.ringDocumentsOptions.code = "";
    //   this.ringDocumentsOptions.number = "";
    //   console.log(this.ringDocuments);
    // }

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
