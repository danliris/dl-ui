import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;

  constructor(service) {
    this.service = service;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    // deleteText: "Hapus",
    // editText: "Ubah",
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  itemColumns = [
  
    "Construction",
    
    // "Qty Order",
    // "Material",
    // "Unit",
    // "Buyer",
    // "Warna",
    // "Motif",
    // "Qty Packaging",
    // "Packaging",
    // "Jenis",
    // "Grade",
    // "Satuan",
    // "Qty Masuk",
    // "Zona Asal",
    ""
  ];



  detailOptions = {};

  areaMovementTextFormatter = (areaInput) => {
    return `${areaInput.bonNo}`;
  };

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  bind(context) {
    this.context = context;
    this.data = this.data;

    console.log(this.data);

    //this.data.area = "GUDANG JADI";

    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if (this.ItemsCollection) {
        this.ItemsCollection.bind();
    }
  }

  addItemCallback = (e) => {
    this.data.Detail=
      this.data.Detail || [];
    this.data.Detail.push({});

    console.log(this.data.Detail);
  };
}
