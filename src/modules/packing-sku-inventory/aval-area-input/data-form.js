import {
  inject,
  bindable,
} from "aurelia-framework";
import {
  Service
} from "./service";
var InspectionAreaLoader = require("../../../loader/pre-input-aval-loader");
var UomLoader = require("../../../loader/uom-loader");

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  @bindable DyeingPrintingItems;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    // deleteText: "Hapus",
    // editText: "Ubah"
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    }
  };

  // tableOptions = {
  //   search: false,
  //   showToggle: false,
  //   showColumns: false,
  //   pagination: false
  // }

  itemOptions = {

  }

  constructor(service) {
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.service = this.context.service;
    this.data = this.context.data;
    this.error = this.context.error;

    this.isEditable = false;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    this.data.Area = "GUDANG AVAL";
    if (this.data.id) {
      this.data.Date = this.data.date;
      this.data.Shift = this.data.shift;
      this.BonNo = this.data.bonNo;
      this.data.AvalProductionOrders = this.data.avalProductionOrders;
    }
  }

  get inspectionMaterials() {
    return InspectionAreaLoader;
  }

  get uoms() {
    return UomLoader;
  }

  shifts = ["PAGI", "SIANG"];

  Date = null;
  Shift = null;
  DummyResult=[{},{},{},{},{},{}]

  searching() {
    if (this.data.Date) {
      this.Date = this.data.Date;
    }
    if (this.data.Shift) {
      this.Shift = this.data.Shift;
    }

    var arg = {
      filter: {
        Date: this.Date,
        Shift: this.Shift
      }
    };
    
    this.service.getPreAval(arg)
      .then(result => {
        if (result.length > 0) {
          this.data.AvalProductionOrders = result;
        } else {
          this.data.AvalProductionOrders = [];
        }
      });
  }

  reset() {
    this.data.Date = null;
    this.data.Shift = null;
    this.data.AvalProductionOrders = [];

    this.error = '';
  }

  dyeingPrintingItemsColumns = [{
      value: "productionOrderType",
      header: "Jenis"
    },
    {
      value: "cartNo",
      header: "No. Kereta"
    },
    {
      value: "uomUnit",
      header: "Satuan"
    },
    {
      value: "productionOrderQuantity",
      header: "Qty Satuan"
    },
    {
      value: "qtyKg",
      header: "Qty KG"
    }
  ];

  // addItems = (e) => {
  //   this.data.AvalProductionOrders = this.data.AvalProductionOrders || [];
  //   this.data.AvalProductionOrders.push({});
  // }

  // @computedFrom("data.id")
  // get isEdit() {
  //     return (this.data.id || '').toString() != '';
  // }
}
