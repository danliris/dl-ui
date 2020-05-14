import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  // @bindable ItemsCollection;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
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
    "No. SPP",
    "QTY Order",
    "QTY Masuk",
    "Buyer",
    "Konstruksi",
    "Jenis",
    "Warna",
    "Motif",
    "Grade",
    "Packaging",
    "Qty Packaging",
    "Satuan",
  ];
  shifts = ["PAGI", "SIANG"];

  constructor(service) {
    this.service = service;
  }

  detailOptions = {};
  groups = ["A", "B"];

  areaMovementTextFormatter = (areaInput) => {
    return `${areaInput.bonNo}`;
  };

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;

    this.data.area = "GUDANG JADI";

    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  addItemCallback = (e) => {
    this.data.warehousesProductionOrders =
      this.data.warehousesProductionOrders || [];
    this.data.warehousesProductionOrders.push({});
  };

  // @bindable selectedWarehouses;
  // selectedWarehousesChanged(n, o) {
  //   if (this.selectedWarehouses) {
  //     this.data.inputWarehousesId = this.selectedWarehouses.id;
  //     if (this.selectedWarehouses.warehousesProductionOrders) {
  //       // this.data.warehousesProductionOrders = this.selectedWarehouses.warehousesProductionOrders;
  //       this.data.bonNo = this.selectedWarehouses.bonNo;
  //     }

  //     this.detailOptions.destinationArea = this.data.destinationArea;
  //   }
  //   if (n != o) {
  //     if (this.selectedWarehouses) {
  //       this.data.inputWarehousesId = this.selectedWarehouses.id;
  //       this.data.bonNo = this.selectedWarehouses.bonNo;
  //     }
  //   }
  // }
}
