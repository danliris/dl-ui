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
    this.data = {
      noMKB: 2,
      konstruksi: "CD 133 72 63 Rf Rf B B",
      kdBenang: "Rf RcRf",
      kdLusi: "CD01",
      jnsLusi: "CD17",
      qtyLusi: 75.98293,
      kdPakan: "CD03",
      jnsPakan: "CD17",
      qtyPakan: 65.98293,
      totalKebutuhan: 220.7084,
      ketMKB: ""
    };
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
