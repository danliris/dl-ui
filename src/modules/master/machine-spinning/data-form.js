import { inject, bindable, computedFrom } from 'aurelia-framework';
var UOMLoader = require('../../../loader/uom-loader');
var UnitLoader = require('../../../loader/unit-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable Uom;
  @bindable Unit;
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

  typeOptions = []

  get uomLoader() {
    return UOMLoader;
  }
  get unitLoader() {
    return UnitLoader;
  }

  uomView = (uom) => {
    return `${uom.unit}`
  }

  unitView = (unit) => {
    return `${unit.name}`
  }

  UomChanged(newValue) {
    if (newValue &&newValue._id) {
      this.data.UomId = newValue._id;
      this.data.UomUnit = newValue.unit;
    }else{
      this.data.UomId = 0;
      this.data.UomUnit = null;
    }
  }

  UnitChanged(newValue) {
    if (newValue && newValue._id) {
      this.data.UnitId = newValue._id;
      this.data.UnitName = newValue.name;
      this.data.UnitCode = newValue.code;
    }else{
      this.data.UnitId = 0;
      this.data.UnitName = null;
      this.data.UnitCode = null;
    }
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.typeOptions = await this.context.service.getMachineTypes();
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if (this.data.UomId) {
      this.Uom = {};
      this.Uom._id = this.data.UomId;
      this.Uom.unit = this.data.UomUnit;
    }

    if (this.data.UnitId) {
      this.Unit = {};
      this.Unit._id = this.data.UnitId;
      this.Unit.name = this.data.UnitName;
      this.Unit.code = this.data.UnitCode;
    }
  }
} 
