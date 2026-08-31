import { inject, bindable, computedFrom,BindingEngine } from 'aurelia-framework';
import moment from "moment";

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
    "Lot",
    "Batch",
    "No Package",
    "Handling Unit",
    "Rack",
    "Level",
    "Box",
    "Area",
];

  bind(context) {
   
    this.context = context;
    this.data = this.context.data;
    
    this.data.Items=[];
    if(this.data)
    {
      const isFabric =
      this.data.ProductName &&
      this.data.ProductName.toUpperCase() === "FABRIC";

      var item ={};
      item.ProductName = this.data.ProductName;
      item.Rack = this.data.Rack;
      item.Box = this.data.Box;
      item.Colour = this.data.Colour;
      item.Level = this.data.Level;
      item.Area = this.data.Area;
      item.Quantity = this.data.RemainingQuantity;
      item.Lot = this.data.Lot;
      item.Batch = this.data.Batch? moment.parseZone(this.data.Batch).utcOffset(7).format("YYYY-MM-DD"): null;
      item.HandlingUnitId = this.data.HandlingUnitId;
      item.HandlingUnit = this.data.HandlingUnit;
      item.NoPackage = this.data.NoPackage;
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


  get totalSplitQuantity() {
    if (!this.data || !this.data.Items) {
      return 0;
    }

    return this.data.Items.reduce((total, item) => {
      return total + (parseFloat(item.Quantity) || 0);
    }, 0);
  }

  get addItems() {
    return (event) => {

      this.data.Items.push({
        ProductName: this.data.ProductName,
        Batch : this.data.Batch? moment.parseZone(this.data.Batch).utcOffset(7).format("YYYY-MM-DD"): null,
        HandlingUnitId: null,
        HandlingUnit: null,
      });
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
    };
  }

} 
