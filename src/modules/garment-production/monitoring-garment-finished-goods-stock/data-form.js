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
    "Box",
    "Quantity",
    "Rack",
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
      item.Quantity = this.data.Quantity;
      this.data.Items.push(item);
    }

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

    get totalSplitQuantity() {
    if (!this.data || !this.data.Items) {
      return 0;
    }

    return this.data.Items.reduce((total, item) => {
      return total + (parseFloat(item.Quantity) || 0);
    }, 0);
  }

} 