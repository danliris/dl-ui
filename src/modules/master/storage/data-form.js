import { inject, bindable, computedFrom } from 'aurelia-framework';
var UnitLoader = require('../../../loader/unit-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  }
  @computedFrom("data._id")
  get isEdit() {
    return (this.data._id || '').toString() != '';
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  unitChanged(e) {
        var selectedUnit = e.detail;
        if (selectedUnit)
            this.data.unitId = selectedUnit._id;
            
    }

  get unitLoader() {
        return UnitLoader;
    }
  
  unitView = (unit) => {
        return `${unit.division.name} - ${unit.name}`;
    }
} 
