import {
    inject,
    bindable,
    computedFrom
  } from "aurelia-framework";
  var InspectionMaterialLoader = require("../../../loader/inspection-material-loader");
  
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
  
    constructor() {}

    bind(context) {
      this.context = context;
      this.data = this.context.data;
      this.error = this.context.error;
  
      this.cancelCallback = this.context.cancelCallback;
      this.deleteCallback = this.context.deleteCallback;
      this.editCallback = this.context.editCallback;
      this.saveCallback = this.context.saveCallback;

        if (this.data.id) {
          this.data.Date = this.data.date;
          this.data.Shift = this.data.shift;
        }
    }
  
    get inspectionMaterials() {
      return InspectionMaterialLoader;
    }
  
    areas = ["", "IM", "TRANSIT", "PACKING", "GUDANG BARANG JADI", "SHIPPING"];

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
      this.DyeingPrintingItems = this.DyeingPrintingItems || [];
      this.DyeingPrintingItems.push({});
    }
  
    // @computedFrom("data.id")
    // get isEdit() {
    //     return (this.data.id || '').toString() != '';
    // }
  }
  