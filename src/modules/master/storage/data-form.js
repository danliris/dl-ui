import { inject, bindable, computedFrom } from 'aurelia-framework';
var UnitLoader = require('../../../loader/unit-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable selectedUnit;
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
    if(this.data.unit){
      this.selectedUnit=this.data.unit;
    }
  }

  selectedUnitChanged(newdata) {
        var _selectedUnit = newdata;
        if (_selectedUnit){
          console.log(_selectedUnit)
            this.data.unitId = _selectedUnit._id || _selectedUnit.Id || "" ;
            this.data.unit=_selectedUnit;
            this.data.unit._id=_selectedUnit._id || _selectedUnit.Id || "";
            this.data.unit.name=_selectedUnit.name || _selectedUnit.Name || "";
            this.data.unit.code=_selectedUnit.code || _selectedUnit.Code || "";
            this.data.unit.division=_selectedUnit.division || _selectedUnit.Division || {};
            this.data.unit.division._id=_selectedUnit.division._id || _selectedUnit.Division.Id || "";
            this.data.unit.division.name=_selectedUnit.division.name || _selectedUnit.Division.Name || "";
            this.data.unit.division.code=_selectedUnit.division.code || _selectedUnit.Division.Code || "";
        }
    }

  get unitLoader() {
        return UnitLoader;
    }
  
  unitView = (unit) => {
        return unit.division ?`${unit.division.name} - ${unit.name}` : `${unit.Division.Name} - ${unit.Name}`
    }
} 
