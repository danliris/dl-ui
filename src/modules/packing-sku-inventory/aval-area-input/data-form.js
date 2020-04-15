import {
    inject,
    bindable,
    computedFrom
  } from "aurelia-framework";
  var InspectionMaterialLoader = require("../../../loader/inspection-material-loader");
  var UomLoader = require("../../../loader/uom-loader");
  
  export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;
  
    formOptions = {
      cancelText: "Kembali",
      saveText: "Simpan",
      deleteText: "Hapus",
      editText: "Ubah"
    };
  
    get inspectionMaterials() {
      return InspectionMaterialLoader;
    }
  
    get uoms() {
      return UomLoader;
    }
  
    shifts = ["", "PAGI", "SIANG"];
  
    constructor() {}
  
    // @computedFrom("data.id")
    // get isEdit() {
    //     return (this.data.id || '').toString() != '';
    // }

    bind(context) {
      this.context = context;
      this.data = this.context.data;
      this.error = this.context.error;
  
      this.cancelCallback = this.context.cancelCallback;
      this.deleteCallback = this.context.deleteCallback;
      this.editCallback = this.context.editCallback;
      this.saveCallback = this.context.saveCallback;

        if (this.data.id) {
          this.BonNo = this.data.bonNo;
          this.data.Shift = this.data.shift;
          this.data.CartNo = this.data.cartNo;
          this.data.UnitName = this.data.unit;
          this.data.Area = this.data.area;
          this.data.ProductionOrderType = this.data.productionOrderType;
          this.Uom = this.data.uomUnit;
          this.data.ProductionOrderQuantity = this.data.productionOrderQuantity;
          this.data.QtyKg = this.data.qtyKg;
        }
    }
  }
  