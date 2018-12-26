import { inject, bindable, computedFrom } from "aurelia-framework";

export class DataForm {
  @bindable title;
  // @bindable readOnly;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan"
    // deleteText: "Hapus",
    // editText: "Ubah",
  };

  customOptions = {
    label: {
      align: "left"
    }
  };

  constructor(service) {
    this.service = service;
  }

  columns = [
    { header: "No SOP", value: "sopNoEBB" },
    { header: "No Konstruksi", value: "noKonstruksi" },
    { header: "Jumlah Order", value: "jmlOrder" },
    { header: "Jenis Lusi 1", value: "jnsLusiSatu" },
    { header: "Asal Lusi 1", value: "asalLusiSatu" },
    { header: "Qty", value: "qtyLusiSatu" },
    { header: "Jenis Lusi 2", value: "jnsLusiDua" },
    { header: "Asal Lusi 2", value: "asalLusiDua" },
    { header: "Qty", value: "qtyLusiDua" },
    { header: "Jenis Pakan 1", value: "jnsPknSatu" },
    { header: "Asal Pakan 1", value: "asalPknSatu" },
    { header: "Qty", value: "qtyPknSatu" },
    { header: "Jenis Pakan 2", value: "jnsPknDua" },
    { header: "Asal Pakan 2", value: "asalPknDua" },
    { header: "Qty", value: "qtyPknDua" },
    { header: "Jenis Pakan 3", value: "jnsPknTiga" },
    { header: "Asal Pakan 3", value: "asalPknTiga" },
    { header: "Qty", value: "qtyPknTiga" },
    { header: "Jenis Pakan 4", value: "jnsPknEmpat" },
    { header: "Asal Pakan 4", value: "asalPknEmpat" },
    { header: "Qty", value: "qtyPknEmpat" }
  ];

  months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Desember"
  ];

  // @computedFrom("data._id")
  // get isEdit() {
  //     return (this.data._id || '').toString() != '';
  // }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    // this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    // this.deleteCallback = this.context.deleteCallback;
    // this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }
}
