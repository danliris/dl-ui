import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import moment from "moment";

let AvailableWarehouseInputLoader = require("../../../loader/input-warehouses-loader");

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  // @bindable DyeingPrintingItems;

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
    },
  };

  itemOptions = {};

  constructor(service) {
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.service = this.context.service;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    this.isHasData = false;

    this.data.Area = "GUDANG AVAL";
    if (this.data.id) {
      this.data.Date = this.data.date;
      this.data.Shift = this.data.shift;
      this.data.Group = this.data.group;
      this.data.DestinationArea = this.data.destinationArea;
      if (this.data.avalItems.length > 0) {
        this.data.DyeingPrintingItems = this.data.avalItems;
        this.isHasData = true;
      }
    }
  }

  shifts = ["PAGI", "SIANG"];

  destinationAreas = ["SHIPPING"];

  groups = ["A", "B"];

  get availableWarehouseInputs() {
      return AvailableWarehouseInputLoader;
  }

  ExportToExcel() {
      this.service.generateExcelReportById(this.data.id);
  }

  // Date = null;
  // Shift = null;
  // Group = null;

  // searching() {
  //   var errorIndex = 0;

  //   this.data.AvalJointValue = 0;
  //   this.data.AvalAValue = 0;
  //   this.data.AvalBValue = 0;
  //   this.data.AvalInducementValue = 0;
  //   this.data.AvalDirtyRopeValue = 0;
  //   this.data.AvalDirtyClothValue = 0;

  //   if (
  //     this.data.Date == undefined ||
  //     this.data.Date == null ||
  //     this.data.Date == "" ||
  //     isNaN(this.data.Date)
  //   ) {
  //     this.error.Date = "Tanggal Harus Diisi";
  //     errorIndex++;
  //   } else {
  //     this.Date = this.data.Date
  //       ? moment(this.data.Date).format("DD MMM YYYY HH:mm")
  //       : null;
  //     this.error.Date = "";
  //   }

  //   if (
  //     this.data.Shift == undefined ||
  //     this.data.Shift == null ||
  //     this.data.Shift == ""
  //   ) {
  //     this.error.Shift = "Shift Harus Diisi";
  //     errorIndex++;
  //   } else {
  //     this.Shift = this.data.Shift;
  //     this.error.Shift = "";
  //   }

  //   if (
  //     this.data.Group == undefined ||
  //     this.data.Group == null ||
  //     this.data.Group == ""
  //   ) {
  //     this.error.Group = "Group Harus Diisi";
  //     errorIndex++;
  //   } else {
  //     this.Group = this.data.Group;
  //     this.error.Group = "";
  //   }

  //   if (errorIndex == 0) {
  //     this.data.DyeingPrintingMovementIds = [];

  //     this.service.getAvailableAval(this.Date, this.Shift, this.Group).then((result) => {
  //       if (result.length > 0) {

  //         result.forEach((datum) => {
  //           var DyeingPrintingMovementIds = {};
  //           DyeingPrintingMovementIds.DyeingPrintingMovementId =
  //             datum.avalInputId;
  //           DyeingPrintingMovementIds.AvalItemId = datum.avalItemId;

  //           this.data.DyeingPrintingMovementIds.push(DyeingPrintingMovementIds);
  //           this.isHasData = true;
  //         });

  //         this.data.DyeingPrintingItems = result;
  //         console.log(this.data);
  //       } else {
  //         this.isHasData = false;
  //       }
  //     });
  //   } else {
  //     this.error.Date;
  //     this.error.Shift;
  //   }
  // }

  // reset() {
  //   this.data.Date = undefined;

  //   this.Date = null;
  //   this.Shift = null;

  //   this.isHasData = false;

  //   this.error.Date = "";
  //   this.error.Shift = "";
  // }

  itemColumns = [
    {
      value: "productionOrderNo",
      header: "No. SPP",
    },
    {
      value: "doNo",
      header: "No. DO",
    },
    {
      value: "productionOrderOrderQuantity",
      header: "Qty Order",
    },
    {
      value: "buyer",
      header: "Buyer",
    },
    {
      value: "construction",
      header: "Konstruksi",
    },
    {
      value: "typeORpackagingType",
      header: "Jenis",
    },
    {
      value: "color",
      header: "Warna",
    },
    {
      value: "motif",
      header: "Motif",
    },
    {
      value: "grade",
      header: "Grade",
    },
    {
      value: "packagingQty",
      header: "QTY Packing",
    },
    {
      value: "packingORpackingInstruction",
      header: "Packing",
    },
    {
      value: "uomUnit",
      header: "Satuan",
    },
    {
      value: "outQuantity",
      header: "Qty Keluar",
    },
    {
      value: "balance",
      header: "Saldo",
    },
  ];

  addItem = (e) => {
    this.data.warehousesProductionOrders = this.data.warehousesProductionOrders || [];
    this.data.warehousesProductionOrders.push({});
  };
}
