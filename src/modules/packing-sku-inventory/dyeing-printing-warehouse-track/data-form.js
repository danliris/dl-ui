import { inject, bindable, computedFrom,BindingEngine } from 'aurelia-framework';

@inject(BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable tipe;

  tipeitems= ['','IN','OUT'] 

  constructor(service,bindingEngine) {
    this.bindingEngine = bindingEngine;
    this.service = service;

    this.formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
    };
  }

  controlOptions = {
    label: {
        align: "right",
        length: 4
    },
    control: {
        length: 5,

    }
  }

  columns= [
    "Qty Packing",
    "Qty Satuan",
    "Qty Total",
    "Jalur / Rak",
    "Keterangan"
];

  bind(context) {
   
    this.context = context;
    this.data = this.context.data;
    

    //binding Items from header
    this.data.Items=[];
    if(this.data)
    {
      var item ={};
      item.packagingQtyRemains = this.data.packagingQtyRemains;
      item.track = this.data.track;
      item.packagingLength = this.data.packagingLength;
      item.description = this.data.description;
      item.productPackingCode = this.data.productPackingCode;
      item.isRead = true;
     
      this.data.Items.push(item);
    }
    //this.data.Items;
     console.log("data",this.data.Items);
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.saveCallback = this.context.saveCallback;

    this.isItems=true;

    this.itemOptions = {
      datas : this.data,
      isCreate: this.context.isCreate,
      isView: this.context.isView,
      checkedAll: this.context.isCreate == true ? false : true,
      isEdit: this.data.isEdit,
    };

    // console.log("option",this.itemOptions);
  }

  get addItems() {
    return (event) => {
      this.data.Items.push({

      packagingQtyRemains : this.data.packagingQtyRemains,
      track : this.data.track,
      packagingLength : this.data.packagingLength,
      packagingQtySplit : this.data.packagingQtyRemains,
      description : this.data.description,
      productPackingCode : this.data.productPackingCode,
      isRead : false
      });
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
    };
  }

} 
