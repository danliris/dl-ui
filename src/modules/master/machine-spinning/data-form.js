import { inject, bindable, computedFrom } from 'aurelia-framework';
var UOMLoader = require('../../../loader/uom-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable Uom;
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

  typeOptions=["Blowing","Carding","Pre-Drawing","Finish-Drawing","Flyer","Ring Spinning","Winding"]

  get uomLoader() {
    return UOMLoader;
  }

  uomView = (uom) => {
    return `${uom.unit}`
  }

  UomChanged(newValue){
      if(newValue._id){
          this.data.UomId=newValue._id;
          this.data.UomUnit=newValue.unit;
      }
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if(this.data.UomId){
        this.Uom={};
        this.Uom._id=this.data.UomId;
        this.Uom.unit=this.data.UomUnit;
    }
  }
} 
