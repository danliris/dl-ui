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
    "Warna",
    "Quantity",
    "Rack",
    "Level",
    "Box",
    "Area",
];

  bind(context) {
   
    this.context = context;
    this.data = this.context.data;
    

    //binding Items from header
    this.data.Items=[];
    if(this.data)
    {
      var item ={};
      item.Rack = this.data.Rack;
      item.Box = this.data.Box;
      item.Colour = this.data.Colour;
      item.Level = this.data.Level;
      item.Area = this.data.Area;
      item.Quantity = this.data.RemainingQuantity;
      this.data.Items.push(item);
    }

    // console.log("data",this.data);
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
      this.data.Items.push({});
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
    };
  }

} 
