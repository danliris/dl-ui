import { inject, bindable, computedFrom } from 'aurelia-framework';
var UOMLoader = require('../../../loader/uom-loader');
var TRXLoader = require('../../../loader/garment-transaction-type-loader');


export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable filterUom;
  @bindable filterTrxType;
  @bindable listItem = ['BB', 'BP', 'BE', 'AVAL'];
  @bindable Name;
  
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  }

  unitname = null;
  trxtypename = null;
  

  @computedFrom("data._id")
  get isEdit() {
    return (this.data._id || '').toString() != '';
  }

    uomView = (uom) => { 
        return `${uom.Unit}`
    }
   
    get uomLoader() {
        return UOMLoader;
    }

   filterUomChanged(newValue){
        var selectedUom = newValue;
        console.log(selectedUom)
        if(selectedUom){
            this.data.UomId = selectedUom.Id;
            this.data.UomUnit = selectedUom.Unit;
        }
    }


    trxtypeView = (trxtype) => { 
        return `${trxtype.Code}`
    }
   
    get trxtypeLoader() {
        return TRXLoader;
    }

   filterTrxTypeChanged(newValue){
        var selectedTrxType = newValue;
        console.log(selectedTrxType)
        if(selectedTrxType){
            this.data.ProductTypeId = selectedTrxType.Id;
            this.data.ProductTypeCode = selectedTrxType.Code;
            this.data.ProductTypeName = selectedTrxType.Name;
        }
    }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    console.log(this.data)
    this.error = this.context.error;
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if(this.data.Id){
           this.filterUom = {};
           this.filterUom.Id = this.data.UomId;
           this.filterUom.Unit = this.data.UomUnit;
   
           this. filterTrxType = {};
           this. filterTrxType.Id   = this.data.ProductTypeId;
           this. filterTrxType.Code = this.data.ProductTypeCode;
           this. filterTrxType.Name = this.data.ProductTypeName;
           this.Name = this.data.Name;
    }
  }
  generateCodeByName(name) {
    if (!name) return;

    const words = name
        .trim()
        .split(/\s+/)
        .filter(x => x);

    let code = "";

    if (words.length === 1) {
        code = words[0].substring(0, 4);
    }
    else if (words.length === 2) {
        if (words[1].length === 1) {
            // Contoh: DANLIRIS G -> DANG
            code = words[0].substring(0, 3) +
                   words[1].substring(0, 1);
        } else {
            // Contoh: DANLIRIS GROUP -> DAGR
            code = words[0].substring(0, 2) +
                   words[1].substring(0, 2);
        }
    }
    else if (words.length === 3) {
        code = words[0].substring(0, 2) +
               words[1].substring(0, 1) +
               words[2].substring(0, 1);
    }
    else {
        code = words
            .slice(0, 4)
            .map(word => word[0])
            .join('');
    }

    this.data.Code = code.toUpperCase();
  }
  NameChanged(newValue) {
    if (this.readOnly || this.isEdit) return;

    if(newValue){
        this.Name = newValue;
        this.data.Name = this.Name;
        this.generateCodeByName(this.Name);
    }else{
      this.Name = "";
      this.data.Name = this.Name;
      this.data.Code = "";
    }
  }
} 
