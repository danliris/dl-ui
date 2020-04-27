import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
var InspectionAreaLoader = require("../../../loader/pre-input-aval-loader");
var UomLoader = require("../../../loader/uom-loader");

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
        Shift: this.Shift,
      },
    };

    this.data.AvalProductionIds = [];

    this.service.getPreAval(arg).then((result) => {
      if (result.data.length > 0) {
        result.data.forEach((dyeingPrintingArea) => {
          dyeingPrintingArea.preAvalProductionOrders.forEach(
            (productionOrder) => {
              this.data.AvalProductionIds.push(productionOrder.id);
              console.log(this.data.AvalProductionIds);

              this.data.AvalJointValue += productionOrder.avalConnectionLength;
              if (this.data.AvalJointValue > 0) {
                this.isAvalJointEditable = false;
              }

              this.data.AvalAValue += productionOrder.avalALength;
              if (this.data.AvalAValue > 0) {
                this.isAvalAEditable = false;
              }

              // this.data.AvalInducementValue += productionOrder.avalInducementLength;
              // if(this.data.AvalInducementValue > 0){
              //   this.isAvalInducementEditable = false;
              // }

              this.data.AvalBValue += productionOrder.avalBLength;
              if (this.data.AvalBValue > 0) {
                this.isAvalBEditable = false;
              }

              // this.data.AvalDirtyRopeValue += productionOrder.avalDirtyRopeLength;
              // if(this.data.AvalDirtyRopeValue > 0){
              //   this.isAvalDirtyRopeEditable = false;
              // }

              // this.data.AvalDirtyClothValue += productionOrder.avalDirtyClothLength;
              // if(this.data.AvalDirtyClothValue > 0){
              //   this.isAvalDirtyClothEditable = false;
              // }

              this.isHasData = true;
            }
          );
        });
      } else {
        this.isHasData = false;
      }
    });
  }

  reset() {
    this.data.Date = undefined;
    this.data.Shift = null;

    this.data.AvalJointValue = 0;
    this.data.AvalAValue = 0;
    this.data.AvalBValue = 0;
    this.data.AvalInducementValue = 0;
    this.data.AvalDirtyRopeValue = 0;
    this.data.AvalDirtyClothValue = 0;

    this.error = "";
  }

  dyeingPrintingItemsColumns = [
    {
      value: "avalType",
      header: "Jenis",
    },
    {
      value: "avalCartNo",
      header: "No. Kereta",
    },
    {
      value: "avalUomUnit",
      header: "Satuan",
    },
    {
      value: "avalQuantity",
      header: "Qty Satuan",
    },
    {
      value: "avalQuantityKg",
      header: "Qty KG",
    },
  ];

  itemOptions = {};

  addItems = (e) => {
    this.data.DyeingPrintingItems = this.data.DyeingPrintingItems || [];
    this.data.DyeingPrintingItems.push({});
  };
}
