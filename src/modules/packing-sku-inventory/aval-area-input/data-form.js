import {
    inject,
    bindable,
    computedFrom
  } from "aurelia-framework";
  var InspectionMaterialLoader = require("../../../loader/output-inspection-material-loader");
  
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
        },
    };
  
    constructor() {}

    bind(context) {
      this.context = context;
      this.data = this.context.data;
      this.error = this.context.error;
  
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
      return InspectionMaterialLoader;
    }
  
    shifts = ["PAGI", "SIANG"];

    dyeingPrintingItemsColumns = [
      {
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

    itemOptions = {
  
    }

    addItems = (e) => {
      this.data.AvalProductionOrders = this.data.AvalProductionOrders || [];
      this.data.AvalProductionOrders.push({});
    }
  
    // @computedFrom("data.id")
    // get isEdit() {
    //     return (this.data.id || '').toString() != '';
    // }
  }
  