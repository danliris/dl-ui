import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";
import moment from "moment";

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  @bindable date;
  @bindable shift;
  @bindable group;

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
    "__check",
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

  groups = ["A", "B"];

  itemOptions = {};

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

    this.data.Area = "GUDANG JADI";
    this.isHasData = false;

    // if (this.data.bonNo) {
    //   this.selectedWarehouses = {};
    //   this.selectedWarehouses.bonNo = this.data.bonNo;
    // }
  }

  Date = null;
  Shift = null;
  Group = null;

  dateChanged(newValue) {
    var errorIndex = 0;

    if (
      newValue == undefined ||
      newValue == null ||
      newValue == "" ||
      isNaN(newValue)
    ) {
      this.error.date = "Tanggal Harus Diisi";
      errorIndex++;
    } else {
      this.Date = newValue
        ? moment(newValue).format("DD MMM YYYY HH:mm")
        : null;
      this.data.Date = this.Date;
      this.error.date = "";
    }

    if (this.shift) {
      this.Shift = this.shift;
      this.data.Shift = this.Shift;
      this.error.shift = "";
    } else {
      this.error.shift = "Shift Harus Diisi";
      errorIndex++;
    }

    if (this.group) {
      this.Group = this.group;
      this.data.Group = this.Group;
      this.error.group = "";
    } else {
      this.error.group = "Group Harus Diisi";
      errorIndex++;
    }

    if (errorIndex == 0) {
      this.service
        .getPreWarehouse(this.Date, this.Shift, this.Group)
        .then((result) => {
          if (result.length > 0) {
            this.data.warehousesProductionOrders = result;
            this.isHasData = true;
          } else {
            this.isHasData = false;
          }
        });
    } else {
      this.isHasData = false;
    }
  }

  shiftChanged(newValue) {
    var errorIndex = 0;

    if (newValue) {
      this.Shift = newValue;
      this.data.Shift = newValue;
      this.error.shift = "";
    } else {
      this.error.shift = "Shift Harus Diisi";
      errorIndex++;
    }

    if (this.date) {
      this.Date = this.date
        ? moment(this.date).format("DD MMM YYYY HH:mm")
        : null;
      this.data.Date = this.Date;
      this.error.date = "";
    } else {
      this.error.date = "Tanggal Harus Diisi";
      errorIndex++;
    }

    if (this.group) {
      this.Group = this.group;
      this.data.Group = this.Group;
      this.error.group = "";
    } else {
      this.error.group = "Group Harus Diisi";
      errorIndex++;
    }

    if (errorIndex == 0) {
      this.service
        .getPreWarehouse(this.Date, this.Shift, this.Group)
        .then((result) => {
          if (result.length > 0) {
            this.data.warehousesProductionOrders = result;
            this.isHasData = true;
          } else {
            this.isHasData = false;
          }
        });
    } else {
      this.isHasData = false;
    }
  }

  groupChanged(newValue) {
    var errorIndex = 0;

    if (newValue) {
      this.Group = newValue;
      this.data.Group = newValue;
      this.error.group = "";
    } else {
      this.error.group = "Group Harus Diisi";
      errorIndex++;
    }

    if (this.date) {
      this.Date = this.date
        ? moment(this.date).format("DD MMM YYYY HH:mm")
        : null;
      this.data.Date = this.Date;
      this.error.date = "";
    } else {
      this.error.date = "Tanggal Harus Diisi";
      errorIndex++;
    }

    if (this.shift) {
      this.Shift = this.shift;
      this.data.Shift = this.Shift;
      this.error.shift = "";
    } else {
      this.error.shift = "Shift Harus Diisi";
      errorIndex++;
    }

    if (errorIndex == 0) {
      this.service
        .getPreWarehouse(this.Date, this.Shift, this.Group)
        .then((result) => {
          if (result.length > 0) {
            this.data.warehousesProductionOrders = result;
            this.isHasData = true;
          } else {
            this.isHasData = false;
          }
        });
    } else {
      this.isHasData = false;
    }
  }

  reset() {
    this.date = undefined;
    this.shift = this.shifts[0];
    this.group = this.groups[0];

    this.Date = null;
    this.Shift = null;
    this.Group = null;

    this.data.Date = null;
    this.data.Shift = null;
    this.data.Group = null;

    this.isHasData = false;

    this.error.date = "";
    this.error.shift = "";
    this.error.group = "";
  }

  onCheckAll(event) {
    for (var item of this.data.warehousesProductionOrders) {
      item.Select = event.detail.target.checked;
    }
  }
}
