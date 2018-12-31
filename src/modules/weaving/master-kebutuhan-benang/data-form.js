import { inject, bindable, computedFrom } from "aurelia-framework";

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable onCreated;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor(service) {
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  construction = ["", "AD", "BD", "CD"];

  lusiColumns = [
    { header: "Kode Lusi", value: "kodeLusi" },
    { header: "Jenis Lusi", value: "jnsLusi" },
    { header: "Qty(Gram/Meter)", value: "qtyLusi" },
    { header: "Keterangan", value: "ktrLusi" }
  ];
  pakanColumns = [
    { header: "Kode Pakan", value: "kodePakan" },
    { header: "Jenis Pakan", value: "jnsPakan" },
    { header: "Qty(Gram/Meter)", value: "qtyPakan" },
    { header: "Keterangan", value: "ktrPakan" }
  ];

  // @computedFrom("data._id")
  // get isEdit() {
  //     return (this.data._id || '').toString() != '';
  // }

  get addItemsLusi() {
    return event => {
      this.data.ItemsLusi.push({});
    };
  }

  get addItemsPakan() {
    return event => {
      this.data.ItemsPakan.push({});
    };
  }
}
